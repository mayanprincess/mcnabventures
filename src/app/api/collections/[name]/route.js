/**
 * Collections API Route
 * 
 * This API route demonstrates how to use PocketBase on the server-side
 * in Next.js API routes.
 * 
 * Example: GET /api/collections/posts?page=1&perPage=10
 */

import { NextResponse } from 'next/server';
import { getRecords, getFullList } from '@/lib/services/collections';

/**
 * GET /api/collections/[name]
 * Fetch records from a specific collection
 */
export async function GET(request, { params }) {
  try {
    const { name } = params;
    const { searchParams } = new URL(request.url);

    // Get query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const perPage = parseInt(searchParams.get('perPage') || '50');
    const filter = searchParams.get('filter') || '';
    const sort = searchParams.get('sort') || '';
    const expand = searchParams.get('expand') || '';
    const fullList = searchParams.get('fullList') === 'true';

    // Fetch data
    let result;
    if (fullList) {
      result = await getFullList(name, { filter, sort, expand });
    } else {
      result = await getRecords(name, { page, perPage, filter, sort, expand });
    }

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json(result.data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
