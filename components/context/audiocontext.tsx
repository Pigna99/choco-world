import { audiotrace, getMusicPath, musictrace } from "@/utils/frontend/audio";
import { HowlOptions, Howl } from "howler";
import { MouseEventHandler, PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { useGlobalContext } from "./globalcontext";


type AudioContextProps = {
    musicTrace:musictrace,setMusicTrace:(m:musictrace)=>void,
    audioTrace:audiotrace,setAudioTrace:(a:audiotrace)=>void,
     
}

const AudioContext = createContext<AudioContextProps|null>(null);


export const AudioProvider = (props: PropsWithChildren) => {
    const {getMusicLink, getAudioLink, localInfo, isFirstLoading} = useGlobalContext()

    //audio
    
    const [music, setMusic] = useState<Howl|null>(null)//music player
    const [musicTrace, setMusicTrace] = useState<musictrace>('none')
    const [audio, setAudio] = useState<Howl|null>(null)//audio player
    const [audioTrace, setAudioTrace] = useState<audiotrace>('none')

    const isMusicOn= ()=>{
        return localInfo.settings.music
    }
    const isAudioOn= ()=>{
        return localInfo.settings.audio
    }

    const changeMusic=(s:musictrace)=>{
        let path = localInfo.settings.preload ? getMusicLink(s): getMusicPath(s)//check if is preloaded or not
        setMusic(new Howl(setHowlSettings(path)))
    }
    const setHowlSettings=(url:string):HowlOptions=>{
        return {
            src:[url],
            loop:true,
            preload:true,
            format:'mp3'
        }
    }
    
    useEffect(() => {
        if(musicTrace==='none')return
        if(music===null)return;
        if(isMusicOn()){
            music.play()
        }else{
            music.pause()
        }
        
    }, [localInfo.settings.music])

    useEffect(() => {
      if(music===null)return;
      if(!isMusicOn()){
        changeMusic(musicTrace)
      }else{//fade, than change
        let fading_time=700
        music.fade(1,0,fading_time)
        setTimeout(()=>{
            music.stop()
            changeMusic(musicTrace)
        },fading_time)
      }
    }, [musicTrace])

    useEffect(() => {
        if(isMusicOn())music?.play()
    }, [music])

    useEffect(() => {//activate music after exiting loading screen
        if(!isFirstLoading)changeMusic(musicTrace)
        if(isFirstLoading)music?.stop();
    }, [isFirstLoading])

    return(
        <AudioContext.Provider value={{musicTrace, audioTrace,setMusicTrace,setAudioTrace}}>
            {props.children}
        </AudioContext.Provider>
    )
}

const useAudioContext = () : AudioContextProps => {
    const context = useContext(AudioContext);
    if (!context) {
      throw new Error("Please use AudioProvider in parent component");
    }
    return context;
  };
  
  export {useAudioContext};