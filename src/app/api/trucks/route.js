import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET /api/trucks - List all trucks
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const license_plate = searchParams.get('license_plate');
    const company_id = searchParams.get('company_id');
    let sql = `
      SELECT id, license_plate, company_id, orcr_document, created_at, updated_at
      FROM trucks
    `;
    let params = [];
    if (license_plate && company_id) {
      sql += ' WHERE LOWER(license_plate) = LOWER($1) AND company_id = $2';
      params.push(license_plate, company_id);
    } else if (license_plate) {
      sql += ' WHERE LOWER(license_plate) = LOWER($1)';
      params.push(license_plate);
    } else if (company_id) {
      sql += ' WHERE company_id = $1';
      params.push(company_id);
    }
    sql += ' ORDER BY created_at DESC';
    const result = await query(sql, params);
    return NextResponse.json({ success: true, data: result.rows });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// POST /api/trucks - Create a new truck
export async function POST(request) {
  try {
    const body = await request.json();
    const { license_plate, company_id } = body;
    if (!license_plate) {
      return NextResponse.json({ success: false, message: 'License plate is required' }, { status: 400 });
    }
    const result = await query(
      `INSERT INTO trucks (license_plate, company_id, orcr_document)
       VALUES ($1, $2, $3)
       RETURNING id, license_plate, company_id, orcr_document, created_at, updated_at`,
      [license_plate, company_id, body.orcr_document]
    );
    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
} 