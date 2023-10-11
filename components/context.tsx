import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { load, reset, save } from '@/utils/frontend/localStorage'
import { API_string, chocoMenuList, frontend_info, getRange, newMenuList, precalcFeed, precalcPet, spritesList } from "@/utils/frontend/utilsFrontend";
import { Creature, Gender, VisualState, savedChoco } from "@/utils/interfaces";
import { VisualCreatureClass } from "@/utils/frontend/VisualCreatureClass";
import { TICK_VALUE } from "@/utils/settings";
import { shiftMenu } from "@/utils/frontend/menu";
type GlobalPropsProvided = any

// 1. create a context with ThemeState and initialize it to null
const GlobalContext = createContext<GlobalPropsProvided>(null);

let startElement: spritesList = 'stand';
let startMenu = [chocoMenuList.length-1,0,1];
let startUpdateTimeout: NodeJS.Timeout |null= null;

export const GlobalProvider = (props: PropsWithChildren) => {
    //loading tools
    const [isFirstLoading, setIsFirstLoading] = useState(true); //first load 
    const [isFetching, setIsFetching] = useState(false); //fetching 
    const [isFirstUpdate, setIsFirstUpdate] = useState(true)//only for prevent the first rendering useEffect!

    //sprites and infotext
    const [sprite, setSprite] = useState(startElement);//actual sprite playing
    const [isPlayingAnimation, setIsPlayingAnimation] = useState(false);//check if an important animation is playing
    const [infoText, setInfoText] = useState('loading...');//info text of the actual action

    //info for fetching - loading
    const [creatureList, setCreatureList] = useState<savedChoco[]>([]);//list of creatures, saved in local storage
    const [creatureId, setCreatureId] = useState<string>('');//actual creature loaded

    const addCreatureToList = (c:savedChoco)=>{//add new creature to list, and set new actual creature id
        setCreatureList([...creatureList,c])
        setCreatureId(c.id)
    }

    const saveCreatureList = ()=>{
        save({list:creatureList, last_choco:creatureId});
    }
    const resetCreatureList = ()=>{
        reset();
        const info:frontend_info = load()
        setCreatureId(info.last_choco)//set last saved
        setCreatureList(info.list)
        
    }
    const changeCreature=(id:string)=>{
        if(id!==creatureId)setCreatureId(id)
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
    const clickEgg = (e:MouseEvent)=>{
        if(sprite==='hatching'){
            return stopTimeout();
        }
        setClicks(clicks+1)
        //console.log(clicks, sprite)
        if(sprite==='egg'){
            //console.log('settting eggshake')
            setSprite('eggshake');
        }
    }
    //clicks on main screen

    //check if is time to update the creature from API
    const [lastUpdate, setLastUpdate] = useState(new Date(0));
    const [isUpdatedlastUpdate, setIsUpdatedlastUpdate] = useState(false);//wait for the end for saving (useEffect)

    const isUpdateTime = ():boolean => {//check if is time to update, and if true set new time
        //const timeLeft = (new Date()).getTime() - (lastUpdate.getTime()+TICK_VALUE*60000)
        const value = (lastUpdate.getTime() + TICK_VALUE * 60000) < (new Date()).getTime()
        //console.log(timeLeft/1000, value)
        return value
    }
    //check if is time to update the creature from API


    
    
    const [creatureInfo, setCreatureInfo] = useState(VisualCreatureClass.generatePlaceholder());//change to a special info class/interface
    const [isUpdatedCreatureInfo, setIsUpdatedCreatureInfo] = useState(false);//wait for the end of saving (useEffect)
    
    
    //fetching commands
    const loadCreature = async (id:string) =>{
        console.log("Check id")
        //check if this id is present in the list:
        for(let i=0; i<creatureList.length;++i){
            if(id===creatureList[i].id){
                console.log('id is already in list')
                return;
            }
        }
        setIsFetching(true);
        const res = await fetch(`/api/check?id=${id}`)
        const data = await res.json()
        if (!data) {
            console.log("ERROR! DATA NOT RECEIVED");
            setIsFetching(false);
            return;
        }
        if(!data.found) {
            console.log("id not found");
            setIsFetching(false);
            return;
        }
        if (!data.savedCreature) {
            console.log("ERROR! CREATURE INFO NOT RECEIVED");
            setIsFetching(false);
            return; }
        const c: savedChoco = data.savedCreature;
        addCreatureToList(c);
        setIsFetching(false);
    }

    const newCreature = async(name:string, color:string, gender:Gender)=>{
        if(name.length<2 || name.length>20)return;//validate lenght
        //validate color!
        console.log("Creating a new Creature");
        if(name==='test'){
            console.log('setting hatching')
            setSprite("hatching")
            stopTimeout()
            return;
        }
        const fetchstring =`/api/new?name=${name}&color=${color.split('#')[1]}&gender=${gender}`;
        //console.log(fetchstring)
        const res = await fetch(fetchstring)
        const data = await res.json()
        if (!data) {
            console.log("ERROR! DATA NOT RECEIVED");
            setClicks(clicks-10)
            return;
        }
        if (!data.savedCreature) {
            console.log("ERROR! CREATURE INFO NOT RECEIVED");
            setClicks(clicks-10)
            return; }
        const c: savedChoco = data.savedCreature;
        let cr = creatureInfo;
        cr.color= c.color;
        setCreatureInfo(cr);
        //console.log('settting hatching')
        setSprite("hatching")
        setTimeout(()=>{addCreatureToList(c)},8000)
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
    const updateCommand = async (force?:boolean) => {
        if (creatureId==='' || creatureId==='new')return;
        if (!isUpdateTime() && !force) {//update only visual, not API
            updateVisuals(creatureInfo.state)
            newTimeout(updateCommand,5000);
            return;
        };

        await apiCore('update', true);
    }

    const apiCore = async (api: API_string, forceVisual?: boolean) => {
        const response = await apiFetch(`/api/${api}?id=${creatureId}`);
        if(!response[0])return;
        const creature: Creature = response[1].creature;
        setCreatureInfo(creature)
        if(forceVisual) updateVisuals(creature.state)
    }

    const apiFetch = async (apiString:string, loading?:boolean ,clicks?:boolean)=>{
        console.log("Update API")
        if(loading)setIsFetching(true);
        const res = await fetch(apiString)
        const data = await res.json()
        if (!data) {
            console.log("ERROR! FETCH DATA NOT RECEIVED");
            if(isFirstLoading)setIsFirstLoading(false)//for loading screen
            return[false, null];
        }
        if (!data.creature) { 
            console.log("ERROR! API DATA NOT RECEIVED");
            if(isFirstLoading)setIsFirstLoading(false)//for loading screen
            return[false,null]; 
        }
        if(loading)setIsFetching(false);
        if(isFirstLoading)setIsFirstLoading(false)//first fetching for loading screen
        setLastUpdate(new Date());
        return [true,data]
    }
    

    const updateVisuals = (v: VisualState) => {
        switch (v) {
            case 'walking':
                let r = Math.floor(Math.random() * 4)
                const walking_sprites: spritesList[] = ['walk-bottom', 'walk-right', 'walk-left', 'walk-top']
                setSprite(walking_sprites[r])//randomize walking better
                setInfoText('walking...')
                break;
            case 'sleeping':
                setSprite('sleep')
                setInfoText('sleeping...')
                break;
            case 'idle':
                setSprite('stand')
                break;
            case 'idle-feed':
                setSprite('stand')
                setInfoText('not hungry')
                console.log('You have to wait more before eating again')
                break;
            case 'idle-pet':
                setSprite('stand')
                setInfoText('try pet later')
                console.log('You have to wait more before petting again')
                break;
            case 'eating':
                setSprite('eat')
                setInfoText('eating!')
                break;
            case 'happy':
                setSprite('happy')
                setInfoText('happy!')
                break;
            default:
                break;
        }
    }

     //menu
    const [selectedMenu, setSelectedMenu] = useState(startMenu) //actual selected menu
    
    const cycleMenu = (left:boolean) => (e?: MouseEvent): void => {//cycle left/right throw menu elements
        const length_menu = (creatureId === 'new' ? newMenuList.length : chocoMenuList.length);
        let newMenu=shiftMenu(selectedMenu,left);
        left ?  
            newMenu[0]<0 ? setSelectedMenu([length_menu-1, newMenu[1], newMenu[2]]): setSelectedMenu(newMenu)
        :
            newMenu[2]>length_menu-1 ? setSelectedMenu([newMenu[0], newMenu[1], 0]): setSelectedMenu(newMenu)
    }
    
    useEffect(() => {//first update
        const info:frontend_info = load()
        setIsFirstUpdate(false)
        setCreatureId(info.last_choco)//set last saved
        setCreatureList(info.list)
        stopTimeout()
    }, [])

    useEffect(() => {//first update+menu change
        if(creatureId!== '' &&creatureId!== 'new'){//first update and set a creature
            setSelectedMenu(startMenu);
            //setSelectedMenu([chocoMenuList.length-3,chocoMenuList.length-2,chocoMenuList.length-1]);
            setSprite('none');
            stopTimeout();
            updateCommand(true);
            saveCreatureList();
            return;
        }
        if(creatureId==='new'){
            //console.log('new creature')
            setSelectedMenu([newMenuList.length-1,0,1]);
            newTimeout(()=>setSprite('egg'),50);
            
            return;
        }

    }, [creatureId])

    useEffect(() => {//first update+menu change
        if(creatureList.length>0)saveCreatureList();
        //console.log(creatureList)
    }, [creatureList])


    useEffect(() => {
        //console.log(sprite)
        if(sprite==='egg'){
            newTimeout(()=>{setSprite('eggshake');},getRange(3000,10000));
            setTimeout(()=>{
                if(creatureId==='new'){
                    if(isFirstLoading)setIsFirstLoading(false)
                }
            },100);
            return;
        }
        if(sprite==='eggshake'){
            newTimeout(()=>{setSprite('egg');},getRange(200,600));
        }
        
    }, [sprite])

    useEffect(() => {//if creature is saved
        if(!isFirstUpdate)setIsUpdatedCreatureInfo(true);
    }, [creatureInfo])

    useEffect(() => {//if last update is saved
        if(!isFirstUpdate)setIsUpdatedlastUpdate(true);
    }, [lastUpdate])

    useEffect(() => {//than we can do a new timeout
        if(isUpdatedCreatureInfo && isUpdatedlastUpdate){
            newTimeout(async()=>{await updateCommand();setIsPlayingAnimation(false);},5000);
            setIsUpdatedCreatureInfo(false); setIsUpdatedlastUpdate(false);
        }
    }, [isUpdatedCreatureInfo,isUpdatedlastUpdate])

    




    return (
      <GlobalContext.Provider value={{isFirstLoading, sprite, creatureInfo, clickEgg, isFetching, isPlayingAnimation, clicks, creatureList, creatureId, selectedMenu, infoText ,feedCommand,petCommand, loadCreature, newCreature, resetCreatureList, cycleMenu, changeCreature}}>
        {props.children}
      </GlobalContext.Provider>
    );
  };

const useGlobalContext = () : GlobalPropsProvided => {
  // 2. use the useContext hook
  const context = useContext(GlobalContext);

  // 3. Make sure it's not null!
  if (!context) {
    throw new Error("Please use GlobalProvider in parent component");
  }
  return context;
};

export default useGlobalContext;