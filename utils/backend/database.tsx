import { CreatureClass } from './CreatureClass';
import { connect } from './connect';
import { Creature } from '../interfaces';


//fs 
/*

import fs from 'fs'
const getRoutes = ()=>{
    return fs.readdirSync('./chocos').map(el=>el.replace(/\.[^/.]+$/, ""));//remove .json extension
}

const getCreature = (creatureName:string)=>{
    return JSON.parse(fs.readFileSync(`./chocos/${creatureName}.json`, 'utf8'))
}

const saveCreature = (creature: CreatureClass)=>{
    fs.writeFileSync(`./chocos/${creature.getName()}.json`, JSON.stringify(creature.getInfo()));
}
*/

const getRoutes = async ()=>{//return an array of id (string)
    const { creatureCollection } = await connect() // connect to database
    const ids = await creatureCollection.find({}).distinct('_id');
    return ids.map(id=>id.toString());
}

const getCreature = async (creatureId:string)=>{
    const { creatureCollection } = await connect()
    return await creatureCollection.findOne({_id:creatureId});
}

const newCreature = async (name:string)=>{//create new creature and return id
    const { creatureCollection } = await connect() // connect to database
    const c = new creatureCollection(CreatureClass.newCreature(name).getInfo());
    await c.save();
    return c._id.toString();
}

const updateCreature = async (creature: Creature, creatureId: string)=>{//save creature and return id
    const { creatureCollection } = await connect() // connect to database
    await creatureCollection.findOneAndUpdate({_id:creatureId},creature);
    //console.log(`[${creature.name}-${creatureId}]-updated`)
}

export {getRoutes, getCreature, updateCreature, newCreature}