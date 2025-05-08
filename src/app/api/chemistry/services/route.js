import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// Get all chemistry services
export async function GET(request) {
  try {
    const servicesResult = await query(`
      SELECT 
        s.id,
        s.name as test_type,
        s.description as test_description,
        COALESCE(s.price, 0) as pricing,
        s.active,
        s.category,
        s.sample_type,
        cd.delivery_type as appointment
      FROM services s
      LEFT JOIN chemistry_details cd ON cd.appointment_detail_id = s.id
      WHERE s.category = 'chemistry'
      ORDER BY s.created_at DESC
    `);

    return NextResponse.json({
      success: true,
      data: servicesResult.rows.map(row => ({
        ...row,
        pricing: parseFloat(row.pricing) || 0
      }))
    });
  } catch (error) {
    console.error('Error executing query', { text: error.text, error });
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// Create a new chemistry service
export async function POST(request) {
  try {
    const data = await request.json();
    const { testType, testDescription, pricing, appointment, sampleType } = data;

    // Validate required fields
    if (!testType || !testDescription || !pricing) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Start a transaction
    await query('BEGIN');

    try {
      // Insert into services table
      const serviceResult = await query(
        `INSERT INTO services (name, description, category, price, active, sample_type)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id`,
        [testType, testDescription, 'chemistry', pricing, true, sampleType || 'Uncategorized']
      );

      const serviceId = serviceResult.rows[0].id;

      // Do NOT insert into chemistry_details here

      // Commit transaction
      await query('COMMIT');

      return NextResponse.json({
        success: true,
        message: 'Chemistry service created successfully',
        serviceId
      });
    } catch (error) {
      await query('ROLLBACK');
      throw error;
    }
  } catch (error) {
    console.error('Error creating chemistry service:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// Update a chemistry service
export async function PUT(request) {
  try {
    const data = await request.json();
    const { id, testType, testDescription, pricing, appointment, active, sampleType } = data;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Service ID is required' },
        { status: 400 }
      );
    }

    // Start a transaction
    await query('BEGIN');

    try {
      // Update services table
      await query(
        `UPDATE services 
         SET name = $1, description = $2, price = $3, active = $4, sample_type = $5
         WHERE id = $6 AND category = 'chemistry'`,
        [testType, testDescription, pricing, active, sampleType || 'Uncategorized', id]
      );

      // Update chemistry_details table
      await query(
        `UPDATE chemistry_details 
         SET delivery_type = $1
         WHERE appointment_detail_id = $2`,
        [appointment, id]
      );

      // Commit transaction
      await query('COMMIT');

      return NextResponse.json({
        success: true,
        message: 'Chemistry service updated successfully'
      });
    } catch (error) {
      await query('ROLLBACK');
      throw error;
    }
  } catch (error) {
    console.error('Error updating chemistry service:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// Delete a chemistry service
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, message: 'Service ID is required' }, { status: 400 });
    }
    // Soft delete: set active = FALSE
    await query('UPDATE services SET active = FALSE WHERE id = $1', [id]);
    return NextResponse.json({ success: true, message: 'Service soft-deleted (set to inactive)' });
  } catch (error) {
    console.error('Error soft-deleting chemistry service:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}