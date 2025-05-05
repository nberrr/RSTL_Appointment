import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request) {
  try {
    // Get the service ID for chemistry
    const serviceResult = await query(
      `SELECT id FROM services WHERE category = 'chemistry' LIMIT 1`
    );
    const serviceId = serviceResult.rows[0].id;

    // Fetch all chemistry service names
    const chemServicesResult = await query(
      `SELECT name FROM services WHERE category = 'chemistry'`
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

    // Get recent appointments (only those with chemistry details)
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
      JOIN chemistry_details cd ON ad.id = cd.appointment_detail_id
      ORDER BY a.appointment_date DESC
      LIMIT 5
    `);

    // Filter analysis_requested for chemistry-only tests
    recentAppointments.rows.forEach(apt => {
      const allRequested = (apt.analysis_requested || '').split(',').map(s => s.trim());
      apt.analysis_requested = allRequested.filter(name => chemServiceNames.includes(name)).join(', ');
    });

    // Get all analysis_requested for chemistry details
    const allAnalysis = await query(`
      SELECT cd.analysis_requested
      FROM chemistry_details cd
    `);

    // Count each individual test/service
    const analysisCount = {};
    allAnalysis.rows.forEach(row => {
      const tests = (row.analysis_requested || '').split(',').map(s => s.trim());
      tests.forEach(test => {
        if (chemServiceNames.includes(test)) {
          analysisCount[test] = (analysisCount[test] || 0) + 1;
        }
      });
    });

    // Convert to array and sort by count
    const analysisTypes = Object.entries(analysisCount)
      .map(([analysis_requested, count]) => ({ analysis_requested, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return NextResponse.json({
      success: true,
      data: {
        stats: statsResult.rows[0],
        appointments: appointmentsResult.rows,
        recentAppointments: recentAppointments.rows,
        analysisTypes: analysisTypes
      }
    });
  } catch (error) {
    console.error('Error fetching chemistry dashboard data:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
} 