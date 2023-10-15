import { audiotrace, getMusicPath, musictrace } from "@/utils/frontend/audio";
import { HowlOptions, Howl } from "howler";
import { MouseEventHandler, PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { useGlobalContext } from "./globalcontext";


type AudioContextProps = {
    musicTrace:musictrace,setMusicTrace:(m:musictrace)=>void,
    setAudioTrace:(a:audiotrace)=>void,
}

const AudioContext = createContext<AudioContextProps|null>(null);


export const AudioProvider = (props: PropsWithChildren) => {
    const {getMusicLink, getAudioLink, localInfo, isFirstLoading, isBackground} = useGlobalContext()

    //audio
    
    const [music, setMusic] = useState<Howl|null>(null)//music player
    const [musicTrace, setMusicTrace] = useState<musictrace>('none')
    const [audio, setAudio] = useState<Howl|null>(null)//audio player
    //const [audioTrace, setAudioTrace] = useState<audiotrace>('none')

    const setHowlSettings=(url:string, loop:boolean):HowlOptions=>{
        return {
            src:[url],
            loop:loop,
            preload:true,
            format:'mp3'
        }
    }

    //MUSIC
    const isMusicOn= ()=>{
        return localInfo.settings.music
    }
    const changeMusic=(s:musictrace)=>{
        let path = localInfo.settings.preload ? getMusicLink(s): getMusicPath(s)//check if is preloaded or not
        setMusic(new Howl(setHowlSettings(path, true)))
    }
    const startMusic = ()=>{
        if(!music)return
        music.play()
    }
    const pauseMusic= ()=>{
        if(!music)return
        music.pause()
    }
    const stopMusic= ()=>{
        if(!music)return
        music.stop()
    }

    useEffect(() => {
      if(isMusicOn()&&isBackground){
        pauseMusic()
      }
      if(isMusicOn()&&!isBackground){
        startMusic()
      }
    }, [isBackground])
    
    useEffect(() => {
        if(music===null)return;
        if(musicTrace==='none')return
        if(isMusicOn()){
            startMusic()
        }else{
            console.log('pause music')
            pauseMusic()
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
            stopMusic()
            changeMusic(musicTrace)
        },fading_time)
      }
    }, [musicTrace])

    useEffect(() => {
        if(isMusicOn()&&!isBackground)startMusic()
    }, [music])

    useEffect(() => {//activate music after exiting loading screen
        if(!isFirstLoading)changeMusic(musicTrace)
        if(isFirstLoading)stopMusic()
    }, [isFirstLoading])
    //MUSIC
    //AUDIO
    const setAudioTrace = (a:audiotrace)=>{//fade music if audio is playing
        if(!localInfo.settings.audio)return;
        let ad= new Howl(setHowlSettings(getAudioLink(a), false))
        setAudio(ad)
        ad.play()
        if(music){
            if(music.playing()){
                music.fade(1,0.1,200);
                ad.on('end', ()=>{
                    music.fade(0.1,1,500);
                })
            }
        }
        
    }
    const stopAudio = ()=>{
        if(!audio)return;
        audio.stop();
    }
    //AUDIO
    return(
        <AudioContext.Provider value={{musicTrace,setMusicTrace,setAudioTrace}}>
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