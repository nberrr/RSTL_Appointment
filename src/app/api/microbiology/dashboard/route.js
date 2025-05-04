import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request) {
  try {
    // Get the service ID for microbiology
    const serviceResult = await query(
      `SELECT id FROM services WHERE category = 'microbiology' LIMIT 1`
    );
    const serviceId = serviceResult.rows[0].id;

    // Fetch all microbiology service names
    const chemServicesResult = await query(
      `SELECT name FROM services WHERE category = 'microbiology'`
    );
    const chemServiceNames = chemServicesResult.rows.map(row => row.name);

    // Get appointments statistics
    const statsResult = await query(`
      SELECT 
        COUNT(*) as total_appointments,
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed,
        COUNT(CASE WHEN status = 'in progress' THEN 1 END) as in_progress
      FROM appointments 
      WHERE service_id = $1
    `, [serviceId]);

    // Get appointments by date for calendar
    const appointmentsResult = await query(`
      SELECT 
        appointment_date,
        COUNT(*) as appointment_count,
        STRING_AGG(status, ', ') as statuses
      FROM appointments 
      WHERE 
        service_id = $1 
        AND appointment_date >= CURRENT_DATE - INTERVAL '30 days'
        AND appointment_date <= CURRENT_DATE + INTERVAL '60 days'
      GROUP BY appointment_date
    `, [serviceId]);

    // Get recent appointments (only those with microbiology details)
    const recentAppointments = await query(`
      SELECT 
        a.id,
        a.appointment_date,
        a.status,
        c.name as customer_name,
        cd.analysis_requested,
        cd.delivery_type
      FROM appointments a
      JOIN customers c ON a.customer_id = c.id
      JOIN appointment_details ad ON a.id = ad.appointment_id
      JOIN microbiology_details cd ON ad.id = cd.appointment_detail_id
      ORDER BY a.appointment_date DESC
      LIMIT 5
    `);

    // Filter analysis_requested for microbiology-only tests
    recentAppointments.rows.forEach(apt => {
      const allRequested = (apt.analysis_requested || '').split(',').map(s => s.trim());
      apt.analysis_requested = allRequested.filter(name => chemServiceNames.includes(name)).join(', ');
    });

    // Get analysis types distribution (only those with microbiology details)
    const analysisTypes = await query(`
      SELECT 
        cd.analysis_requested,
        COUNT(*) as count
      FROM microbiology_details cd
      GROUP BY cd.analysis_requested
      ORDER BY count DESC
      LIMIT 5
    `);

    // Filter analysisTypes for microbiology-only tests
    analysisTypes.rows.forEach(type => {
      const allRequested = (type.analysis_requested || '').split(',').map(s => s.trim());
      type.analysis_requested = allRequested.filter(name => chemServiceNames.includes(name)).join(', ');
    });

    return NextResponse.json({
      success: true,
      data: {
        stats: statsResult.rows[0],
        appointments: appointmentsResult.rows,
        recentAppointments: recentAppointments.rows,
        analysisTypes: analysisTypes.rows
      }
    });
  } catch (error) {
    console.error('Error fetching microbiology dashboard data:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
} 