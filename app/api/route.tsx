import { getRoutes,  } from '@/utils/backend/database';
import { NextResponse } from 'next/server'
// Route data-dipendente: niente prerender a build-time (apre il DB).
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    let id = await getRoutes();
    //console.log(id)
    return NextResponse.json({routes_list:id},{
        status: 200,
      });
}

