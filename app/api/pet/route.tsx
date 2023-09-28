import { CreatureClass } from '@/utils/CreatureClass';
import { getCreature, getRoutes, saveCreature } from '@/utils/utils';
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const creatureName = searchParams.get('name');
    if(creatureName === null){
        console.log('No name');
        return NextResponse.json({error:"no name from request"})
    }

    let files = getRoutes();//get all creature names
    if(!files.includes(creatureName)){//if the name is not found, reject the request
        console.log('Not existing creature requested');
        return NextResponse.json({error:"cannot pet a non existing creature"})
    }
    let creature:CreatureClass;
    creature = new CreatureClass(getCreature(creatureName));
    creature.simulate();//first try to simulate
    const response = creature.pet();//try to pet

    saveCreature(creature);
    return NextResponse.json({creature: creature.getInfo(), update: response})
}