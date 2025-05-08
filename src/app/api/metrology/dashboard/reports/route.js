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

    // Get report counts by status
    const countsResult = await query(
      `SELECT 
        COUNT(*) FILTER (WHERE a.status = 'completed') AS completed_count,
        COUNT(*) FILTER (WHERE a.status = 'declined') AS declined_count,
        COUNT(*) FILTER (WHERE a.status = 'cancelled') AS cancelled_count
      FROM appointments a
      WHERE a.service_id = $1`,
      [serviceId]
    );
    const { completed_count, declined_count, cancelled_count } = countsResult.rows[0];

    // Get all reports (appointments) for metrology
    const reportsResult = await query(
      `SELECT 
        a.id, a.appointment_date, a.status, c.name as customer_name
      FROM appointments a
      JOIN customers c ON a.customer_id = c.id
      WHERE a.service_id = $1
      ORDER BY a.appointment_date DESC`,
      [serviceId]
    );
    const reports = reportsResult.rows;

    return NextResponse.json({
      success: true,
      data: {
        completedCount: Number(completed_count),
        declinedCount: Number(declined_count),
        cancelledCount: Number(cancelled_count),
        reports
      }
    });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
} 