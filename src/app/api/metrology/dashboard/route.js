import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request) {
  try {
    // Get the service ID for metrology
    const serviceResult = await query(
      `SELECT id FROM services WHERE category = 'metrology' LIMIT 1`
    );
    if (!serviceResult.rows.length) {
      return NextResponse.json(
        { success: false, message: "Metrology service not found in the database. Please add a service with category 'metrology'." },
        { status: 404 }
      );
    }
    const serviceId = serviceResult.rows[0].id;

    // Fetch all metrology service names
    const metrologyServicesResult = await query(
      `SELECT name FROM services WHERE category = 'metrology'`
    );
    const metrologyServiceNames = metrologyServicesResult.rows.map(row => row.name);

    // Get appointments statistics
    const statsResult = await query(
      `SELECT 
        COUNT(*) FILTER (WHERE a.status = 'pending') AS pending,
        COUNT(*) FILTER (WHERE a.status = 'in progress') AS in_progress,
        COUNT(*) FILTER (WHERE a.status = 'completed') AS completed,
        COUNT(*) AS total_appointments
      FROM appointments a
      WHERE a.service_id = $1`,
      [serviceId]
    );
    const stats = statsResult.rows[0];

    // Get all appointments for the calendar
    const appointmentsResult = await query(
      `SELECT 
        a.id, a.appointment_date, a.status, c.name as customer_name
      FROM appointments a
      JOIN customers c ON a.customer_id = c.id
      WHERE a.service_id = $1
      ORDER BY a.appointment_date ASC`,
      [serviceId]
    );
    const appointments = appointmentsResult.rows;

    // Get recent appointments (last 5)
    const recentAppointmentsResult = await query(
      `SELECT 
        a.id, a.appointment_date, a.status, c.name as customer_name
      FROM appointments a
      JOIN customers c ON a.customer_id = c.id
      WHERE a.service_id = $1
      ORDER BY a.appointment_date DESC
      LIMIT 5`,
      [serviceId]
    );
    const recentAppointments = recentAppointmentsResult.rows;

    // Get analysis types (if any, for metrology)
    const analysisTypesResult = await query(
      `SELECT DISTINCT s.name AS analysis_type
      FROM services s
      WHERE s.category = 'metrology'`
    );
    const analysisTypes = analysisTypesResult.rows.map(row => row.analysis_type);

    return NextResponse.json({
      success: true,
      data: {
        stats,
        appointments,
        recentAppointments,
        analysisTypes,
        metrologyServiceNames
      }
    });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
} 