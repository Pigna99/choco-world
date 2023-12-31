import { spritesList, spritesSettings } from "@/utils/frontend/utilsFrontend";
import { VisualState } from "@/utils/interfaces";
import {Dispatch, MouseEventHandler, PropsWithChildren, createContext, useContext, useState } from "react";

type ScreenContextProps = {
    startImportantAnimation:()=>void, stopImportantAnimation:()=>void, 
    updateVisuals:(v:VisualState)=>void,
    isPlayingAnimation:boolean,
    removeClicks:()=>void, incrementClicks:()=>void,
    sprite:spritesSettings, clicks:number, infoText:string,
    setInfoText:(t:string)=>void
}

const ScreenContext = createContext<ScreenContextProps | null>(null);

const startSprite: spritesSettings = { name: 'none', loop: true }

export const ScreenProvider = (props: PropsWithChildren) => {
    //sprites and infotext
    const [sprite, setSprite] = useState<spritesSettings>(startSprite);//playing sprite with settings
    const [isPlayingAnimation, setIsPlayingAnimation] = useState(false);//check if an important animation is playing
    const [infoText, setInfoText] = useState('loading...');//info text of the actual action

    const startImportantAnimation=()=>{
        setIsPlayingAnimation(true);
    }
    const stopImportantAnimation=()=>{
        setIsPlayingAnimation(false);
    }
    //update sprite and infoText
    const updateVisuals = (v: VisualState) => {
        switch (v) {
            case 'walking':
                let r = Math.floor(Math.random() * 4)
                const walking_sprites: spritesList[] = ['walk-bottom', 'walk-right', 'walk-left', 'walk-top']
                setSprite({ name: walking_sprites[r], loop: true, fps: 16 })//randomize walking better
                setInfoText('is walking...')
                break;
            case 'sleeping':
                setSprite({ name: 'sleep', loop: true, fps: 8 })
                setInfoText('is sleeping...')
                break;
            case 'fighting':
                setSprite({ name: 'fighting', loop: true, fps: 12 })
                setInfoText('is fighting a monster!')
                break;
            case 'idle':
                setSprite({ name: 'stand', loop: true, fps: 4 })
                break;
            case 'idle-feed':
                setSprite({ name: 'stand', loop: true, fps: 4 })
                setInfoText('not hungry')
                console.log('is not hungry.')
                break;
            case 'idle-pet':
                setSprite({ name: 'stand', loop: true, fps: 4 })
                setInfoText('try pet later')
                console.log("doesn't want to be petted")
                break;
            case 'eating':
                setSprite({ name: 'eat', loop: true, fps: 8 })
                setInfoText('is eating!')
                break;
            case 'happy':
                setSprite({ name: 'happy', loop: true, fps: 12 })
                setInfoText('is happy!')
                break;
            case 'egg':
                setSprite({ name: 'egg', loop: false })
                break;
            case 'eggshake':
                setSprite({
                    name: 'eggshake', loop: false, numLoops: 0, onEnd: () => {
                        updateVisuals('egg')
                    }
                })
                break;
            case 'hatching':
                setSprite({ name: 'hatching', loop: false, fps: 6 })
                break;
            case 'loading':
                //setSprite({ name: 'none', loop: false }) //removed blank when switching creature
                setInfoText('loading info...')
                break;
            default:
                console.log('error, no animation')
                break;
        }
    }
    //clicks on main screen
    const [clicks, setClicks] = useState(0);//save the number of clicks on the screen sprite
    const incrementClicks = () => {
        setClicks(clicks+1)
    }
    const removeClicks=()=>{
        setClicks(clicks-10)
    }
    //clicks on main screen

    return (
        <ScreenContext.Provider value={{setInfoText, clicks, infoText, incrementClicks, sprite, removeClicks,isPlayingAnimation, updateVisuals, startImportantAnimation, stopImportantAnimation}}>
            {props.children}
        </ScreenContext.Provider>
    )
}

const useScreenContext = (): ScreenContextProps => {
    const context = useContext(ScreenContext);
    if (!context) {
        throw new Error("Please use ScreenProvider in parent component");
    }
    return context;
};

export { useScreenContext };