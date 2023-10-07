import { Creature } from "../interfaces";
import { TICK_VALUE } from "../settings";

type spritesList =
    'eat'|'happy'|'sleep'|'stand'|'walk-bottom'|'walk-right'|'walk-left'|'walk-top';

type menu = 'stats' | 'actions' | 'info' | 'settings'

const menuList:menu[] = ['stats', 'actions', 'info', 'settings']    
const spritesArray:spritesList[] = ['eat','happy','sleep','stand','walk-bottom','walk-right','walk-left','walk-top'];

type menu_interface ={left:number,actual:number,right:number}

type API_string = 'update'|'pet'|'feed'


function getTicksFromDate(d:Date){//number of ticks from that Date to now
    const new_ticks_float= ((new Date()).getTime()-d.getTime()) / (60000*TICK_VALUE);
    const new_ticks = Math.floor(new_ticks_float);
    return new_ticks;
}

const precalcFeed = (c:Creature):boolean=>{
    return c.statictics.hunger.actual!==c.statictics.hunger.max
}

const precalcPet = (c:Creature):boolean=>{
    return getTicksFromDate(new Date(c.last_time_pet))>=1
}



export type {spritesList, menu, API_string, menu_interface}
export{getTicksFromDate, precalcFeed, precalcPet,spritesArray,menuList}