import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request) {
  try {
    // Get all service IDs for microbiology
    const serviceResult = await query(
      `SELECT id FROM services WHERE category = 'microbiology'`
    );
    if (serviceResult.rows.length === 0) {
      return NextResponse.json({ success: false, message: 'Microbiology service not found' }, { status: 404 });
    }
    const serviceIds = serviceResult.rows.map(row => row.id);

    // Fetch microbiology appointments and join relevant tables
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
        md.test_type,
        md.organism_target,
        md.sample_storage_condition,
        tr.result_data,
        tr.result_file_path,
        tr.conducted_by,
        tr.created_at as test_completed_date
      FROM appointments a
      JOIN customers c ON a.customer_id = c.id
      JOIN appointment_details ad ON a.id = ad.appointment_id
      JOIN microbiology_details md ON ad.id = md.appointment_detail_id
      LEFT JOIN test_results tr ON a.id = tr.appointment_id
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
          submissionTimestamp: apt.submission_timestamp || '',
        },
        sample: apt.name_of_samples || apt.sample_description || '',
        sampleDetails: {
          name: apt.name_of_samples || '',
          type: apt.sample_type || '',
          numSamples: apt.sample_quantity || '',
          dateRequested: apt.date_requested ? (typeof apt.date_requested === 'string' ? apt.date_requested.split('T')[0] : apt.date_requested.toISOString().split('T')[0]) : '',
          priority: 'N/A', // Not available in schema
          description: apt.sample_description || '',
          laboratory: apt.test_type || '',
          organismTarget: apt.organism_target || '',
          storageCondition: apt.sample_storage_condition || '',
        },
        testResults: {
          summary: apt.result_data ? JSON.stringify(apt.result_data) : '',
          technician: apt.conducted_by || '',
          completedDate: apt.test_completed_date ? (typeof apt.test_completed_date === 'string' ? apt.test_completed_date.split('T')[0] : apt.test_completed_date.toISOString().split('T')[0]) : '',
        },
        testType: apt.test_type || '',
        date: apt.appointment_date ? (typeof apt.appointment_date === 'string' ? apt.appointment_date.split('T')[0] : apt.appointment_date.toISOString().split('T')[0]) : '',
        status: apt.status || '',
      };
    });

    return NextResponse.json({
      success: true,
      data: formattedData
    });
  } catch (error) {
    console.error('Error fetching microbiology calendar appointments:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
} 