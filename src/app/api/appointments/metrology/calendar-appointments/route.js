import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request) {
  try {
    // Get all service IDs for metrology
    const serviceResults = await query(
      `SELECT id FROM services WHERE category = 'metrology'`
    );
    if (serviceResults.rows.length === 0) {
      return NextResponse.json({ success: false, message: 'Metrology service not found' }, { status: 404 });
    }
    const serviceIds = serviceResults.rows.map(row => row.id);

    // Fetch all metrology appointments for all metrology services
    const appointmentsResult = await query(`
      SELECT 
        a.id,
        a.appointment_date,
        a.appointment_time,
        a.status,
        c.name as customer_name,
        c.email as customer_email,
        c.contact_number as customer_contact,
        ad.sample_description,
        md.type_of_test,
        md.number_of_liters,
        md.truck_plate_number,
        md.manager_name
      FROM appointments a
      JOIN customers c ON a.customer_id = c.id
      JOIN appointment_details ad ON a.id = ad.appointment_id
      JOIN metrology_details md ON ad.id = md.appointment_detail_id
      WHERE a.service_id = ANY($1)
      ORDER BY a.appointment_date DESC, a.appointment_time DESC
    `, [serviceIds]);

    return NextResponse.json({
      success: true,
      data: appointmentsResult.rows
    });

  } catch (error) {
    console.error('Error fetching metrology appointments for table:', error);
    return NextResponse.json(
      { success: false, message: error.message }, 
      { status: 500 }
    );
  }
}
