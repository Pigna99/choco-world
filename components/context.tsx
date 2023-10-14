import { MouseEventHandler, PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { load, reset, save } from '@/utils/frontend/localStorage'
import { API_string, creatureMenuList, frontend_info, newMenuList, precalcFeed, precalcPet, spritesSettings, updateVisualsLogic } from "@/utils/frontend/utilsFrontend";
import { Creature, Gender, VisualState, savedChoco } from "@/utils/interfaces";
import { VisualCreatureClass } from "@/utils/frontend/VisualCreatureClass";
import { shiftMenu } from "@/utils/frontend/menu";
import { checkCreatureId, validateNewCreature, isUpdateTime } from "@/utils/frontend/fetchValidation";
import { audiotrace, getMusicPath, musictrace } from "@/utils/frontend/audio";
import {Howl, HowlOptions, Howler} from 'howler'
import { clearPreloadedFiles, loadFiles, loadableLink, loadingInfoType } from "@/utils/frontend/idb";
const DEBUG = false;

type GlobalPropsProvided = { 
    isFirstLoading:boolean,  isFetching:boolean, isPlayingAnimation:boolean, sprite:spritesSettings, infoText:string, creatureInfo:Creature, creatureId:string, creatureList:savedChoco[], selectedMenu:{name:string, list:number[]},  clicks:number,
    feedCommand:MouseEventHandler, petCommand:MouseEventHandler,//actions
    resetCreatureList:MouseEventHandler,removeActualCreature:MouseEventHandler,//settings
    loadCreature:(id:string)=>void, newCreature:(name:string,color:string,gender:Gender)=>void, changeCreature:(id:string)=>void, //load, new, change
    cycleMenu:(left:boolean)=>(()=>void),//menu
    clickScreen:MouseEventHandler,//screen
    audioSettings:{isPlaying:boolean, audio:audiotrace}, musicSettings:{isPlaying:boolean, music:musictrace},toggleMusic:()=>void, toggleAudio:()=>void, setMusic: (m:musictrace)=>void, setAudio: (a:audiotrace)=>void,//audio
    loadingInfo:loadingInfoType,playButton:MouseEventHandler,isPreload:boolean,togglePreload:()=>void
}

const GlobalContext = createContext<GlobalPropsProvided|null|any>(null);

const startSprite: spritesSettings = {name:'none',loop:true}
const startMenu = {name:'creature', list: [creatureMenuList.length-1,0,1]};
const startMenuNew = {name:'new',list:[newMenuList.length-1,0,1]}
let startUpdateTimeout: NodeJS.Timeout |null= null;


export const GlobalProvider = (props: PropsWithChildren) => {
    //preloading content
    const [isPreload, setIsPreload] = useState<boolean>(false)
    const togglePreload= ()=>{
        setIsPreload(!isPreload);
    }
    const [linkLoader, setLinkLoader] = useState<loadableLink[]>([])//for loading the urls of musics, images etc
    const [loadingInfo, setLoadingInfo] = useState<loadingInfoType>({percentage:0,name:'starting'});
    const [isFirstLoading, setIsFirstLoading] = useState(true); //first load 
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

    const playButton = ()=>{
        setIsFirstLoading(false);
    }

    useEffect(() => {
        if(DEBUG)console.log(linkLoader)
      }, [linkLoader])
    //preloading
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
        console.log(path)
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
        if(music===null){//first setup howl
            changeMusic('theme')
            return;
        }

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
    
    useEffect(() => {//change Preload Settings
        if(!isFirstUpdate){
            if(isPreload){
                setIsFirstLoading(true)
                loadFiles(loadFileLink,changeLoadingInfo)
            }else{
                clearPreloadedFiles()
            }
        }
    }, [isPreload])

    useEffect(() => {//save settings updates
        if(!isFirstUpdate)saveCreatureList()    
    }, [isPreload, musicSettings.isPlaying, audioSettings.isPlaying])
    
    
    //loading tools
    const [isFetching, setIsFetching] = useState(false); //fetching 
    const [isFirstUpdate, setIsFirstUpdate] = useState(true)//only for prevent the first rendering useEffect!

    //sprites and infotext
    const [sprite, setSprite] = useState<spritesSettings>(startSprite);//playing sprite with settings
    const [isPlayingAnimation, setIsPlayingAnimation] = useState(false);//check if an important animation is playing
    const [infoText, setInfoText] = useState('loading...');//info text of the actual action

    //info for fetching - loading
    const [creatureList, setCreatureList] = useState<savedChoco[]>([]);//list of creatures, saved in local storage
    const [creatureId, setCreatureId] = useState<string>('');//actual creature loaded

    const changeCreature=(id:string)=>{
        if(id!==creatureId){
            setCreatureId(id);
            setIsPlayingAnimation(false)
        }
    }
    const addCreatureToList = (c:savedChoco)=>{//add new creature to list, and set new actual creature id
        setCreatureList([...creatureList,c])
        setCreatureId(c.id)
    }
    const saveCreatureList = ()=>{
        save({list:creatureList, last_choco:creatureId,settings:{audio:audioSettings.isPlaying,music:musicSettings.isPlaying, preload:isPreload}});
    }
    const updateCreatureList = (list:savedChoco[], id:string)=>{
        save({list:list, last_choco:id,settings:{audio:audioSettings.isPlaying,music:musicSettings.isPlaying, preload:isPreload}});
    }
    const resetCreatureList = ()=>{
        reset();
        const info:frontend_info = load()
        setCreatureId(info.last_choco)//set last saved
        setCreatureList(info.list)
    }
    const removeActualCreature = ()=>{
        
        if(creatureList.length===0)return;
        for(let i=0; i<creatureList.length; ++i){
            if(creatureList[i].id===creatureId){
                let newList = creatureList;
                newList.splice(i,1);
                let newId = newList.length!==0 ? newList[0].id : 'new'
                setCreatureList(newList)
                setCreatureId(newId)
                updateCreatureList(newList,newId)
                return;
            }
        }
    }

    //TIMEOUT LOGIC
    const [updateTimeout, setUpdateTimeout] = useState(startUpdateTimeout);
    const stopTimeout=()=>{
        //console.log(updateTimeout+ ' stopped')
        if(updateTimeout)clearTimeout(updateTimeout);
    }
    const newTimeout=(f:Function, time:number)=>{
        stopTimeout();
        setUpdateTimeout(setTimeout(()=>{f()},time))
    }
    //TIMEOUT LOGIC 

    //clicks on main screen
    const [clicks, setClicks] = useState(0);//save the number of clicks on the screen sprite
    const clickScreen = (e:MouseEvent)=>{
        //console.log(clicks)
        if(sprite.name!=='hatching'){
            setClicks(clicks+1)
        }
        if(sprite.name==='egg'){
            updateVisuals('eggshake');
        }
    }
    //clicks on main screen

    //check if is time to update the creature from API
    const [lastUpdate, setLastUpdate] = useState(new Date(0));
    const [isUpdatedlastUpdate, setIsUpdatedlastUpdate] = useState(false);//wait for the end for saving (useEffect)

    const [creatureInfo, setCreatureInfo] = useState(VisualCreatureClass.generatePlaceholder());//change to a special info class/interface
    const [isUpdatedCreatureInfo, setIsUpdatedCreatureInfo] = useState(false);//wait for the end of saving (useEffect)
    
    //fetching commands
    const loadCreature = async (id:string) =>{
        if(!checkCreatureId(id, creatureList))return;
        const response = await apiFetch(`/api/check?id=${id}`, true);
        if(!response[0])return;
        const c: savedChoco = response[1].savedCreature;
        addCreatureToList(c);
    }
    const newCreature = async(name:string, color:string, gender:Gender)=>{
        if(!validateNewCreature(name,color))return;
        stopTimeout()
        console.log("Creating a new Creature");
        if(name==='test'){
            console.log('setting hatching')
            updateVisuals("hatching")
            return;
        }
        const response = await apiFetch(`/api/new?name=${name}&color=${color.split('#')[1]}&gender=${gender}`, false, true);
        if(!response[0])return;
        const c: savedChoco = response[1].savedCreature;
        setCreatureInfo({...creatureInfo, color: c.color});
        //console.log('setting hatching')
        updateVisuals("hatching")//change to setAnimation
        setTimeout(()=>{addCreatureToList(c)},8000)//not always working (or working double!)
    }
    const feedCommand = async (e: MouseEvent) => {
        if (isPlayingAnimation) return;//make animation not interruptable!
        stopTimeout()//stop autoupdate timeout
        setIsPlayingAnimation(true)
        precalcFeed(creatureInfo) ? updateVisuals('eating') : updateVisuals('idle-feed')//precalc if you can feed or not for fast update

        await apiCore('feed', false);
    }
    const petCommand = async (e: MouseEvent) => {
        if (isPlayingAnimation) return;//make animation not interruptable!
        stopTimeout()
        setIsPlayingAnimation(true)
        precalcPet(creatureInfo) ? updateVisuals('happy') : updateVisuals('idle-pet')//precalc if you can pet or not for fast update

        await apiCore('pet', false);
    }
    const updateCommand = async (force?:boolean, then?:()=>void) => {
        if (creatureId==='' || creatureId==='new')return;
        if (!isUpdateTime(lastUpdate) && !force) {//update only visual, not API
            updateVisuals(creatureInfo.state)
            newTimeout(updateCommand,5000);
            return;
        };

        await apiCore('update', true);
        if(then)then()
    }
    const apiCore = async (api: API_string, forceVisual?: boolean) => {
        const response = await apiFetch(`/api/${api}?id=${creatureId}`, true);
        if(!response[0])return;
        const creature: Creature = response[1].creature;
        setCreatureInfo(creature)
        if(forceVisual) updateVisuals(creature.state)//update the visual state after fetching
    }
    const apiFetch = async (apiString:string, loading:boolean ,resetClicks?:boolean)=>{
        if(DEBUG)console.log("Update API - "+apiString)
        if(loading)setIsFetching(true);
        const res = await fetch(apiString, {method: 'POST'})
        const data = await res.json()
        if (!data) {
            console.log("ERROR! FETCH DATA NOT RECEIVED");
            //for loading screen
            if(resetClicks)setClicks(clicks-10)
            return[false, null];
        }
        if (!data.creature && !data.savedCreature) { 
            console.log("ERROR! API DATA NOT RECEIVED");
            //for loading screen
            if(resetClicks)setClicks(clicks-10)
            if(data.error === 'noiddb'){
                removeActualCreature();
            }
            return[false,null]; 
        }
        if(loading)setIsFetching(false);
        //first fetching for loading screen
        setLastUpdate(new Date());
        return [true,data]
    }
    
    //update sprite and infoText
    const updateVisuals = (v: VisualState) => {
        updateVisualsLogic(v, setSprite, setInfoText);
    }
    
     //menu
    const [selectedMenu, setSelectedMenu] = useState(startMenu) //actual selected menu
    
    const cycleMenu = (left:boolean) => (e?: MouseEvent): void => {//cycle left/right throw menu elements
        const length_menu = (creatureId === 'new' ? newMenuList.length : creatureMenuList.length);
        let newMenu=shiftMenu(selectedMenu.list,left);
        left ?  
            newMenu[0]<0 ? (newMenu=[length_menu-1, newMenu[1], newMenu[2]]) : null
        :
            newMenu[2]>length_menu-1 ? newMenu=[newMenu[0], newMenu[1], 0] : null;
        setSelectedMenu({...selectedMenu, list:newMenu})
    }
    
    useEffect(() => {//first update
        const info:frontend_info = load()
        setIsFirstUpdate(false)
        setCreatureId(info.last_choco)//set last saved
        setCreatureList(info.list)
        setAudioSettings({...audioSettings, isPlaying:info.settings?info.settings.audio:false})
        setMusicSettings({...musicSettings, isPlaying:info.settings?info.settings.music:false})
        setIsPreload(info.settings?info.settings.preload:false)
        stopTimeout()
        if(info.settings.preload){
            loadFiles(loadFileLink,changeLoadingInfo)
        }else{
            setLoadingInfo({percentage:100,name:'complete'})
        }
    }, [])

    useEffect(() => {//first update+menu change
        if(creatureId!== '' &&creatureId!== 'new'){//first update and set a creature throgh id
            updateVisuals('loading');
            stopTimeout();
            updateCommand(true, ()=>{
                setSelectedMenu(startMenu);
                saveCreatureList();
            });
            return;
        }
        if(creatureId==='new'){//new creature setting screen
            setSelectedMenu(startMenuNew);
            stopTimeout();
            updateVisuals('egg')
            setMusic('fight')
            return;
        }

    }, [creatureId])

    useEffect(() => {//save creature list in local storage
        if(creatureList.length>0)saveCreatureList();
    }, [creatureList])

    useEffect(() => {//if creature is saved
        if(!isFirstUpdate)setIsUpdatedCreatureInfo(true);
    }, [creatureInfo])

    useEffect(() => {//if last update is saved
        if(!isFirstUpdate)setIsUpdatedlastUpdate(true);
    }, [lastUpdate])

    useEffect(()=>{
        //console.log(selectedMenu)
    }, [selectedMenu])

    useEffect(() => {//than we can do a new timeout
        if(isUpdatedCreatureInfo && isUpdatedlastUpdate){
            newTimeout(async()=>{await updateCommand();setIsPlayingAnimation(false);},5000);
            setIsUpdatedCreatureInfo(false); setIsUpdatedlastUpdate(false);
            if(creatureInfo.state==='walking')setMusic('theme')
            if(creatureInfo.state==='sleeping')setMusic('sleep')
        }
        
    }, [isUpdatedCreatureInfo,isUpdatedlastUpdate])

    return (
      <GlobalContext.Provider value={{isPreload,togglePreload,playButton,loadingInfo,setAudio, setMusic, audioSettings, musicSettings, toggleMusic, toggleAudio, removeActualCreature,isFirstLoading, sprite, creatureInfo, clickScreen, isFetching, isPlayingAnimation, clicks, creatureList, creatureId, selectedMenu, infoText ,feedCommand,petCommand, loadCreature, newCreature, resetCreatureList, cycleMenu, changeCreature}}>
        {props.children}
      </GlobalContext.Provider>
    );
  };

const useGlobalContext = () : GlobalPropsProvided => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("Please use GlobalProvider in parent component");
  }
  return context;
};

export default useGlobalContext;