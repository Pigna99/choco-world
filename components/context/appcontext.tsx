import {MouseEventHandler, PropsWithChildren, TouchEventHandler, createContext, useContext} from "react";
import { useMenuContext } from "./menucontext";
import { useFetchContext } from "./fetchcontext";
import { useScreenContext } from "./screencontext";
import { precalcFeed, precalcPet } from "@/utils/frontend/utilsFrontend";
import { Gender } from "@/utils/interfaces";
import { checkCreatureId, validateNewCreature } from "@/utils/frontend/fetchValidation";
import { useGlobalContext } from "./globalcontext";

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
        precalcFeed(creatureInfo) ? updateVisuals('eating') : updateVisuals('idle-feed')//precalc if you can feed or not for fast update
        await feedFetch()//effectivly fetch
    }

    const petACTION:MouseEventHandler = async ()=>{
        if(isPlayingAnimation) return;//make animation not interruptable!
        startImportantAnimation()
        precalcPet(creatureInfo) ? updateVisuals('happy') : updateVisuals('idle-pet')//precalc if you can pet or not for fast update
        await petFetch()//effectivly fetch
    }

    const loadACTION = (id:string)=>async ()=>{
        if (!checkCreatureId(id, localInfo.list)) return;
        const res = await loadCreatureFetch(id)
    }

    const newACTION = (name:string,color:string,gender:Gender)=>async ()=>{
        if (!validateNewCreature(name, color)) return;
        console.log("Creating a new Creature");
        if (name === 'test') {
            updateVisuals("hatching")
            return;
        }
        const response = await newCreatureFetch(name,color,gender)
        if(response)updateVisuals("hatching")//change to setAnimation
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