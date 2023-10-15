import { Dispatch, SetStateAction } from "react";
import { Creature, VisualState, savedChoco } from "../interfaces";
import { TICK_VALUE } from "../settings";

type spritesList =
    'eat'|'happy'|'sleep'|'stand'|'walk-bottom'|'walk-right'|'walk-left'|'walk-top'|'egg'|'eggshake'|'hatching'|'none';

type spritesSettings = {
    name:spritesList,
    loop:boolean,
    numLoops?:number
    onEnd?:()=>void,
    fps?:number
}

type menu = 'stats' | 'actions' | 'info' | 'settings' | 'chocos' | 'new' | 'load'

const creatureMenuList:menu[] = ['stats', 'actions', 'info', 'settings', 'chocos']    
const newMenuList:menu[] = ['new','load', 'settings','chocos']  

type menu_interface ={left:number,actual:number,right:number}

type API_string = 'update'|'pet'|'feed'
type settings = 'music'|'audio' |'preload'

type frontend_info = {
    list:savedChoco[],
    last_choco:string,
    settings:{
        music:boolean,
        audio:boolean,
        preload:boolean
    }
}

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

const generateArrayFrame = (n:number) =>{
    let arr=[]
    for(let i=1;i<=n;i++){
        arr.push(i)
    }
    return arr;
}

const getRange=(start:number, end:number)=>{
    const range = end-start;
    return start+Math.round(Math.random()*range)
}


export type {spritesList, menu, API_string, menu_interface, frontend_info, spritesSettings, settings}
export{getTicksFromDate, precalcFeed, precalcPet,creatureMenuList,newMenuList,generateArrayFrame, getRange}