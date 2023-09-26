import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    console.log("test update");

    return NextResponse.json("test update");
}