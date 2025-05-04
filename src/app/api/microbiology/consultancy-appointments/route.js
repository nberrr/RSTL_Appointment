import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { format, parseISO } from 'date-fns';

// Fetching appointments specifically for the Research Consultation service (ID 5)
// Assuming these represent chemistry-related consultancies for this dashboard.
// We might need to adjust the filtering logic if the data model is different.
export async function GET(request) {
  try {
    // Get the service ID for Research Consultation
    const serviceResult = await query(
      `SELECT id FROM services WHERE category = 'research' LIMIT 1`
    );
    if (serviceResult.rows.length === 0) {
      return NextResponse.json({ success: false, message: 'Research Consultation service not found' }, { status: 404 });
    }
    const serviceId = serviceResult.rows[0].id;

    // Fetch appointments for this service
    const appointmentsResult = await query(`
      SELECT 
        a.id,
        a.appointment_date,
        a.appointment_time, 
        a.status,
        c.name as customer_name,
        c.email as customer_email,
        c.contact_number as customer_contact,
        c.company_name as customer_organization, 
        ad.sample_description as description, -- Mapping sample_description to description
        rcd.research_topic,                 -- Includes research topic
        rcd.consultation_type as research_type, -- Mapping consultation_type
        rcd.research_stage as position, -- Mapping research_stage to position (assumption)
        rcd.additional_requirements       -- Includes additional requirements
        -- Note: Document handling/link needs to be added if applicable
      FROM appointments a
      JOIN customers c ON a.customer_id = c.id
      JOIN appointment_details ad ON a.id = ad.appointment_id
      LEFT JOIN research_consultation_details rcd ON ad.id = rcd.appointment_detail_id -- Left join in case details are missing
      WHERE a.service_id = $1
      ORDER BY a.appointment_date DESC, a.appointment_time DESC
    `, [serviceId]);

    // Map database results to the structure expected by the frontend
    const formattedData = appointmentsResult.rows.map(apt => {
      // Check if apt.appointment_date is a valid Date object before formatting
      const isValidDate = apt.appointment_date instanceof Date && !isNaN(apt.appointment_date);
      const formattedDate = isValidDate ? format(apt.appointment_date, 'MMM d, yyyy') : 'N/A';

      // Check if apt.appointment_time is a valid time string before parsing/formatting
      // Keep the parseISO approach for time as it often comes as a string like 'HH:MM:SS'
      let formattedTime = 'N/A';
      if (apt.appointment_time && typeof apt.appointment_time === 'string') {
        try {
          formattedTime = format(parseISO(`1970-01-01T${apt.appointment_time}`), 'p');
        } catch (timeError) {
          console.error(`Error parsing time ${apt.appointment_time}:`, timeError);
          // Keep formattedTime as 'N/A' if parsing fails
        }
      } else if (apt.appointment_time instanceof Date && !isNaN(apt.appointment_time)) {
        // Handle case where time might also be a Date object (less common for TIME type)
         try {
          formattedTime = format(apt.appointment_time, 'p');
        } catch (timeError) {
          console.error(`Error formatting time object ${apt.appointment_time}:`, timeError);
        }
      }

      return {
        id: apt.id,
        date: formattedDate,
        time: formattedTime,
        name: apt.customer_name,
        organization: apt.customer_organization || 'N/A',
        researchType: apt.research_type || 'N/A',
        status: apt.status,
        email: apt.customer_email || 'N/A',
        contactNo: apt.customer_contact || 'N/A',
        position: apt.position || 'N/A', // Using research_stage as position
        description: apt.description || apt.additional_requirements || 'N/A',
        researchTopic: apt.research_topic || 'N/A'
        // document: apt.document_link // Add document link field here if available
      };
    });

    return NextResponse.json({
      success: true,
      data: formattedData
    });

  } catch (error) {
    console.error('Error fetching chemistry consultancy appointments:', error);
    // Ensure you handle potential errors from date parsing
    return NextResponse.json(
      { success: false, message: error.message }, 
      { status: 500 }
    );
  }
}

// Helper function (example - move to a shared utils file ideally)
async function safeFormatDate(dateString, formatString) {
    if (!dateString) return 'N/A';
    try {
        return format(parseISO(dateString), formatString);
    } catch (e) {
        console.error(`Error formatting date ${dateString}:`, e);
        return 'Invalid Date';
    }
}

async function safeFormatTime(timeString, formatString) {
    if (!timeString) return 'N/A';
    try {
        // Assuming timeString is in HH:MM or HH:MM:SS format
        return format(parseISO(`1970-01-01T${timeString}`), formatString);
    } catch (e) {
        console.error(`Error formatting time ${timeString}:`, e);
        return 'Invalid Time';
    }
} 