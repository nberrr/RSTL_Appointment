import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET /api/companies - List all companies
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');
    let sql = `
      SELECT id, name, contact_person, contact_email, contact_phone, business_permit, reg_date, verified, verified_date, license_plates, created_at, updated_at
      FROM companies
    `;
    let params = [];
    if (name) {
      sql += ' WHERE LOWER(name) = LOWER($1)';
      params.push(name);
    }
    sql += ' ORDER BY created_at DESC';
    const result = await query(sql, params);
    return NextResponse.json({ success: true, data: result.rows });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// POST /api/companies - Create a new company
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, contact_person, contact_email, contact_phone, business_permit, reg_date, address } = body;
    if (!name) {
      return NextResponse.json({ success: false, message: 'Name is required' }, { status: 400 });
    }
    const result = await query(
      `INSERT INTO companies (name, contact_person, contact_email, contact_phone, business_permit, reg_date, address)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, name, contact_person, contact_email, contact_phone, business_permit, reg_date, verified, verified_date, license_plates, created_at, updated_at`,
      [name, contact_person, contact_email, contact_phone, business_permit, reg_date, address]
    );
    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
} 