import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request) {
  try {
    const formData = await request.json();
    
    // Validate required fields
    const requiredFields = [
      'name', 'email', 'contactNumber', 'sex', 
      'nameOfSamples', 'sampleQuantity', 'sampleDescription', 'selectedDate',
      'productType', 'storageConditions', 'shelfLifeDuration', 'packagingType'
    ];
    
    for (const field of requiredFields) {
      if (!formData[field]) {
        return NextResponse.json(
          { success: false, message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Generate a unique appointment reference number
    const appointmentRef = `SHELF-${uuidv4().substring(0, 8).toUpperCase()}`;
    
    // 1. Insert customer data and get customer_id
    const customerResult = await query(
      `INSERT INTO customers (name, email, contact_number, company_name, sex)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [formData.name, formData.email, formData.contactNumber, formData.companyName || null, formData.sex]
    );
    const customerId = customerResult.rows[0].id;
    
    // 2. Get service ID for shelf life testing service
    const serviceResult = await query(
      `SELECT id FROM services WHERE category = 'shelf_life' LIMIT 1`
    );
    
    if (serviceResult.rows.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Shelf life service not found' },
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
        formData.sampleType || 'Food Product',
        parseInt(formData.sampleQuantity, 10) || 1,
        formData.sampleDescription,
        formData.sampleCondition || 'Normal',
        formData.replicates || 1,
        formData.terms || true
      ]
    );
    const appointmentDetailId = appointmentDetailsResult.rows[0].id;
    
    // 5. Insert shelf life-specific details
    await query(
      `INSERT INTO shelf_life_details (
         appointment_detail_id, product_type, storage_conditions, 
         shelf_life_duration, packaging_type, modes_of_deterioration
       )
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        appointmentDetailId,
        formData.productType,
        formData.storageConditions,
        formData.shelfLifeDuration,
        formData.packagingType,
        formData.modesOfDeterioration
      ]
    );
    
    // Record action log for the appointment
    await query(
      `INSERT INTO action_logs (appointment_id, action_type, action_desc)
       VALUES ($1, $2, $3)`,
      [appointmentId, 'creation', 'Shelf life study appointment created through online form']
    );
    
    return NextResponse.json({ 
      success: true, 
      message: 'Shelf life study appointment created successfully',
      appointmentId,
      appointmentRef
    });
  } catch (error) {
    console.error('Error creating shelf life study appointment:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to create appointment' }, 
      { status: 500 }
    );
  }
} 