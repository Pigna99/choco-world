import {MouseEventHandler, PropsWithChildren, TouchEventHandler, createContext, useContext} from "react";
import { useMenuContext } from "./menucontext";
import { useFetchContext } from "./fetchcontext";
import { useScreenContext } from "./screencontext";
import { precalcFeed, precalcPet } from "@/utils/frontend/utilsFrontend";
import { Gender } from "@/utils/interfaces";
import { checkCreatureId, validateNewCreature } from "@/utils/frontend/fetchValidation";
import { useGlobalContext } from "./globalcontext";
import { useAudioContext } from "./audiocontext";

type AppContextProps = {
    playACTION:MouseEventHandler//loading screen
    rightMenuACTION:MouseEventHandler, leftMenuACTION:MouseEventHandler,
    rightSwipeACTION:TouchEventHandler,leftSwipeACTION:TouchEventHandler,
    changeCreatureACTION:(id:string)=>MouseEventHandler,
    petACTION:MouseEventHandler, feedACTION:MouseEventHandler,loadACTION:(id:string)=>MouseEventHandler, newACTION:(name:string, color:string, gender:Gender)=>MouseEventHandler,
    clickScreenACTION:MouseEventHandler
    //settings
    toggleMusicACTION:MouseEventHandler, toggleAudioACTION:MouseEventHandler, togglePreloadACTION:MouseEventHandler, removeActualCreatureACTION:MouseEventHandler,clearDataACTION:MouseEventHandler
}

const AppContext = createContext<AppContextProps | null>(null);
//this context define all the functions/interactions with the user (all functions end with ACTION)

export const AppProvider = (props: PropsWithChildren) => {
    const {cycleMenu} = useMenuContext();
    const {feedFetch, petFetch, loadCreatureFetch, newCreatureFetch, creatureInfo} = useFetchContext();
    const {startImportantAnimation, updateVisuals, isPlayingAnimation, sprite, clicks, incrementClicks, stopImportantAnimation} = useScreenContext()
    const {localInfo, changeCreature, closeLoadingScreen, toggleSetting, removeActualCreature, resetLocalInfo} = useGlobalContext()
    const {setAudioTrace,stopMusic} = useAudioContext()
    //loading screen
    const playACTION:MouseEventHandler = ()=>{
        closeLoadingScreen()
    }
    //loading screen

    //menu actions
    const rightMenuACTION:MouseEventHandler = ()=>{
        cycleMenu(false)
    }
    const leftMenuACTION:MouseEventHandler = ()=>{
        cycleMenu(true)
    }
    const rightSwipeACTION:TouchEventHandler = ()=>{
        cycleMenu(false)
    }
    const leftSwipeACTION:TouchEventHandler = ()=>{
        cycleMenu(true)
    }
    const changeCreatureACTION= (id:string)=>()=>{
        changeCreature(id)
        stopImportantAnimation()
    }
    //menu actions

    //actual game logic actions
    const feedACTION:MouseEventHandler = async ()=>{
        if(isPlayingAnimation) return;//make animation not interruptable!
        startImportantAnimation()
        let res = precalcFeed(creatureInfo)//precalc if you can feed or not for fast update
        if(res){
            updateVisuals('eating')
            setAudioTrace('jingle2')
        }else{
            updateVisuals('idle-feed')
            setAudioTrace('fail')
        }
        await feedFetch()//effectivly fetch
    }

    const petACTION:MouseEventHandler = async ()=>{
        if(isPlayingAnimation) return;//make animation not interruptable!
        startImportantAnimation()
        let res = precalcPet(creatureInfo)//precalc if you can pet or not for fast update
        if(res){
            updateVisuals('happy')
            setAudioTrace('jingle3')
        }else{
            updateVisuals('idle')
            setAudioTrace('fail')
        }
        await petFetch()//effectivly fetch
    }

    const loadACTION = (id:string)=>async ()=>{
        if (!checkCreatureId(id, localInfo.list)) return;
        const res = await loadCreatureFetch(id)
        if(res){
            setAudioTrace('jingle1');
        }
    }

    const newACTION = (name:string,color:string,gender:Gender)=>async ()=>{
        if (!validateNewCreature(name, color)) return;
        console.log("Creating a new Creature");
        if (name === 'test') {
            updateVisuals("hatching")
            setAudioTrace('hatching')
            return;
        }
        const response = await newCreatureFetch(name,color,gender)
        if(response){
            updateVisuals("hatching")
            stopMusic()
            setAudioTrace('hatching')
        }//change to setAnimation
        if(!response)console.log('ERROR! Hatching not worked')
    }

    const clickScreenACTION:MouseEventHandler = ()=>{
        //console.log(clicks)
        if (sprite.name !== 'hatching') {
            incrementClicks()
        }
        if (sprite.name === 'egg') {
            updateVisuals('eggshake');
        }
    }
    //actual game logic actions

    //settings
    const toggleMusicACTION:MouseEventHandler= ()=>{
        toggleSetting('music')
    }
    const toggleAudioACTION:MouseEventHandler= ()=>{
        toggleSetting('audio')
    }
    const togglePreloadACTION:MouseEventHandler= ()=>{
        toggleSetting('preload')
    }
    const removeActualCreatureACTION:MouseEventHandler= ()=>{
        removeActualCreature()
    }
    const clearDataACTION:MouseEventHandler= ()=>{
        resetLocalInfo()
    }

    //settings
    return (
        <AppContext.Provider value={{clearDataACTION,removeActualCreatureACTION,toggleMusicACTION,toggleAudioACTION,togglePreloadACTION,playACTION,changeCreatureACTION,clickScreenACTION,loadACTION,newACTION,rightSwipeACTION, leftSwipeACTION,rightMenuACTION,leftMenuACTION,petACTION,feedACTION}}>
            {props.children}
        </AppContext.Provider>
    )
}

const useAppContext = (): AppContextProps => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("Please use AppProvider in parent component");
    }
    return context;
};

export { useAppContext };