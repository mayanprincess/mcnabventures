/**
 * Health Check API Route
 * 
 * This route checks the connection to PocketBase
 * 
 * Example: GET /api/health
 */

import { NextResponse } from 'next/server';
import { pb } from '@/lib/pocketbase';

export async function GET() {
  try {
    // Try to get health status from PocketBase
    // This is a simple connection check
    const baseUrl = process.env.NEXT_PUBLIC_POCKETBASE_URL;
    
    if (!baseUrl) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'PocketBase URL not configured',
          timestamp: new Date().toISOString(),
        },
        { status: 500 }
      );
    }

    // Attempt a simple fetch to check if PocketBase is reachable
    const response = await fetch(`${baseUrl}/api/health`, {
      method: 'GET',
    });

    if (response.ok) {
      return NextResponse.json({
        status: 'healthy',
        message: 'Connected to PocketBase successfully',
        pocketbaseUrl: baseUrl,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json(
      {
        status: 'unhealthy',
        message: 'PocketBase is not responding',
        pocketbaseUrl: baseUrl,
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  } catch (error) {
    console.error('Health check error:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
