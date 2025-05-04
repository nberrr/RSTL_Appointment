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
    const appointmentRef = `MICRO-${uuidv4().substring(0, 8).toUpperCase()}`;
    
    // 1. Insert customer data and get customer_id
    const customerResult = await query(
      `INSERT INTO customers (name, email, contact_number, company_name, sex)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [formData.name, formData.email, formData.contactNumber, formData.companyName || null, formData.sex]
    );
    const customerId = customerResult.rows[0].id;
    
    // 2. Get service ID for microbiology testing service
    const serviceResult = await query(
      `SELECT id FROM services WHERE category = 'microbiology' LIMIT 1`
    );
    
    if (serviceResult.rows.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Microbiology service not found' },
        { status: 404 }
      );
    }
    
    const serviceId = serviceResult.rows[0].id;
    
    // 3. Insert appointment and get appointment_id
    const appointmentDate = new Date(formData.selectedDate);
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
    
    // 5. Insert microbiology-specific details
    await query(
      `INSERT INTO microbiology_details (
         appointment_detail_id, test_type, organism_target, 
         sample_storage_condition, sample_quantity
       )
       VALUES ($1, $2, $3, $4, $5)`,
      [
        appointmentDetailId,
        formData.testType || formData.selectedServices?.join(', ') || 'Standard testing',
        formData.organismTarget || 'Standard targets',
        formData.storageCondition || 'Room temperature',
        formData.sampleQuantity
      ]
    );
    
    // Record action log for the appointment
    await query(
      `INSERT INTO action_logs (appointment_id, action_type, action_desc)
       VALUES ($1, $2, $3)`,
      [appointmentId, 'creation', 'Microbiology appointment created through online form']
    );
    
    return NextResponse.json({ 
      success: true, 
      message: 'Microbiology appointment created successfully',
      appointmentId,
      appointmentRef
    });
  } catch (error) {
    console.error('Error creating microbiology appointment:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to create appointment' }, 
      { status: 500 }
    );
  }
} 