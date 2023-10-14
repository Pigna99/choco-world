import { audiotrace, musictrace } from "@/utils/frontend/audio";
import { clearPreloadedFiles, loadFiles, loadableLink, loadingInfoType } from "@/utils/frontend/idb";
import { load, reset, save } from "@/utils/frontend/localStorage";
import { frontend_info } from "@/utils/frontend/utilsFrontend";
import { DEBUG } from "@/utils/settings";
import { MouseEventHandler, PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

type GlobalContextProps = {
    isPreload:boolean, isFirstRendering:boolean,isFirstLoading:boolean,
    localStorageInfo:frontend_info|null, updateLocalStorageInfo:(info:frontend_info)=>void,resetLocalStorageInfo:()=>void
    loadingInfo:loadingInfoType,
    getMusicLink:(name:musictrace)=>string, getAudioLink:(name:audiotrace)=>string
    togglePreload:MouseEventHandler,playButton:MouseEventHandler,
}

const GlobalContext = createContext<GlobalContextProps|null>(null);
/**
 * GLOBAL CONTEXT: loading all files from the localstorage/indexedDB
 */
export const GlobalProvider = (props: PropsWithChildren) => {
    const [isFirstRendering, setIsFirstRendering] = useState(true)//only for prevent the first rendering useEffect!
    //preloading content
    const [isPreload, setIsPreload] = useState<boolean>(false)//if we can use indexeddb or not
    const [linkLoader, setLinkLoader] = useState<loadableLink[]>([])//data drom indexedDB - for loading the urls of musics, images etc
    const [localStorageInfo, setLocalStorageInfo] = useState<frontend_info|null>(null)//data from localstorage
    const [loadingInfo, setLoadingInfo] = useState<loadingInfoType>({percentage:0,name:'starting'});//info for the loading bar
    const [isFirstLoading, setIsFirstLoading] = useState(true); //first load before starting app

    const updateLocalStorageInfo = (info:frontend_info)=>{
        save(info)//localstorageinfo is COSTANT, used only for loading the starting info!
    }

    const resetLocalStorageInfo = ()=>{
        reset();
        setLocalStorageInfo(load())
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
    const togglePreload= ()=>{
        setIsPreload(!isPreload);
    }

    const playButton = ()=>{
        setIsFirstLoading(false);
    }

    useEffect(() => {
        if(DEBUG)console.log(linkLoader)
      }, [linkLoader])
    //preloading
    
    useEffect(() => {//first rendering, load info from local storage
        setIsFirstRendering(false)
        const info:frontend_info = load()//get localstorage content
        setLocalStorageInfo(info);
        if(!info.settings.preload){
            setLoadingInfo({percentage:100,name:'complete'})//and the fetch?
        }
    }, [])

    useEffect(() => {//then set isPreload (in a useEffect for setting Change)
        setIsPreload(localStorageInfo && localStorageInfo.settings ? localStorageInfo.settings.preload : false)
    }, [localStorageInfo])

    useEffect(() => {//When isPreload is loaded, load local files with indexeddb
        if(!isFirstRendering){
            if(isPreload){
                setIsFirstLoading(true)
                loadFiles(loadFileLink,changeLoadingInfo)
            }else{
                clearPreloadedFiles()
                console.log('clear preloading')
            }
        }
    }, [isPreload])
    
    
    return(
        <GlobalContext.Provider value={{resetLocalStorageInfo, updateLocalStorageInfo, loadingInfo,playButton,isFirstLoading,togglePreload, localStorageInfo, isPreload, getAudioLink, getMusicLink, isFirstRendering}}>
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