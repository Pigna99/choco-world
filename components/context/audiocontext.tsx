import { audiotrace, getMusicPath, musictrace } from "@/utils/frontend/audio";
import { HowlOptions, Howl } from "howler";
import { MouseEventHandler, PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { useGlobalContext } from "./globalcontext";


type AudioContextProps = {
    musicSettings:{isPlaying:boolean, music:musictrace},setMusic:(m:musictrace)=>void,toggleMusic:MouseEventHandler
    audioSettings:{isPlaying:boolean, audio:audiotrace},setAudio:(a:audiotrace)=>void,toggleAudio:MouseEventHandler
     
}

const AudioContext = createContext<AudioContextProps|null>(null);


export const AudioProvider = (props: PropsWithChildren) => {
    const {isPreload, getMusicLink, getAudioLink, localStorageInfo, isFirstLoading} = useGlobalContext()

    //audio
    const [musicSettings, setMusicSettings] = useState<{isPlaying:boolean, music:musictrace}>({isPlaying:false, music:'none'});
    const [music, resetMusic] = useState<Howl|null>(null)
    const [audioSettings, setAudioSettings] = useState<{isPlaying:boolean, audio:audiotrace}>({isPlaying:false, audio:'none'});
    const [audio, resetAudio] = useState<Howl|null>(null)

    const toggleMusic=()=>{
        setMusicSettings({...musicSettings, isPlaying: !musicSettings.isPlaying})
    }
    const toggleAudio=()=>{
        setAudioSettings({...audioSettings, isPlaying: !audioSettings.isPlaying})
    }
    const setMusic= (m:musictrace)=>{
        setMusicSettings({...musicSettings, music:m})
    }
    const setAudio= (a:audiotrace)=>{
        setAudioSettings({...audioSettings, audio:a})
    }

    const changeMusic=(s:musictrace)=>{
        let path = isPreload ? getMusicLink(s): getMusicPath(s)//check if is preloaded or not
        resetMusic(new Howl(setHowlSettings(path)))
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
        if(musicSettings.music==='none')return
        if(music===null)return;
        if(musicSettings.isPlaying){
            music.play()
        }else{
            music.pause()
        }
        
    }, [musicSettings.isPlaying])

    useEffect(() => {
      if(music===null)return;
      if(!musicSettings.isPlaying){
        changeMusic(musicSettings.music)
      }else{//fade, than change
        let fading_time=700
        music.fade(1,0,fading_time)
        setTimeout(()=>{
            music.stop()
            changeMusic(musicSettings.music)
        },fading_time)
      }
    }, [musicSettings.music])

    useEffect(() => {
        if(musicSettings.isPlaying)music?.play()
    }, [music])

    useEffect(() => {//activate music after exiting loading screen
        if(!isFirstLoading)changeMusic(musicSettings.music)
        if(isFirstLoading)music?.stop();
    }, [isFirstLoading])

    useEffect(() => {//first update, load settings
        if(localStorageInfo!==null){
            setAudioSettings({...audioSettings, isPlaying:localStorageInfo.settings?localStorageInfo.settings.audio:false})
            setMusicSettings({...musicSettings, isPlaying:localStorageInfo.settings?localStorageInfo.settings.music:false})
        }
    }, [localStorageInfo])

    return(
        <AudioContext.Provider value={{toggleMusic,toggleAudio,musicSettings, audioSettings,setMusic,setAudio}}>
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