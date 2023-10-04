import { newCreature } from '@/utils/backend/database';
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const creatureName = searchParams.get('name');
  if(creatureName === null){
    console.log('No name');
    return NextResponse.json({error:"no name from request"},{
      status: 404,
    })
    }

    
    const id= await newCreature( creatureName);//save creature info
    return NextResponse.json({creatureId: id, text:`Id for [${creatureName}], the new creature generated:${id}`} ,{
        status: 200,
      });
}