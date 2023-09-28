import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    console.log("test API");

    return NextResponse.json("test API");
}

