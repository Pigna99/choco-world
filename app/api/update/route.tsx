import { NextResponse } from 'next/server'
import fs from 'fs'
import { CreatureClass } from '@/utils/classes';
import { TICK_VALUE } from '@/utils/settings';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const creatureName = searchParams.get('name');
    if(creatureName === null){
        console.log('No name');
        return NextResponse.json({error:"no name from request"})
    }

    let files = fs.readdirSync('./chocos').map(el=>el.replace(/\.[^/.]+$/, ""));//remove .json extension


    let creature:CreatureClass;
    if(!files.includes(creatureName)){//if the name is not found, generate a new Choco!
        creature = CreatureClass.newCreature(creatureName);
    }else{//else, read info from memory
        creature = new CreatureClass(JSON.parse(fs.readFileSync(`./chocos/${creatureName}.json`, 'utf8')))
        simulate(creature);
    }

    fs.writeFileSync(`./chocos/${creatureName}.json`, JSON.stringify(creature.getInfo()));//save creature info
    return NextResponse.json(creature.getInfo());
}



const simulate = (c :CreatureClass) =>{
    //calculate the number of ticks, 1 tick= 5min! (TICK_VALUE)
    const last_update = new Date(c.getUpdateTime());
    const new_ticks_float= ((new Date()).getTime()-last_update.getTime()) / (60000*TICK_VALUE);
    const new_ticks = Math.floor(new_ticks_float);
    const new_update = new Date(last_update.getTime() + new_ticks*60000*TICK_VALUE);


    for(let i_ticks = new_ticks; i_ticks>0; ++i_ticks){//foreach tick simulate!
        
    }
    //c.setUpdateTime(new_update); //update timer to the next tick
    console.log('new ticks(float): ' + new_ticks_float);
}