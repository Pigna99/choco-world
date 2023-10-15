import { audiotrace, musictrace } from "@/utils/frontend/audio";
import { clearPreloadedFiles, loadFiles, loadableLink, loadingInfoType } from "@/utils/frontend/idb";
import { load, reset, save } from "@/utils/frontend/localStorage";
import { frontend_info, settings } from "@/utils/frontend/utilsFrontend";
import { savedChoco } from "@/utils/interfaces";
import { DEBUG } from "@/utils/settings";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

type GlobalContextProps = {
    isFirstRendering:boolean,isFirstLoading:boolean,startFetch:boolean, isBackground:boolean,
    localInfo:frontend_info, resetLocalInfo:()=>void, updateLocalInfo:()=>void,
    loadingInfo:loadingInfoType,setLoadingInfo:(l:loadingInfoType)=>void, 
    changeCreature:(id:string)=>void, addCreatureToList:(c:savedChoco)=>void, removeActualCreature:()=>void,
    toggleSetting:(setting:settings)=>void,
    getMusicLink:(name:musictrace)=>string, getAudioLink:(name:audiotrace)=>string, 
    openLoadingScreen:()=>void, closeLoadingScreen:()=>void,
    
}

const GlobalContext = createContext<GlobalContextProps|null>(null);
/**
 * GLOBAL CONTEXT: loading all files from the localstorage/indexedDB
 */
const startingInfo:frontend_info={
    list: [],
    last_choco: "",
    settings: {
        music: false,
        audio: false,
        preload: false
    }
}
export const GlobalProvider = (props: PropsWithChildren) => {
    const [isFirstRendering, setIsFirstRendering] = useState(true)//only for prevent the first rendering useEffect!
    //preloading content
    const [linkLoader, setLinkLoader] = useState<loadableLink[]>([])//data drom indexedDB - for loading the urls of musics, images etc
    const [loadingInfo, setLoadingInfo] = useState<loadingInfoType>({percentage:0,name:'loading files'});//info for the loading bar
    const [isFirstLoading, setIsFirstLoading] = useState(true); //first load before starting app
    const [startFetch, setStartFetch] = useState(false);//

    const [localInfo, setLocalInfo] = useState<frontend_info>(startingInfo)//data from localstorage
    const [isBackground, setIsBackground] = useState<boolean>(false)//incorporate in settings if you want to use background things

    //handling local info
    const toggleSetting = (setting:settings)=>{
        let newInfo:frontend_info;
        switch (setting) {
            case 'audio':newInfo= {...localInfo, settings:{...localInfo.settings, audio:!localInfo.settings.audio}};break;
            case 'music':newInfo= {...localInfo, settings:{...localInfo.settings, music:!localInfo.settings.music}};break;
            case 'preload':newInfo= {...localInfo, settings:{...localInfo.settings, preload:!localInfo.settings.preload}};break;
        }//than save!
        setLocalInfo(newInfo);
        save(newInfo);
    }
    const changeCreature= (id: string) =>{
        if (id !== localInfo.last_choco) {
            setLocalInfo({...localInfo, last_choco:id});
        }
    }
    const addCreatureToList = (c: savedChoco) => {//add new creature to list, and set new actual creature id
        setLocalInfo({...localInfo, last_choco:c.id, list:[...localInfo.list, c]});
    }

    const removeActualCreature = () => {
        if (localInfo.list.length === 0) return;
        for (let i = 0; i < localInfo.list.length; ++i) {
            if (localInfo.list[i].id === localInfo.last_choco) {
                let newList = localInfo.list;
                newList.splice(i, 1);
                let newId = newList.length !== 0 ? newList[0].id : 'new'
                setLocalInfo({...localInfo, last_choco:newId, list:newList});
                save({...localInfo, last_choco:newId, list:newList})
                return;
            }
        }
    }
    
    const updateLocalInfo = () => {
        save(localInfo)
    }
    const resetLocalInfo = ()=>{
        reset();
        setLocalInfo(load())
    }
    const loadFileLink= (files:loadableLink[])=>{
        setLinkLoader(files)
    }
    const changeLoadingInfo = (info:loadingInfoType)=>{
        setLoadingInfo(info);
    }
    const getMusicLink=(name:musictrace)=>{//get preloaded music link
        for(let i=0; i<linkLoader.length; ++i){
            if(linkLoader[i].name==='music-'+name){
                return linkLoader[i].url
            }
        }
        return ''
    }

    const getAudioLink=(name:audiotrace)=>{//get preloaded audio link
        for(let i=0; i<linkLoader.length; ++i){
            if(linkLoader[i].name==='audio-'+name){
                return linkLoader[i].url
            }
        }
        return ''
    }
    const openLoadingScreen=()=>{
        setIsFirstLoading(true)
    }
    const closeLoadingScreen=()=>{
        setIsFirstLoading(false)
    }

    useEffect(() => {
        if(DEBUG)console.log(linkLoader)
      }, [linkLoader])
    //preloading
    
    useEffect(() => {//first rendering, load info from local storage
        setIsFirstRendering(false)
        const info:frontend_info = load()//get localstorage content
        setLocalInfo(info);
        if(!info.settings.preload){
            setStartFetch(true)
            //setLoadingInfo({percentage:100,name:'complete'})//and the fetch?
        }
        window.addEventListener("visibilitychange", ()=>{//check if the app is in backgound
            if (document.visibilityState === "visible") {
                setIsBackground(false);
            }else{
                setIsBackground(true);
            }
        })
    }, [])

    useEffect(() => {//When isPreload is loaded, load local files with indexeddb
        if(!isFirstRendering){
            if(localInfo.settings.preload){
                openLoadingScreen()
                loadFiles(loadFileLink,changeLoadingInfo)
                .then(()=>{
                    console.log('local files loaded');
                    if(startFetch===false){
                        setLoadingInfo({name:'starting fetching', percentage:100})
                        setStartFetch(true)
                        return;
                        }
                    }
                )
            }else{
                clearPreloadedFiles()
                console.log('clear preloading')
            }
        }
    }, [localInfo.settings.preload])
    
    
    return(
        <GlobalContext.Provider value={{isBackground,startFetch,setLoadingInfo,openLoadingScreen, closeLoadingScreen, toggleSetting,addCreatureToList,removeActualCreature,changeCreature,resetLocalInfo, updateLocalInfo, loadingInfo,isFirstLoading, localInfo, getAudioLink, getMusicLink, isFirstRendering}}>
            {props.children}
        </GlobalContext.Provider>
    )
}

const useGlobalContext = () : GlobalContextProps => {
    const context = useContext(GlobalContext);
    if (!context) {
      throw new Error("Please use GlobalProvider in parent component");
    }
    return context;
  };
  
  export {useGlobalContext};