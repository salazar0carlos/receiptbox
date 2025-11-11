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

    const { format = 'csv' } = await request.json();

    // Fetch all receipts
    const { data: receipts, error } = await supabase
      .from('receipts')
      .select('*')
      .eq('user_id', user.id)
      .order('date', { ascending: false });

    if (error) {
      console.error('Fetch error:', error);
      return NextResponse.json({ error: 'Failed to fetch receipts' }, { status: 500 });
    }

    if (format === 'csv') {
      // Generate CSV
      const headers = ['Date', 'Vendor', 'Category', 'Amount', 'Tax', 'Payment Method', 'Notes'];
      const rows = receipts.map(r => [
        r.date || '',
        r.vendor || '',
        r.category || '',
        r.amount || '',
        r.tax_amount || '',
        r.payment_method || '',
        r.notes || '',
      ]);

      const csv = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
      ].join('\n');

      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="receipts-${new Date().toISOString().split('T')[0]}.csv"`,
        },
      });
    }

    return NextResponse.json({ receipts });
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
