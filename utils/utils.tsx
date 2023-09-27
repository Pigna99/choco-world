import fs from 'fs'
import { CreatureClass } from './CreatureClass';

const getRoutes = ()=>{
    return fs.readdirSync('./chocos').map(el=>el.replace(/\.[^/.]+$/, ""));//remove .json extension
}

const getCreature = (creatureName:string)=>{
    return JSON.parse(fs.readFileSync(`./chocos/${creatureName}.json`, 'utf8'))
}

const saveCreature = (creature: CreatureClass)=>{
    fs.writeFileSync(`./chocos/${creature.getName()}.json`, JSON.stringify(creature.getInfo()));
}
export {getRoutes, getCreature, saveCreature}