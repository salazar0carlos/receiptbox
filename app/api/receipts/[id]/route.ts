import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createServerSupabaseClient();

    // Check authentication
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const receiptId = id;

    // Get receipt to check ownership and get image URL
    const { data: receipt, error: fetchError } = await supabase
      .from('receipts')
      .select('*')
      .eq('id', receiptId)
      .eq('user_id', user.id)
      .single();

    if (fetchError || !receipt) {
      return NextResponse.json({ error: 'Receipt not found' }, { status: 404 });
    }

    // Delete image from storage
    if (receipt.image_url) {
      const fileName = receipt.image_url.split('/').pop();
      if (fileName) {
        await supabase.storage
          .from('receipts')
          .remove([`${user.id}/${fileName}`]);
      }
    }

    // Delete receipt from database
    const { error: deleteError } = await supabase
      .from('receipts')
      .delete()
      .eq('id', receiptId)
      .eq('user_id', user.id);

    if (deleteError) {
      console.error('Delete error:', deleteError);
      return NextResponse.json({ error: 'Failed to delete receipt' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Receipt delete error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createServerSupabaseClient();

    // Check authentication
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const receiptId = id;
    const updates = await request.json();

    // Update receipt
    const { data: receipt, error } = await supabase
      .from('receipts')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', receiptId)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      console.error('Update error:', error);
      return NextResponse.json({ error: 'Failed to update receipt' }, { status: 500 });
    }

    return NextResponse.json({ receipt });
  } catch (error) {
    console.error('Receipt update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
