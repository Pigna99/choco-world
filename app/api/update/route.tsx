import { NextResponse } from 'next/server'
import { CreatureClass } from '@/utils/CreatureClass';
import { getCreature, getRoutes, saveCreature } from '@/utils/utils';


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const creatureName = searchParams.get('name');
    if(creatureName === null){
        console.log('No name');
        return NextResponse.json({error:"no name from request"})
    }

    let files = getRoutes();//get all creature names

    let creature:CreatureClass;
    if(!files.includes(creatureName)){//if the name is not found, generate a new Choco!
        creature = CreatureClass.newCreature(creatureName);
    }else{//else, read info from memory and update (simulate)
        creature = new CreatureClass(getCreature(creatureName));
        creature.simulate();
    }

    saveCreature(creature);//save creature info
    return NextResponse.json(creature.getInfo());
}