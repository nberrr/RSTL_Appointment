import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function PATCH(request, { params }) {
  const { id } = params;
  const { status } = await request.json();

  if (!status) {
    return NextResponse.json(
      { success: false, message: 'Status is required' }, 
      { status: 400 }
    );
  }

  // Optional: Add validation for allowed statuses
  const allowedStatuses = ['pending', 'accepted', 'in progress', 'completed', 'declined'];
  if (!allowedStatuses.includes(status.toLowerCase())) {
      return NextResponse.json(
          { success: false, message: 'Invalid status provided' }, 
          { status: 400 }
      );
  }

  try {
    const result = await query(
      `UPDATE appointments SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
      [status, id]
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Appointment not found' }, 
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Appointment status updated successfully',
      data: result.rows[0]
    });

  } catch (error) {
    console.error('Error updating appointment status:', error);
    return NextResponse.json(
      { success: false, message: error.message }, 
      { status: 500 }
    );
  }
} 