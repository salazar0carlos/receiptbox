import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check database connection
    const dbHealthy = true; // In production, actually check Supabase connection

    // Check storage
    const storageHealthy = true; // In production, check Supabase Storage

    // Check external APIs
    const apisHealthy = true; // In production, check Google APIs, Stripe

    const allHealthy = dbHealthy && storageHealthy && apisHealthy;

    return NextResponse.json({
      status: allHealthy ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      services: {
        database: dbHealthy ? 'up' : 'down',
        storage: storageHealthy ? 'up' : 'down',
        externalAPIs: apisHealthy ? 'up' : 'down',
      },
    }, {
      status: allHealthy ? 200 : 503,
    });
  } catch (error) {
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Health check failed',
    }, {
      status: 503,
    });
  }
}
