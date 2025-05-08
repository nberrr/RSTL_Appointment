import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request) {
  try {
    // Get the service ID(s) for shelf-life
    const serviceResult = await query(
      `SELECT id FROM services WHERE category = 'shelf-life'`
    );
    if (serviceResult.rows.length === 0) {
      return NextResponse.json({ success: false, message: 'Shelf Life service not found' }, { status: 404 });
    }
    const serviceIds = serviceResult.rows.map(row => row.id);

    // Fetch shelf-life appointments and join relevant tables
    const appointmentsResult = await query(`
      SELECT 
        a.id,
        a.appointment_date,
        a.appointment_time,
        a.status,
        c.name as customer_name,
        c.email as customer_email,
        c.contact_number as customer_phone,
        c.company_name as customer_organization,
        c.sex as customer_sex,
        a.created_at as submission_timestamp,
        ad.sample_description,
        ad.name_of_samples,
        ad.sample_type,
        ad.sample_quantity,
        ad.created_at as date_requested,
        sld.product_type,
        sld.storage_conditions,
        sld.shelf_life_duration,
        sld.created_at as shelf_life_created_at,
        sld.updated_at as shelf_life_updated_at,
        sld.id as shelf_life_detail_id
      FROM appointments a
      JOIN customers c ON a.customer_id = c.id
      JOIN appointment_details ad ON a.id = ad.appointment_id
      JOIN shelf_life_details sld ON ad.id = sld.appointment_detail_id
      WHERE a.service_id = ANY($1)
      ORDER BY a.appointment_date DESC, a.appointment_time DESC
    `, [serviceIds]);

    // Map database results to the structure expected by the frontend
    const formattedData = appointmentsResult.rows.map(apt => {
      return {
        id: `AP-${apt.id}`,
        client: {
          name: apt.customer_name,
          email: apt.customer_email,
          phone: apt.customer_phone,
          organization: apt.customer_organization,
          sex: apt.customer_sex,
          submissionTimestamp: apt.submission_timestamp ? apt.submission_timestamp.toLocaleString() : '',
        },
        sample: apt.name_of_samples || apt.sample_description || '',
        sampleDetails: {
          name: apt.name_of_samples || '',
          type: apt.sample_type || '',
          numSamples: apt.sample_quantity || '',
          dateRequested: apt.date_requested ? apt.date_requested.toISOString().split('T')[0] : '',
          priority: 'N/A', // Not available in schema
          description: apt.sample_description || '',
          laboratory: apt.product_type || '',
        },
        testResults: {
          summary: '', // No test results in shelf_life_details schema
          technician: '',
          completedDate: '',
        },
        testType: apt.product_type || '',
        date: apt.appointment_date ? apt.appointment_date.toISOString().split('T')[0] : '',
        status: apt.status || '',
      };
    });

    return NextResponse.json({
      success: true,
      data: formattedData
    });
  } catch (error) {
    console.error('Error fetching shelf life test reports:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
} 