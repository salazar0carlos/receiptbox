import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import { writeReceiptToSheet } from '@/lib/google-sheets';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();

    // Check authentication
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { receiptId, sheetId, accessToken } = await request.json();

    if (!receiptId || !sheetId || !accessToken) {
      return NextResponse.json(
        { error: 'Receipt ID, sheet ID, and access token are required' },
        { status: 400 }
      );
    }

    // Fetch receipt
    const { data: receipt, error: receiptError } = await supabase
      .from('receipts')
      .select('*')
      .eq('id', receiptId)
      .eq('user_id', user.id)
      .single();

    if (receiptError || !receipt) {
      return NextResponse.json({ error: 'Receipt not found' }, { status: 404 });
    }

    // Write to sheet
    await writeReceiptToSheet(accessToken, sheetId, {
      date: receipt.date ? new Date(receipt.date) : null,
      vendor: receipt.vendor,
      category: receipt.category,
      amount: receipt.amount,
      tax_amount: receipt.tax_amount,
      payment_method: receipt.payment_method,
      receipt_link: receipt.image_url,
      notes: receipt.notes,
    });

    // Update receipt with sheet info
    await supabase
      .from('receipts')
      .update({
        sheet_id: sheetId,
        updated_at: new Date().toISOString(),
      })
      .eq('id', receiptId);

    // Update last_sync_at
    await supabase
      .from('sheet_connections')
      .update({
        last_sync_at: new Date().toISOString(),
      })
      .eq('sheet_id', sheetId);

    // Log usage
    await supabase
      .from('usage_logs')
      .insert({
        user_id: user.id,
        action: 'sheet_sync',
      });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Sheet write error:', error);
    return NextResponse.json(
      { error: 'Failed to write to sheet' },
      { status: 500 }
    );
  }
}
