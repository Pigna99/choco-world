import { frontend_info } from "./utilsFrontend"

const startingInfo:frontend_info = {list:[],last_choco:'new',settings:{music:false,audio:false, preload:false}}

const save=(info:frontend_info)=>{
    localStorage.setItem('info', JSON.stringify(info));
}

const load=()=>{
    const info = localStorage.getItem('info')
    if(!info){//if no info, save a new empty object
        save(startingInfo)
        return startingInfo
    }
    return JSON.parse(info);
}

const reset=()=>{
    save(startingInfo)
}

export {load,save,reset}