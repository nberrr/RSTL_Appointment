import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// Get all active services from all labs
export async function GET(request) {
  try {
    const servicesResult = await query(`
      SELECT 
        id,
        name,
        description,
        COALESCE(price, 0) as price,
        active,
        category,
        sample_type
      FROM services
      WHERE active = TRUE
      ORDER BY category, name
    `);

    // Group services by category
    const grouped = {};
    servicesResult.rows.forEach(service => {
      if (!grouped[service.category]) grouped[service.category] = [];
      grouped[service.category].push({
        ...service,
        price: parseFloat(service.price) || 0
      });
    });

    return NextResponse.json({
      success: true,
      data: grouped
    });
  } catch (error) {
    console.error('Error fetching all services:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
} 