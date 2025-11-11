import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient, supabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();

    // Check authentication
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin (you can add admin check logic here)
    // For now, anyone can access analytics for their own data

    // Get user's receipts count
    const { count: receiptsCount } = await supabase
      .from('receipts')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    // Get total spending
    const { data: receipts } = await supabase
      .from('receipts')
      .select('amount')
      .eq('user_id', user.id);

    const totalSpending = receipts?.reduce((sum, r) => sum + (r.amount || 0), 0) || 0;

    // Get spending by category
    const { data: categoryData } = await supabase
      .from('receipts')
      .select('category, amount')
      .eq('user_id', user.id);

    const spendingByCategory = categoryData?.reduce((acc, r) => {
      const cat = r.category || 'Uncategorized';
      acc[cat] = (acc[cat] || 0) + (r.amount || 0);
      return acc;
    }, {} as Record<string, number>) || {};

    // Get recent activity (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { count: recentCount } = await supabase
      .from('receipts')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('created_at', thirtyDaysAgo.toISOString());

    // Get sheet connections
    const { count: sheetsCount } = await supabase
      .from('sheet_connections')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    // Get subscription info
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .single();

    return NextResponse.json({
      receipts: {
        total: receiptsCount || 0,
        last30Days: recentCount || 0,
      },
      spending: {
        total: totalSpending,
        byCategory: spendingByCategory,
      },
      sheets: {
        connected: sheetsCount || 0,
      },
      subscription: {
        plan: subscription?.plan_type || 'free',
        status: subscription?.status || 'active',
      },
    });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
