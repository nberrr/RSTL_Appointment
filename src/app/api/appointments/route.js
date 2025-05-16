import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { sendMail } from '@/lib/mail';

// GET /api/appointments?service_id=3&category=chemistry&date=2025-05-01&status=pending
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const service_id = searchParams.get('service_id');
  const category = searchParams.get('category');
  const date = searchParams.get('date');
  const status = searchParams.get('status');

  let sql;
  let params = [];

  if (category === 'chemistry') {
    sql = `
      SELECT a.*, s.category, c.name as customer_name, c.email as customer_email, c.company_name, c.contact_number, c.sex,
             ad.name_of_samples, ad.sample_type, ad.sample_quantity, ad.sample_description,
             COALESCE(sv.services, '') as services
      FROM appointments a
      JOIN services s ON a.service_id = s.id
      JOIN customers c ON a.customer_id = c.id
      JOIN appointment_details ad ON a.id = ad.appointment_id
      JOIN chemistry_details cd ON ad.id = cd.appointment_detail_id
      LEFT JOIN (
        SELECT ads.appointment_detail_id, STRING_AGG(s.name, ', ') as services
        FROM appointment_detail_services ads
        JOIN services s ON ads.service_id = s.id
        GROUP BY ads.appointment_detail_id
      ) sv ON sv.appointment_detail_id = ad.id
      WHERE 1=1
    `;
    if (service_id) {
      sql += ` AND s.id = $${params.length + 1}`;
      params.push(service_id);
    }
    if (date) {
      sql += ` AND a.appointment_date::date = $${params.length + 1}`;
      params.push(date);
    }
    if (status) {
      sql += ` AND a.status = $${params.length + 1}`;
      params.push(status);
    }
    sql += ' GROUP BY a.id, s.category, c.name, c.email, c.company_name, c.contact_number, c.sex, ad.name_of_samples, ad.sample_type, ad.sample_quantity, ad.sample_description, cd.parameters, cd.delivery_type, sv.services';
    sql += ' ORDER BY a.appointment_date DESC, a.created_at DESC';
  } else if (category === 'microbiology') {
    sql = `
      SELECT a.*, s.category, c.name as customer_name, c.email as customer_email, c.company_name, c.contact_number, c.sex,
             ad.name_of_samples, ad.sample_type, ad.sample_quantity, ad.sample_description,
             COALESCE(sv.services, '') as services
      FROM appointments a
      JOIN services s ON a.service_id = s.id
      JOIN customers c ON a.customer_id = c.id
      JOIN appointment_details ad ON a.id = ad.appointment_id
      JOIN microbiology_details md ON ad.id = md.appointment_detail_id
      LEFT JOIN (
        SELECT ads.appointment_detail_id, STRING_AGG(s.name, ', ') as services
        FROM appointment_detail_services ads
        JOIN services s ON ads.service_id = s.id
        GROUP BY ads.appointment_detail_id
      ) sv ON sv.appointment_detail_id = ad.id
      WHERE 1=1
    `;
    if (service_id) {
      sql += ` AND s.id = $${params.length + 1}`;
      params.push(service_id);
    }
    if (date) {
      sql += ` AND a.appointment_date::date = $${params.length + 1}`;
      params.push(date);
    }
    if (status) {
      sql += ` AND a.status = $${params.length + 1}`;
      params.push(status);
    }
    sql += ' GROUP BY a.id, s.category, c.name, c.email, c.company_name, c.contact_number, c.sex, ad.name_of_samples, ad.sample_type, ad.sample_quantity, ad.sample_description, sv.services';
    sql += ' ORDER BY a.appointment_date DESC, a.created_at DESC';
  } else {
    sql = `
      SELECT a.*, s.name as service_name, s.category, c.name as customer_name, c.email as customer_email, c.company_name
      FROM appointments a
      JOIN services s ON a.service_id = s.id
      JOIN customers c ON a.customer_id = c.id
      WHERE 1=1
    `;
    if (service_id) {
      sql += ` AND s.id = $${params.length + 1}`;
      params.push(service_id);
    }
    if (category) {
      sql += ` AND s.category = $${params.length + 1}`;
      params.push(category);
    }
    if (date) {
      sql += ` AND a.appointment_date::date = $${params.length + 1}`;
      params.push(date);
    }
    if (status) {
      sql += ` AND a.status = $${params.length + 1}`;
      params.push(status);
    }
    sql += ' ORDER BY a.appointment_date DESC, a.created_at DESC';
  }

  try {
    const result = await query(sql, params);
    // Normalize appointment_date for all rows
    const normalizedRows = result.rows.map(row => {
      let normalizedDate;
      if (row.appointment_date instanceof Date) {
        // Use local date parts, not toISOString
        const year = row.appointment_date.getFullYear();
        const month = (row.appointment_date.getMonth() + 1).toString().padStart(2, '0');
        const day = row.appointment_date.getDate().toString().padStart(2, '0');
        normalizedDate = `${year}-${month}-${day}`;
      } else if (typeof row.appointment_date === 'string') {
        normalizedDate = row.appointment_date.slice(0, 10);
      } else {
        normalizedDate = row.appointment_date;
      }
      return {
        ...row,
        appointment_date: normalizedDate,
      };
    });
    return NextResponse.json({ success: true, data: normalizedRows });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const formData = await request.json();
    const category = formData.category;
    if (!category) {
      return NextResponse.json({ success: false, message: 'Missing category in request body' }, { status: 400 });
    }
    const supported = ['chemistry', 'microbiology', 'shelf_life', 'metrology', 'research'];
    if (!supported.includes(category)) {
      return NextResponse.json({ success: false, message: `Unsupported category: ${category}` }, { status: 400 });
    }

    // Only implement chemistry, microbiology, shelf_life for now
    if (category === 'metrology' || category === 'research') {
      return NextResponse.json({ success: false, message: 'POST handler for this category not yet implemented' }, { status: 501 });
    }

    // Validate required fields
    const requiredFields = [
      'name', 'email', 'contact_number', 'sex',
      'name_of_samples', 'sample_type', 'sample_quantity', 'sample_description', 'date', 'service_id'
    ];
    for (const field of requiredFields) {
      if (!formData[field]) {
        return NextResponse.json({ success: false, message: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    // 1. Insert customer
    const customerResult = await query(
      `INSERT INTO customers (name, email, contact_number, company_name, sex)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [formData.name, formData.email, formData.contact_number, formData.company_name || null, formData.sex]
    );
    const customerId = customerResult.rows[0].id;

    // 2. Use the first service_id (array) for now (TODO: support multiple services per appointment)
    const serviceId = Array.isArray(formData.service_id) ? formData.service_id[0] : formData.service_id;

    // 3. Insert appointment
    const appointmentDate = (formData.date || '').slice(0, 10);
    const appointmentResult = await query(
      `INSERT INTO appointments (customer_id, service_id, appointment_date, status)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [customerId, serviceId, appointmentDate, 'pending']
    );
    const appointmentId = appointmentResult.rows[0].id;

    // 4. Insert appointment_details
    const appointmentDetailsResult = await query(
      `INSERT INTO appointment_details (
         appointment_id, name_of_samples, sample_type, sample_quantity, 
         sample_description, sample_condition, number_of_replicates, terms_accepted
       )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id`,
      [
        appointmentId,
        formData.name_of_samples,
        formData.sample_type,
        parseInt(formData.sample_quantity, 10) || 1,
        formData.sample_description,
        formData.sample_condition || 'Normal',
        formData.number_of_replicates || 1,
        formData.terms || true
      ]
    );
    const appointmentDetailId = appointmentDetailsResult.rows[0].id;

    // 5. Insert category-specific details
    if (category === 'shelf_life') {
      await query(
        `INSERT INTO shelf_life_details (
           appointment_detail_id, product_type, storage_conditions, shelf_life_duration, packaging_type, modes_of_deterioration
         )
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          appointmentDetailId,
          formData.product_type || formData.productType || 'General',
          formData.storage_conditions || '',
          formData.shelf_life_duration || null,
          formData.packaging_type || '',
          Array.isArray(formData.modes_of_deterioration) ? formData.modes_of_deterioration.join(', ') : (formData.modes_of_deterioration || '')
        ]
      );
    } else if (category === 'chemistry') {
      await query(
        `INSERT INTO chemistry_details (
           appointment_detail_id, analysis_requested, parameters, delivery_type, sample_quantity
         )
         VALUES ($1, $2, $3, $4, $5)`,
        [
          appointmentDetailId,
          formData.analysis_requested || formData.analysisRequested || 'Standard analysis',
          formData.parameters || 'Standard parameters',
          formData.delivery_type || formData.deliveryType || 'Standard',
          formData.sample_quantity
        ]
      );
    } else if (category === 'microbiology') {
      await query(
        `INSERT INTO microbiology_details (
           appointment_detail_id, test_type, organism_target, sample_storage_condition, sample_quantity
         )
         VALUES ($1, $2, $3, $4, $5)`,
        [
          appointmentDetailId,
          formData.test_type || formData.testType || 'General',
          formData.organism_target || '',
          formData.sample_storage_condition || '',
          formData.sample_quantity
        ]
      );
    }

    // After inserting appointment_details and getting appointmentDetailId
    if (Array.isArray(formData.service_id)) {
      for (const sid of formData.service_id) {
        await query(
          `INSERT INTO appointment_detail_services (appointment_detail_id, service_id) VALUES ($1, $2)`,
          [appointmentDetailId, sid]
        );
      }
    } else if (formData.service_id) {
      await query(
        `INSERT INTO appointment_detail_services (appointment_detail_id, service_id) VALUES ($1, $2)`,
        [appointmentDetailId, formData.service_id]
      );
    }

    // Fetch all service names for this appointment detail
    const servicesRes = await query(
      `SELECT s.name FROM appointment_detail_services ads JOIN services s ON ads.service_id = s.id WHERE ads.appointment_detail_id = $1`,
      [appointmentDetailId]
    );
    const serviceNames = servicesRes.rows.map(row => row.name);

    // Send confirmation email with review-style structure
    try {
      const html = `
        <p>Dear ${formData.name},</p>
        <h3>Appointment & Contact Information</h3>
        <ul>
          <li><strong>Client Name:</strong> ${formData.name}</li>
          <li><strong>Email:</strong> ${formData.email}</li>
          <li><strong>Phone:</strong> ${formData.contact_number}</li>
          ${formData.company_name ? `<li><strong>Organization:</strong> ${formData.company_name}</li>` : ''}
          <li><strong>Sex:</strong> ${formData.sex}</li>
        </ul>
        <h4>Sample Details</h4>
        <ul>
          <li><strong>Sample Name:</strong> ${formData.name_of_samples}</li>
          <li><strong>Sample Type:</strong> ${formData.sample_type}</li>
          <li><strong>Quantity:</strong> ${formData.sample_quantity}</li>
          <li><strong>Preferred Date:</strong> ${appointmentDate}</li>
          <li><strong>Sample Description:</strong> ${formData.sample_description}</li>
        </ul>
        <h4>Selected Services</h4>
        <ul>
          ${serviceNames.map(name => `<li>${name}</li>`).join('')}
        </ul>
        <p>Thank you for choosing our laboratory services. We look forward to serving you!</p>
        <p>Best regards,<br/>RSTL Team</p>
      `;
      const text = `Dear ${formData.name},\n\nAppointment & Contact Information\n- Client Name: ${formData.name}\n- Email: ${formData.email}\n- Phone: ${formData.contact_number}\n${formData.company_name ? `- Organization: ${formData.company_name}\n` : ''}- Sex: ${formData.sex}\n\nSample Details\n- Sample Name: ${formData.name_of_samples}\n- Sample Type: ${formData.sample_type}\n- Quantity: ${formData.sample_quantity}\n- Preferred Date: ${appointmentDate}\n- Sample Description: ${formData.sample_description}\n\nSelected Services\n${serviceNames.map(name => `- ${name}`).join('\n')}\n\nThank you for choosing our laboratory services. We look forward to serving you!\n\nBest regards,\nRSTL Team`;
      await sendMail({
        to: formData.email,
        subject: 'Your Appointment is Booked',
        html,
        text,
      });
    } catch (e) {
      // Log but do not fail the booking if email fails
      console.error('Failed to send confirmation email:', e);
    }
    return NextResponse.json({ success: true, appointmentId });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message || 'Failed to create appointment' }, { status: 500 });
  }
} 