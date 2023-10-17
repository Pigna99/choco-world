import { get, set, clear } from 'idb-keyval';
import { audioList, getAudioPath, getMusicPath, musicList } from './audio';

type loadableLink = {name:string, url:string}
type loadingInfoType = {percentage:number,name:string}

const dbVersion = 4;
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
        setLoadingInfo({name:'setting version', percentage:0})
        await set('version', dbVersion)
        setLoadingInfo({name:'setting version', percentage:100})
        console.log(`Version setted: ${dbVersion}`)
    }catch(err){
        console.log('It failed!', err)
    }
    
    //set version

    //load all mp3s musics in db
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
    setLoadingInfo({name:'music-complete', percentage:100})
    //load all mp3s musics in db
    
    //load all mp3s audio in db
    for(let index=0; index<audioList.length; index++){
        const filename= audioList[index]
        let stream = await fetch(getAudioPath(filename))//fetch file
        let blob = await stream.blob();//transform in blob
        if(LOCALDEBUG)console.log(`${filename} loading in db ...`)
        try{
            setLoadingInfo({name:'downloading audio-'+filename, percentage:getPercentage(index,audioList.length)})
            await set(filename, blob)//load in db
            if(LOCALDEBUG)console.log(`${filename} loaded in db`)
        }catch(err){
            console.log(`ERROR in loading ${filename} ${err}`)
        }
    }
    setLoadingInfo({name:'complete', percentage:100})
    //load all mp3s audio in db
}

const getPreloadedFiles= async (loadFiles:(f:loadableLink[])=>void,setLoadingInfo:(info:loadingInfoType)=>void)=>{
    const URL = window.URL
    let loadbleFiles:loadableLink[] = [];
    //loading musics from fb
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
    setLoadingInfo({name:'music loaded', percentage:100})
    //loading musics from fb
    //loading audios from fb
    for(let index=0; index<audioList.length; index++){
        const filename= audioList[index]
        if(LOCALDEBUG)console.log(`getting ${filename} from db`)
        let res;
        try{
            setLoadingInfo({name:'loading audio-'+filename, percentage:getPercentage(index,audioList.length)})
            res = await get(filename)
            if(LOCALDEBUG)console.log(`got ${filename} from db`)
            const url = URL.createObjectURL(res);
            const f:loadableLink={
                name:'audio-'+filename,
                url:url
            }
            loadbleFiles.push(f)
        }catch(err){
            console.log(`ERROR in getting ${filename} ${err}`)
        }
    }
    //loading audios from fb
    //at the end, load the links
    loadFiles(loadbleFiles)
}

const loadFiles= async(loadFiles:(f:loadableLink[])=>void, setLoadingInfo:(info:loadingInfoType)=>void)=>{ 
    if(await isNewVersion()){
        setLoadingInfo({name:'saving new version', percentage:0})
        await preloadFiles(setLoadingInfo);
        setLoadingInfo({name:'loading new version', percentage:0})
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