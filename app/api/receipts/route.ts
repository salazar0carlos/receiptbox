import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();

    // Check authentication
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      vendor,
      amount,
      date,
      category,
      tax_amount,
      payment_method,
      notes,
      image_url,
      raw_ocr_data,
    } = body;

    // Insert receipt
    const { data: receipt, error } = await supabase
      .from('receipts')
      .insert({
        user_id: user.id,
        vendor,
        amount,
        date,
        category,
        tax_amount,
        payment_method,
        notes,
        image_url,
        raw_ocr_data,
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Failed to save receipt' }, { status: 500 });
    }

    // Log usage
    await supabase
      .from('usage_logs')
      .insert({
        user_id: user.id,
        action: 'receipt_upload',
      });

    return NextResponse.json({ receipt });
  } catch (error) {
    console.error('Receipt save error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();

    // Check authentication
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Fetch receipts
    const { data: receipts, error, count } = await supabase
      .from('receipts')
      .select('*', { count: 'exact' })
      .eq('user_id', user.id)
      .order('date', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Failed to fetch receipts' }, { status: 500 });
    }

    return NextResponse.json({ receipts, total: count });
  } catch (error) {
    console.error('Receipts fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
