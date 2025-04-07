import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';

export async function POST(request) {
  try {
    const formData = await request.json();
    
    // 1. Insert customer data and get customer_id
    const customerResult = await query(
      `INSERT INTO customers (name, email, contact_number, sex, company_name)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [formData.name, formData.email, formData.contactNumber, formData.sex || null, formData.companyName || null]
    );
    const customerId = customerResult.rows[0].id;
    
    // 2. Get service ID for microbiology service
    const serviceResult = await query(
      `SELECT id FROM services WHERE category = 'microbiology' LIMIT 1`
    );
    const serviceId = serviceResult.rows[0].id;
    
    // 3. Insert appointment and get appointment_id
    const appointmentDate = formData.appointmentDate || new Date(formData.selectedDate);
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
         appointment_id, sample_description, name_of_samples, 
         sample_type, sample_condition, sample_quantity,
         number_of_replicates, terms_accepted
       )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id`,
      [
        appointmentId, 
        formData.sampleDescription, 
        formData.nameOfSamples,
        formData.sampleType,
        formData.sampleCondition,
        formData.sampleQuantity,
        formData.replicates || 1,
        formData.terms
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
        formData.testType,
        formData.organismTarget,
        formData.storageCondition,
        formData.sampleQuantity
      ]
    );
    
    return NextResponse.json({ 
      success: true, 
      message: 'Microbiology appointment created successfully',
      appointmentId
    });
  } catch (error) {
    console.error('Error creating microbiology appointment:', error);
    return NextResponse.json(
      { success: false, message: error.message }, 
      { status: 500 }
    );
  }
} 