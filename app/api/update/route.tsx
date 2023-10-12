import { CreatureClass } from '@/utils/backend/CreatureClass';
import { getCreature, updateCreature } from '@/utils/backend/database';
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  const creatureId = searchParams.get('id');
  if(creatureId === null || creatureId === ''){
    console.log('No id');
    return NextResponse.json({error:"no id from request"},{
      status: 404,
    })
  }

    let creature:CreatureClass;
    creature = new CreatureClass(await getCreature(creatureId));//fetch creature from db
    if(creature.getInfo()===null){
      console.log("ERROR, no creature found")
      return NextResponse.json({error:"noiddb"},{
        status: 404,
      })
    }
    
    creature.simulate();//simulate
    
    await updateCreature(creature.getInfo(), creatureId);//save creature info
    return NextResponse.json({creature: creature.getInfo(),} ,{
        status: 200,
      });
}