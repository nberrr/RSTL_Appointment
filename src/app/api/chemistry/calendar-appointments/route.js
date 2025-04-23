import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request) {
  // Removed startDate and endDate requirement for a table view
  // const { searchParams } = new URL(request.url);
  // const startDate = searchParams.get('startDate');
  // const endDate = searchParams.get('endDate');

  // if (!startDate || !endDate) {
  //   return NextResponse.json(
  //     { success: false, message: 'startDate and endDate parameters are required' }, 
  //     { status: 400 }
  //   );
  // }

  try {
    // Get the service ID for chemistry
    const serviceResult = await query(
      `SELECT id FROM services WHERE category = 'chemistry' LIMIT 1`
    );
    if (serviceResult.rows.length === 0) {
      return NextResponse.json({ success: false, message: 'Chemistry service not found' }, { status: 404 });
    }
    const serviceId = serviceResult.rows[0].id;

    // Fetch all chemistry appointments (or add filtering/pagination later)
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
        cd.analysis_requested,
        cd.delivery_type
      FROM appointments a
      JOIN customers c ON a.customer_id = c.id
      JOIN appointment_details ad ON a.id = ad.appointment_id
      JOIN chemistry_details cd ON ad.id = cd.appointment_detail_id
      WHERE a.service_id = $1
      -- Removed date filtering: 
      -- AND a.appointment_date >= $2
      -- AND a.appointment_date <= $3
      ORDER BY a.appointment_date DESC, a.appointment_time DESC
    `, [serviceId]);

    return NextResponse.json({
      success: true,
      data: appointmentsResult.rows
    });

  } catch (error) {
    console.error('Error fetching chemistry appointments for table:', error);
    return NextResponse.json(
      { success: false, message: error.message }, 
      { status: 500 }
    );
  }
} 