import { CreatureClass } from '@/utils/backend/CreatureClass';
import { getCreature, updateCreature } from '@/utils/backend/database';
import { NextResponse } from 'next/server'
import { isValidObjectId } from 'mongoose';

export async function POST(request: Request) {
  
  const { searchParams } = new URL(request.url)
  const creatureId = searchParams.get('id');
  if(creatureId === null || creatureId === ''){
    console.log('No id');
    return NextResponse.json({error:"no id from request"},{
      status: 404,
    })
  }
    if(!isValidObjectId(creatureId)){
      console.log('invalid id');
      return NextResponse.json({error:"invalid id from request"},{
      status: 404,
    })
  }
    let creature:CreatureClass;
    creature = new CreatureClass(await getCreature(creatureId));//fetch creature from db
    if(creature.getInfo()===null){
      console.log("no creature found with this id")
      return NextResponse.json({found:false},{
        status: 200,
      })
    }
    
    creature.simulate();//simulate
    const cInfo = creature.getSavedCreature(creatureId);
    await updateCreature(creature.getInfo(), creatureId);//save creature info
    return NextResponse.json({found: true, savedCreature:cInfo} ,{
        status: 200,
      });
}