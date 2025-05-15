import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request) {
  try {
    const formData = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'contactNumber', 'sex', 'nameOfSamples', 'sampleType', 'sampleQuantity', 'sampleDescription', 'selectedDate'];
    
    for (const field of requiredFields) {
      if (!formData[field]) {
        return NextResponse.json(
          { success: false, message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Generate a unique appointment reference number
    const appointmentRef = `CHEM-${uuidv4().substring(0, 8).toUpperCase()}`;
    
    // 1. Insert customer data and get customer_id
    const customerResult = await query(
      `INSERT INTO customers (name, email, contact_number, company_name, sex)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [formData.name, formData.email, formData.contactNumber, formData.companyName || null, formData.sex]
    );
    const customerId = customerResult.rows[0].id;
    
    // 2. Get service ID for chemistry testing service
    const serviceResult = await query(
      `SELECT id FROM services WHERE category = 'chemistry' LIMIT 1`
    );
    
    if (serviceResult.rows.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Chemistry service not found' },
        { status: 404 }
      );
    }
    
    const serviceId = serviceResult.rows[0].id;
    
    // 3. Insert appointment and get appointment_id
    const appointmentDate = (formData.selectedDate || '').slice(0, 10);
    const appointmentResult = await query(
      `INSERT INTO appointments (customer_id, service_id, appointment_date, status)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [customerId, serviceId, appointmentDate, 'pending']
    );
    const appointmentId = appointmentResult.rows[0].id;
    
    // 4. Insert appointment details and get appointment_detail_id
    const appointmentDetailsResult = await query(
      `INSERT INTO appointment_details (
         appointment_id, name_of_samples, sample_type, sample_quantity, 
         sample_description, sample_condition, number_of_replicates, terms_accepted
       )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id`,
      [
        appointmentId,
        formData.nameOfSamples,
        formData.sampleType,
        parseInt(formData.sampleQuantity, 10) || 1,
        formData.sampleDescription,
        formData.sampleCondition || 'Normal',
        formData.replicates || 1,
        formData.terms || true
      ]
    );
    const appointmentDetailId = appointmentDetailsResult.rows[0].id;
    
    // 5. Insert chemistry-specific details
    await query(
      `INSERT INTO chemistry_details (
         appointment_detail_id, analysis_requested, parameters, delivery_type, sample_quantity
       )
       VALUES ($1, $2, $3, $4, $5)`,
      [
        appointmentDetailId,
        formData.analysisRequested || 'Standard analysis',
        formData.parameters || 'Standard parameters',
        formData.deliveryType || 'Standard',
        formData.sampleQuantity
      ]
    );
    
    // 6. Insert appointment_detail_services
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
    
    // Record action log for the appointment
    await query(
      `INSERT INTO action_logs (appointment_id, action_type, action_desc)
       VALUES ($1, $2, $3)`,
      [appointmentId, 'creation', 'Chemistry appointment created through online form']
    );
    
    return NextResponse.json({ 
      success: true, 
      message: 'Chemistry appointment created successfully',
      appointmentId,
      appointmentRef
    });
  } catch (error) {
    console.error('Error creating chemistry appointment:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to create appointment' }, 
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const sql = `
      SELECT a.id AS appointment_id, a.appointment_date, a.status,
             c.name AS customer_name, c.company_name,
             ad.name_of_samples, ad.sample_type, ad.sample_quantity, ad.sample_description,
             cd.analysis_requested, cd.parameters, cd.delivery_type,
             (SELECT STRING_AGG(s.name, ', ') FROM appointment_detail_services ads JOIN services s ON ads.service_id = s.id WHERE ads.appointment_detail_id = ad.id) as services
      FROM appointments a
      JOIN customers c ON a.customer_id = c.id
      JOIN services s ON a.service_id = s.id
      LEFT JOIN appointment_details ad ON a.id = ad.appointment_id
      LEFT JOIN chemistry_details cd ON ad.id = cd.appointment_detail_id
      WHERE s.category = 'chemistry'
      ORDER BY a.appointment_date DESC
    `;
    const result = await query(sql);
    const data = result.rows.map(row => ({
      id: row.appointment_id,
      date: row.appointment_date,
      status: row.status,
      customer: row.customer_name,
      company: row.company_name,
      sampleName: row.name_of_samples,
      sampleType: row.sample_type,
      sampleQuantity: row.sample_quantity,
      sampleDescription: row.sample_description,
      analysisRequested: row.analysis_requested,
      parameters: row.parameters,
      deliveryType: row.delivery_type,
      services: row.services
    }));
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
} 