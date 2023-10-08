import { newCreature } from '@/utils/backend/database';
import { getGender, validateGender, validateHexColor } from '@/utils/backend/utilsBackend';
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const creatureName = searchParams.get('name');
  const creatureColor = searchParams.get('color');
  const creatureGender = searchParams.get('gender');
  if(creatureName === null || creatureName === ''){
    console.log('No name');
    return NextResponse.json({error:"no name from request"},{
      status: 404,
    })
  }
  if(creatureColor=== null){
    console.log('No color');
    return NextResponse.json({error:"no color from request"},{
      status: 404,
    })
  }
  if(!validateHexColor(creatureColor)){
    console.log('Color not formatted correctly');
    return NextResponse.json({error:"no good color from request"},{
      status: 404,
    })
  }
  if(creatureGender===null){
    console.log('No gender');
    return NextResponse.json({error:"no gender from request"},{
      status: 404,
    })
  }
  if(!validateGender(creatureGender)){
    console.log('No correct gender');
    return NextResponse.json({error:"no good gender from request"},{
      status: 404,
    })
  }
  

  const id= await newCreature(creatureName, creatureColor, getGender(creatureGender));//save creature info
  return NextResponse.json({creatureId: id, text:`Id for [${creatureName}], the new creature generated:${id}`} ,{
      status: 200,
    });
}