import { get, set, clear } from 'idb-keyval';
import { getMusicPath, musicList } from './audio';

type loadableLink = {name:string, url:string}
type loadingInfoType = {percentage:number,name:string}

const dbVersion = 2;
const LOCALDEBUG=false;

const getPercentage= (index:number, lenght:number)=>{
    return(
        Math.round((index/lenght)*100)
    )
}

const clearPreloadedFiles = async()=>{
    await clear();
}

const preloadFiles= async (setLoadingInfo:(info:loadingInfoType)=>void)=>{
    await clear();//first delete all preloaded files

    //set version
    try{
        setLoadingInfo({name:'version', percentage:0})
        await set('version', dbVersion)
        setLoadingInfo({name:'version', percentage:100})
        console.log(`Version setted: ${dbVersion}`)
    }catch(err){
        console.log('It failed!', err)
    }
    
    //set version

    //load all mp3s in db
    
    for(let index=0; index<musicList.length; index++){
        const filename= musicList[index]
        let stream = await fetch(getMusicPath(filename))//fetch file
        let blob = await stream.blob();//transform in blob
        if(LOCALDEBUG)console.log(`${filename} loading in db ...`)
        try{
            setLoadingInfo({name:'downloading music-'+filename, percentage:getPercentage(index,musicList.length)})
            await set(filename, blob)//load in db
            if(LOCALDEBUG)console.log(`${filename} loaded in db`)
        }catch(err){
            console.log(`ERROR in loading ${filename} ${err}`)
        }
    }
    setLoadingInfo({name:'complete', percentage:100})
    //load all mp3s in db
    
}

const getPreloadedFiles= async (loadFiles:(f:loadableLink[])=>void,setLoadingInfo:(info:loadingInfoType)=>void)=>{
    const URL = window.URL
    let loadbleFiles:loadableLink[] = [];
    for(let index=0; index<musicList.length; index++){
        const filename= musicList[index]
        if(LOCALDEBUG)console.log(`getting ${filename} from db`)
        let res;
        try{
            setLoadingInfo({name:'loading music-'+filename, percentage:getPercentage(index,musicList.length)})
            res = await get(filename)
            if(LOCALDEBUG)console.log(`got ${filename} from db`)
            const url = URL.createObjectURL(res);
            const f:loadableLink={
                name:'music-'+filename,
                url:url
            }
            loadbleFiles.push(f)
        }catch(err){
            console.log(`ERROR in getting ${filename} ${err}`)
        }
    }
    //at the end, load the links
    loadFiles(loadbleFiles)
}

const loadFiles= async(loadFiles:(f:loadableLink[])=>void, setLoadingInfo:(info:loadingInfoType)=>void)=>{ 
    if(await isNewVersion()){
        await preloadFiles(setLoadingInfo);
    }
    await getPreloadedFiles(loadFiles, setLoadingInfo);
}
const isNewVersion= async ()=>{
    const val = await get('version')
    if(val!==dbVersion){
        return true
    }
    return false
}

export {loadFiles,clearPreloadedFiles}
export type {loadableLink,loadingInfoType}