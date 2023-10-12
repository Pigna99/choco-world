//import { isValidObjectId } from "mongoose";
import { savedChoco } from "../interfaces";
import { TICK_VALUE } from "../settings";

const checkCreatureId =(id: string, creatureList:savedChoco[])=>{
    console.log("Check id")
    //check if this id is present in the list:
    for (let i = 0; i < creatureList.length; ++i) {
        if (id === creatureList[i].id) {
            console.log('id is already in list')
            return false;
        }
    }
    //check if is an objectid
    /*
    if (!isValidObjectId(id)) {
        console.log('id is not valid')
        return false;
    }
    */
    return true
}

const validateNewCreature = (name:string, color:string) =>{
    if(name.length<2 || name.length>20)return false;//validate lenght
    //validate color!

    return true
}

const isUpdateTime = (lastUpdate:Date):boolean => {//check if is time to update, and if true set new time
    //const timeLeft = (new Date()).getTime() - (lastUpdate.getTime()+TICK_VALUE*60000)
    const value = (lastUpdate.getTime() + TICK_VALUE * 60000) < (new Date()).getTime()
    //console.log(timeLeft/1000, value)
    return value
}

export {checkCreatureId,validateNewCreature,isUpdateTime}