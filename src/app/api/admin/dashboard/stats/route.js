import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'today';

    // Calculate date range based on period
    const now = new Date();
    let startDate = new Date();
    
    switch (period) {
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      default: // today
        startDate.setHours(0, 0, 0, 0);
        break;
    }

    // Get statistics for each service category
    const stats = await query(
      `WITH service_stats AS (
        SELECT 
          s.category,
          COUNT(*) as total_appointments,
          COUNT(CASE WHEN a.status = 'pending' THEN 1 END) as pending_count,
          COUNT(CASE WHEN a.status = 'completed' THEN 1 END) as completed_count
        FROM appointments a
        JOIN services s ON a.service_id = s.id
        WHERE a.appointment_date >= $1
        GROUP BY s.category
      )
      SELECT 
        category,
        COALESCE(total_appointments, 0) as appointments,
        COALESCE(pending_count, 0) as pending,
        COALESCE(completed_count, 0) as completed
      FROM service_stats`,
      [startDate.toISOString()]
    );

    // Format response
    const formattedStats = {};
    stats.rows.forEach(row => {
      formattedStats[row.category] = {
        appointments: parseInt(row.appointments),
        pending: parseInt(row.pending),
        completed: parseInt(row.completed)
      };
    });

    return NextResponse.json({
      success: true,
      data: formattedStats
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch dashboard statistics' },
      { status: 500 }
    );
  }
} 