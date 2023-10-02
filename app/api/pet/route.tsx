import { CreatureClass } from '@/utils/CreatureClass';
import { getCreature, updateCreature } from '@/utils/database';
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const creatureId = searchParams.get('id');
  if(creatureId === null){
    console.log('No id');
    return NextResponse.json({error:"no id from request"},{
      status: 404,
    })
  }

    let creature:CreatureClass;
    creature = new CreatureClass(await getCreature(creatureId));//fetch creature from db
    if(creature.getInfo()===null){
      console.log('ERROR, no creature found');
      return NextResponse.json({error:"cannot pet a non existing creature"},{
        status: 404,
      })
    }
    creature.simulate();//first try to simulate
    const response = creature.pet();//try to pet

    await updateCreature(creature.getInfo(), creatureId);//save creature info
    return NextResponse.json({creature: creature.getInfo(), update: response},{
        status: 200,
      })
}