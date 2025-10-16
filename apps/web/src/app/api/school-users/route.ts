import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    const params = {
        roles: searchParams.get('roles')?.split(',').filter(Boolean) || [],
        limit: parseInt(searchParams.get('limit') || '10', 10),
        searchTerm: searchParams.get('search_term') || undefined,
        lastSeenCreatedAt: searchParams.get('last_seen_created_at')
            ? new Date(searchParams.get('last_seen_created_at')!)
            : undefined,
        cohortIDs: searchParams.get('cohort_ids')?.split(',').filter(Boolean) || [],
    };

    console.log(params);

    return NextResponse.json({ success: true, data: params });
}