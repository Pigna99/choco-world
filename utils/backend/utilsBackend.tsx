import { Gender } from "../interfaces"

const validateHexColor = (color:string|null)=>{
    console.log(color)
    if(color)return /^[0-9A-F]{6}$/i.test(color)
    return false
}

const validateGender = (g:string):boolean=>{
    if(g==='male' ||g==='female') return true
    return false
}

const getGender = (g:string):Gender=>{
    if(g==='male')return 'male'
    return 'female'
}

// Valida un id creatura: 24 char esadecimali (forma ObjectId Mongo, mantenuta su
// Postgres per compatibilità con gli id già salvati lato client). Sostituisce
// mongoose.isValidObjectId, eliminato con la migrazione a Postgres (INFRA-99).
const isValidCreatureId = (id:string):boolean => /^[a-f\d]{24}$/i.test(id)

export {validateHexColor, validateGender,getGender, isValidCreatureId}

/**
 * Without transparent support: /^#[0-9A-F]{6}$/i.test('#AABBCC')
 * With transparent support: /^#[0-9A-F]{6}[0-9a-f]{0,2}$/i.test('#AABBCC80')
 * 3-character HEX support: /^#([0-9A-F]{3}){1,2}$/i.test('#ABC')
 */