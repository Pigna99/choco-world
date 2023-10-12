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

const updateVisualsLogic=(v: VisualState, setSprite:Dispatch<SetStateAction<spritesSettings>>, setInfoText:Dispatch<SetStateAction<string>>)=>{
    switch (v) {
        case 'walking':
            let r = Math.floor(Math.random() * 4)
            const walking_sprites: spritesList[] = ['walk-bottom', 'walk-right', 'walk-left', 'walk-top']
            setSprite({name:walking_sprites[r], loop:true, fps:16})//randomize walking better
            setInfoText('walking...')
            break;
        case 'sleeping':
            setSprite({name:'sleep', loop:true, fps:8})
            setInfoText('sleeping...')
            break;
        case 'idle':
            setSprite({name:'stand', loop:true, fps:4})
            break;
        case 'idle-feed':
            setSprite({name:'stand', loop:true, fps:4})
            setInfoText('not hungry')
            console.log('You have to wait more before eating again')
            break;
        case 'idle-pet':
            setSprite({name:'stand', loop:true, fps:4})
            setInfoText('try pet later')
            console.log('You have to wait more before petting again')
            break;
        case 'eating':
            setSprite({name:'eat', loop:true, fps:8})
            setInfoText('eating!')
            break;
        case 'happy':
            setSprite({name:'happy', loop:true, fps:12})
            setInfoText('happy!')
            break;
        case 'egg':
            setSprite({name:'egg', loop:false})
            break;
        case 'eggshake':
            setSprite({name:'eggshake',loop:false, numLoops:0, onEnd:()=>{
                updateVisualsLogic('egg', setSprite, setInfoText)
            }})
            break;  
        case 'hatching':
            setSprite({name:'hatching', loop:false, fps:6})
            break;  
        case 'loading':
            setSprite({name:'none', loop:false})
            setInfoText('loading info...')
            break;   
        default:
            console.log('error, no animation')
            break;
    }
}

type menu = 'stats' | 'actions' | 'info' | 'settings' | 'chocos' | 'new' | 'load'

const chocoMenuList:menu[] = ['stats', 'actions', 'info', 'settings', 'chocos']    
const newMenuList:menu[] = ['new','load', 'settings','chocos']  

type menu_interface ={left:number,actual:number,right:number}

type API_string = 'update'|'pet'|'feed'

type frontend_info = {
    list:savedChoco[],
    last_choco:string,
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


export type {spritesList, menu, API_string, menu_interface, frontend_info, spritesSettings}
export{getTicksFromDate, precalcFeed, precalcPet,chocoMenuList,newMenuList,generateArrayFrame, getRange, updateVisualsLogic}