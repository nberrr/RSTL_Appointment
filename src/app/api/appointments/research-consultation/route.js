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
      [formData.fullName, formData.emailAddress, formData.contactNumber, formData.sex || null, formData.institution]
    );
    const customerId = customerResult.rows[0].id;
    
    // 2. Get service ID for research consultation service
    const serviceResult = await query(
      `SELECT id FROM services WHERE category = 'research' LIMIT 1`
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
         appointment_id, sample_description, name_of_samples, terms_accepted
       )
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [
        appointmentId, 
        formData.consultationDetails,
        formData.researchTitle,
        formData.terms
      ]
    );
    const appointmentDetailId = appointmentDetailsResult.rows[0].id;
    
    // 5. Insert research-consultation-specific details
    await query(
      `INSERT INTO research_consultation_details (
         appointment_detail_id, research_topic, consultation_type,
         research_stage, additional_requirements
       )
       VALUES ($1, $2, $3, $4, $5)`,
      [
        appointmentDetailId,
        formData.researchTitle,
        formData.typeOfResearch,
        formData.yearLevel,
        formData.consultationDetails
      ]
    );
    
    return NextResponse.json({ 
      success: true, 
      message: 'Research consultation appointment created successfully',
      appointmentId
    });
  } catch (error) {
    console.error('Error creating research consultation appointment:', error);
    return NextResponse.json(
      { success: false, message: error.message }, 
      { status: 500 }
    );
  }
} 