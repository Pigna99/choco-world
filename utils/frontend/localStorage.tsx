import { frontend_info } from "./utilsFrontend"

const startingInfo = {list:[],last_choco:'new'}

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

export {load,save}