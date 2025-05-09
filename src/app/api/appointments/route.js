import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET /api/appointments?service_id=3&category=chemistry&date=2025-05-01&status=pending
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const service_id = searchParams.get('service_id');
  const category = searchParams.get('category');
  const date = searchParams.get('date');
  const status = searchParams.get('status');

  let sql = `
    SELECT a.*, s.name as service_name, s.category, c.name as customer_name, c.email as customer_email, c.company_name
    FROM appointments a
    JOIN services s ON a.service_id = s.id
    JOIN customers c ON a.customer_id = c.id
    WHERE 1=1
  `;
  const params = [];

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
           appointment_detail_id, objective_of_study, product_name, net_weight, brand_name, existing_market, production_type, method_of_preservation, product_ingredients, packaging_material, target_shelf_life, mode_of_deterioration
         )
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
        [
          appointmentDetailId,
          formData.objective_of_study,
          formData.product_name,
          formData.net_weight,
          formData.brand_name,
          formData.existing_market,
          formData.production_type,
          formData.method_of_preservation,
          formData.product_ingredients,
          formData.packaging_material,
          formData.target_shelf_life,
          Array.isArray(formData.mode_of_deterioration) ? formData.mode_of_deterioration.join(', ') : formData.mode_of_deterioration
        ]
      );
    }
    // TODO: Add chemistry/microbiology-specific details if needed

    return NextResponse.json({ success: true, appointmentId });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message || 'Failed to create appointment' }, { status: 500 });
  }
} 