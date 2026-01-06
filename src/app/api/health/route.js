/**
 * Health Check API Route (Server-Side with Admin Auth)
 * 
 * This route checks the connection to PocketBase with admin authentication.
 * 
 * Example: GET /api/health
 */

import { NextResponse } from 'next/server';
import { getPocketBaseClient, isAdminConfigured } from '@/lib/pocketbase';

export async function GET() {
  try {
    const baseUrl = process.env.POCKETBASE_URL;
    
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

    // Check if admin credentials are configured
    if (!isAdminConfigured()) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Admin credentials not configured',
          details: 'Set POCKETBASE_ADMIN_EMAIL and POCKETBASE_ADMIN_PASSWORD',
          timestamp: new Date().toISOString(),
        },
        { status: 500 }
      );
    }

    // Try to authenticate and connect
    const pb = await getPocketBaseClient();

    return NextResponse.json({
      status: 'healthy',
      message: 'Connected to PocketBase successfully with admin authentication',
      pocketbaseUrl: baseUrl,
      authenticated: true,
      timestamp: new Date().toISOString(),
    });
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
