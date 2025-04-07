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
      [formData.name, formData.email, formData.contactNumber, formData.sex || null, formData.companyName]
    );
    const customerId = customerResult.rows[0].id;
    
    // 2. Get service ID for metrology service
    const serviceResult = await query(
      `SELECT id FROM services WHERE category = 'metrology' LIMIT 1`
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
         appointment_id, plate_number, sample_description, 
         name_of_samples, terms_accepted
       )
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [
        appointmentId, 
        formData.plateNumber, 
        formData.sampleDescription, 
        formData.nameOfSamples,
        formData.terms
      ]
    );
    const appointmentDetailId = appointmentDetailsResult.rows[0].id;
    
    // 5. Insert metrology-specific details
    await query(
      `INSERT INTO metrology_details (
         appointment_detail_id, type_of_test, number_of_liters, 
         truck_plate_number
       )
       VALUES ($1, $2, $3, $4)`,
      [
        appointmentDetailId,
        formData.typeOfTest,
        formData.numberOfLiters,
        formData.plateNumber
      ]
    );
    
    return NextResponse.json({ 
      success: true, 
      message: 'Metrology appointment created successfully',
      appointmentId
    });
  } catch (error) {
    console.error('Error creating metrology appointment:', error);
    return NextResponse.json(
      { success: false, message: error.message }, 
      { status: 500 }
    );
  }
} 