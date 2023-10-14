import { MouseEventHandler, PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { API_string, creatureMenuList, newMenuList, precalcFeed, precalcPet } from "@/utils/frontend/utilsFrontend";
import { Creature, Gender, savedChoco } from "@/utils/interfaces";
import { VisualCreatureClass } from "@/utils/frontend/VisualCreatureClass";
import { shiftMenu } from "@/utils/frontend/menu";
import { checkCreatureId, validateNewCreature, isUpdateTime } from "@/utils/frontend/fetchValidation";
import { useGlobalContext } from "./globalcontext";
import { useAudioContext } from "./audiocontext";
import { DEBUG } from "@/utils/settings";
import { useScreenContext } from "./screencontext";

type AppPropsProvided = { 
    isFetching:boolean, creatureInfo:Creature, creatureId:string, creatureList:savedChoco[], selectedMenu:{name:string, list:number[]},
    feedCommand:MouseEventHandler, petCommand:MouseEventHandler,//actions
    removeActualCreature:MouseEventHandler,//settings
    loadCreature:(id:string)=>void, newCreature:(name:string,color:string,gender:Gender)=>void, changeCreature:(id:string)=>void, //load, new, change
    cycleMenu:(left:boolean)=>(()=>void),//menu
}

const AppContext = createContext<AppPropsProvided|null>(null);

const startMenu = {name:'creature', list: [creatureMenuList.length-1,0,1]};
const startMenuNew = {name:'new',list:[newMenuList.length-1,0,1]}
let startUpdateTimeout: NodeJS.Timeout |null= null;

export const AppProvider = (props: PropsWithChildren) => {
    const {startImportantAnimation, stopImportantAnimation, updateVisuals, isPlayingAnimation, removeClicks} = useScreenContext()
    const {isPreload, isFirstRendering, localStorageInfo, updateLocalStorageInfo} = useGlobalContext()
    const {musicSettings, audioSettings, setMusic, setAudio} = useAudioContext()

    useEffect(() => {//save settings updates
        if(!isFirstRendering)updateLocalInfo() 
    }, [isPreload, musicSettings.isPlaying, audioSettings.isPlaying])
    //loading tools
    const [isFetching, setIsFetching] = useState(false); //fetching 

    //info for fetching - loading
    const [creatureList, setCreatureList] = useState<savedChoco[]>([]);//list of creatures, saved in local storage
    const [creatureId, setCreatureId] = useState<string>('');//actual creature loaded

    const changeCreature=(id:string)=>{
        if(id!==creatureId){
            setCreatureId(id);
            stopImportantAnimation()
        }
    }
    const addCreatureToList = (c:savedChoco)=>{//add new creature to list, and set new actual creature id
        setCreatureList([...creatureList,c])
        setCreatureId(c.id)
    }
    const updateLocalInfo = ()=>{
        updateLocalStorageInfo({list:creatureList, last_choco:creatureId,settings:{audio:audioSettings.isPlaying,music:musicSettings.isPlaying, preload:isPreload}})
    }
    const updateLocalInfoCreatures = (list:savedChoco[], id:string)=>{
        updateLocalStorageInfo({list:list, last_choco:id,settings:{audio:audioSettings.isPlaying,music:musicSettings.isPlaying, preload:isPreload}})

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
                updateLocalInfoCreatures(newList, newId)
                return;
            }
        }
    }

    //TIMEOUT LOGIC - used only for the fetches
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
    const feedCommand = async () => {
        if (isPlayingAnimation) return;//make animation not interruptable!
        stopTimeout()//stop autoupdate timeout
        startImportantAnimation()
        precalcFeed(creatureInfo) ? updateVisuals('eating') : updateVisuals('idle-feed')//precalc if you can feed or not for fast update

        await apiCore('feed', false);
    }
    const petCommand = async () => {
        if (isPlayingAnimation) return;//make animation not interruptable!
        stopTimeout()
        startImportantAnimation()
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
            if(resetClicks)removeClicks()
            return[false, null];
        }
        if (!data.creature && !data.savedCreature) { 
            console.log("ERROR! API DATA NOT RECEIVED");
            //for loading screen
            if(resetClicks)removeClicks()
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
    

    useEffect(() => {
        if(localStorageInfo!==null){//happen only at the start, just one time!
            setCreatureId(localStorageInfo.last_choco)//set last saved
            setCreatureList(localStorageInfo.list)
        }
        stopTimeout()
    }, [localStorageInfo])


    useEffect(() => {//first update+menu change
        if(creatureId!== '' &&creatureId!== 'new'){//first update and set a creature throgh id
            updateVisuals('loading');
            stopTimeout();
            updateCommand(true, ()=>{
                setSelectedMenu(startMenu);
                updateLocalInfo();
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

    useEffect(() => {//if creature is saved
        if(!isFirstRendering)setIsUpdatedCreatureInfo(true);
    }, [creatureInfo])

    useEffect(() => {//if last update is saved
        if(!isFirstRendering)setIsUpdatedlastUpdate(true);
    }, [lastUpdate])

    useEffect(() => {//after the fetch, when all the info are saved
        if(isUpdatedCreatureInfo && isUpdatedlastUpdate){
            newTimeout(async()=>{await updateCommand();stopImportantAnimation();},5000);
            setIsUpdatedCreatureInfo(false); setIsUpdatedlastUpdate(false);
            //set music based on the new state
            if(creatureInfo.state==='walking')setMusic('theme')
            if(creatureInfo.state==='sleeping')setMusic('sleep')
        }
    }, [isUpdatedCreatureInfo,isUpdatedlastUpdate])

    return (
      <AppContext.Provider value={{removeActualCreature, creatureInfo, isFetching, creatureList, creatureId, selectedMenu ,feedCommand,petCommand, loadCreature, newCreature, cycleMenu, changeCreature}}>
        {props.children}
      </AppContext.Provider>
    );
  };

const useAppContext = () : AppPropsProvided => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Please use AppProvider in parent component");
  }
  return context;
};

export {useAppContext};