import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import { createSheetFromTemplate } from '@/lib/google-sheets';
import { TemplateType } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();

    // Check authentication
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { templateType, accessToken } = await request.json();

    if (!templateType || !accessToken) {
      return NextResponse.json(
        { error: 'Template type and access token are required' },
        { status: 400 }
      );
    }

    // Create sheet from template
    const { sheetId, sheetUrl, sheetName } = await createSheetFromTemplate(
      accessToken,
      templateType as TemplateType
    );

    // Save connection to database
    const { data: connection, error } = await supabase
      .from('sheet_connections')
      .insert({
        user_id: user.id,
        sheet_id: sheetId,
        sheet_name: sheetName,
        sheet_url: sheetUrl,
        template_type: templateType,
        is_default: true, // First sheet is default
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Failed to save connection' }, { status: 500 });
    }

    return NextResponse.json({ connection });
  } catch (error) {
    console.error('Sheet creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create sheet' },
      { status: 500 }
    );
  }
}
