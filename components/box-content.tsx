import { TICK_VALUE } from '@/utils/settings'
import styles from './box-content.module.css'
import { Screen } from './Screen/screen-content'
import { useState, MouseEvent, useEffect } from 'react'
import { API_string, chocoMenuList, frontend_info, getRange, newMenuList, precalcFeed, precalcPet, spritesList } from '@/utils/frontend/utilsFrontend'
import { Creature, Gender, VisualState, savedChoco } from '@/utils/interfaces'
import { VisualCreatureClass } from '@/utils/frontend/VisualCreatureClass'
import { Menu } from './Menu/menu'
import Sprite from './Screen/Sprite/Sprite'
import loading from './Screen/Sprite/Other/loading'
import { Content } from './Content/content'
import { load, reset, save } from '@/utils/frontend/localStorage'

let startElement: spritesList = 'stand';
let startMenu = [chocoMenuList.length-1,0,1];
let startUpdateTimeout: NodeJS.Timeout |null= null;

export const Box = () => {
    //window size
    const [windowSize, setWindowSize] = useState([
        500,
        500,
    ]);

    //loading tools
    const [isFirstLoading, setIsFirstLoading] = useState(true);
    const [isFetching, setIsFetching] = useState(false);

    //menu
    const [selectedMenu, setSelectedMenu] = useState(startMenu)
    const shiftMenu = (left:boolean) =>{//really bad shift array function
        return left ?
         [selectedMenu[0]-1,selectedMenu[0],selectedMenu[1]]
        :
         [selectedMenu[1],selectedMenu[2],selectedMenu[2]+1]
    }
    const cycleMenu = (left:boolean) => (e?: MouseEvent): void => {
        let length_menu = (creatureId === 'new' ? newMenuList.length: chocoMenuList.length);
        let newMenu=shiftMenu(left);
        left ?  
            newMenu[0]<0 ? setSelectedMenu([length_menu-1, newMenu[1], newMenu[2]]): setSelectedMenu(newMenu)
        :
            newMenu[2]>length_menu-1 ? setSelectedMenu([newMenu[0], newMenu[1], 0]): setSelectedMenu(newMenu)
    }

    //sprites and infotext
    const [sprite, setSprite] = useState(startElement);
    const [isPlayingAnimation, setIsPlayingAnimation] = useState(false);
    const [infoText, setInfoText] = useState('loading...');

    //info for fetching - loading
    const [creatureList, setCreatureList] = useState<savedChoco[]>([]);
    const [creatureId, setCreatureId] = useState<string>('');

    const addCreatureToList = (c:savedChoco)=>{
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
    const loadChoco = async (id:string) =>{
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

    const newChoco = async(name:string, color:string, gender:Gender)=>{
        if(name.length<2 || name.length>20)return;//validate lenght
        //validate color!
        console.log("Creating a new Creature");
        const fetchstring =`/api/new?name=${name}&color=${color.split('#')[1]}&gender=${gender}`;
        //console.log(fetchstring)
        const res = await fetch(fetchstring)
        const data = await res.json()
        if (!data) {
            console.log("ERROR! DATA NOT RECEIVED");
            setIsFetching(false);
            setClicks(clicks-10)
            return;
        }
        if (!data.savedCreature) {
            console.log("ERROR! CREATURE INFO NOT RECEIVED");
            setIsFetching(false);
            setClicks(clicks-10)
            return; }
        const c: savedChoco = data.savedCreature;
        let cr = infoBox;
        cr.color= c.color;
        setInfoBox(cr);
        setTimeout(()=>setSprite("hatching"),50);
        newTimeout(()=>{addCreatureToList(c)},8000)
    }
    const [clicks, setClicks] = useState(0);//save the number of clicks on the screen sprite
    const clickEgg = ()=>{
        setClicks(clicks+1)
        if(sprite==='egg'){
            setSprite('eggshake');
        }
    }

    //change creature!
    const changeCreature=(id:string)=>{
        if(id!==creatureId)setCreatureId(id)
    }


    const [firstUpdate, setFirstUpdate] = useState(true)
    const [updateTimeout, setUpdateTimeout] = useState(startUpdateTimeout);
    const stopTimeout=()=>{
        //console.log(updateTimeout+ ' stopped')
        if(updateTimeout)clearTimeout(updateTimeout);
    }
    const newTimeout=(f:Function, time:number)=>{
        stopTimeout();
        setUpdateTimeout(setTimeout(()=>{f()},time))
    }
    const [isUpdatedInfoBox, setIsUpdatedInfoBox] = useState(false);
    const [infoBox, setInfoBox] = useState(VisualCreatureClass.generatePlaceholder());//change to a special info class/interface
    const [isUpdatedlastUpdate, setIsUpdatedlastUpdate] = useState(false);
    const [lastUpdate, setLastUpdate] = useState(new Date(0));

    const isUpdateTime = () => {//check if is time to update, and if true set new time
        //const timeLeft = (new Date()).getTime() - (lastUpdate.getTime()+TICK_VALUE*60000)
        const value = (lastUpdate.getTime() + TICK_VALUE * 60000) < (new Date()).getTime()
        //console.log(timeLeft/1000, value)
        return value
    }

    //fetching commands
    const feedCommand = async (e: MouseEvent) => {
        if (isPlayingAnimation) return;//make animation not interruptable!
        stopTimeout()//stop autoupdate timeout
        setIsPlayingAnimation(true)
    
        precalcFeed(infoBox) ? updateVisuals('eating') : updateVisuals('idle-feed')//precalc if you can feed or not for fast update

        await apiCore('feed', false);
    }
    const petCommand = async (e: MouseEvent) => {
        if (isPlayingAnimation) return;//make animation not interruptable!
        stopTimeout()
        setIsPlayingAnimation(true)
        
        precalcPet(infoBox) ? updateVisuals('happy') : updateVisuals('idle-pet')//precalc if you can pet or not for fast update

        await apiCore('pet', false);
    }
    const updateCommand = async (force?:boolean) => {
        if (creatureId==='' || creatureId==='new')return;
        if (!isUpdateTime() && !force) {//update only visual, not API
            updateVisuals(infoBox.state)
            newTimeout(updateCommand,5000);
            return;
        };

        await apiCore('update', true);
    }

    const apiCore = async (api: API_string, forceVisual?: boolean) => {
        console.log("Update API")
        setIsFetching(true);
        const res = await fetch(`/api/${api}?id=${creatureId}`)
        const data = await res.json()
        if (!data) {
            console.log("ERROR! DATA NOT RECEIVED");
            if(isFirstLoading)setIsFirstLoading(false)//for loading screen
            return;
        }
        if (!data.creature) { 
            console.log("ERROR! CREATURE NOT RECEIVED");
            if(isFirstLoading)setIsFirstLoading(false)//for loading screen
            return; }
        const creature: Creature = data.creature;
        setInfoBox(creature)
        
        if(forceVisual) updateVisuals(creature.state)
        setLastUpdate(new Date());
        setIsFetching(false);
        if(isFirstLoading)setIsFirstLoading(false)//for loading screen
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
    
    useEffect(() => {//first update
        const info:frontend_info = load()
        setFirstUpdate(false)
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
            setTimeout(()=>setSprite('egg'),50);
            newTimeout(eggAnimation,5000);
            
            return;
        }

    }, [creatureId])

    useEffect(() => {//first update+menu change
        if(creatureList.length>0)saveCreatureList();
        //console.log(creatureList)
    }, [creatureList])


    const eggAnimation = ()=>{
        if(sprite==='eggshake'){
            setSprite('egg');
            return;}
        else if(sprite==='egg'){
            setSprite('eggshake');
            return;
        }   
    }

    useEffect(() => {
        if(sprite==='egg'){
            newTimeout(eggAnimation,getRange(3000,10000));
            setTimeout(()=>{
                if(creatureId==='new'){
                    if(isFirstLoading)setIsFirstLoading(false)
                }
            },100);
            return;
        }
        if(sprite==='eggshake'){
            newTimeout(eggAnimation,getRange(200,600));
        }
        
    }, [sprite])

    useEffect(() => {//if creature is saved
        if(!firstUpdate)setIsUpdatedInfoBox(true);
    }, [infoBox])

    useEffect(() => {//if last update is saved
        if(!firstUpdate)setIsUpdatedlastUpdate(true);
    }, [lastUpdate])

    useEffect(() => {//than we can do a new timeout
        if(isUpdatedInfoBox && isUpdatedlastUpdate){
            newTimeout(async()=>{await updateCommand();setIsPlayingAnimation(false);},5000);
            setIsUpdatedInfoBox(false); setIsUpdatedlastUpdate(false);
        }
    }, [isUpdatedInfoBox,isUpdatedlastUpdate])

    useEffect(() => {
        const handleWindowResize = () => {//set a max width
            setWindowSize([window.innerWidth <= 500 ? window.innerWidth : 500, window.innerHeight <= 1000 ? window.innerHeight:1000] );
        };

        window.addEventListener('resize', handleWindowResize);
        setWindowSize([window.innerWidth <= 500 ? window.innerWidth : 500, window.innerHeight <= 1000 ? window.innerHeight:1000]);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);
    return (
        <div className={styles.box}>
            <LoadingScreen isLoading={isFirstLoading}/>
            <Screen sprite={sprite} width={windowSize[0]+"px"} color={infoBox.color} clickScreen={clickEgg}/>
            <LoadingSpinner visible={isFetching || isPlayingAnimation}/>
            <Content clicks={clicks} chocoArray={creatureList} selectedChocoId={creatureId} selectedMenu={selectedMenu} info={infoBox} action={infoText} isPlayingAnimation={isPlayingAnimation} commands={{
                feedCommand: feedCommand,petCommand: petCommand, loadChoco:loadChoco, newChoco:newChoco, deleteAll:resetCreatureList
            }} cycleMenu={cycleMenu} changeChoco={changeCreature}/>
            <Menu selectedMenu={selectedMenu[1]} cycleMenu={cycleMenu} creatureId={creatureId}/>
        </div>
    )
}

const LoadingSpinner = ({visible}:{visible:boolean})=>{
    return(
        <div className={styles.loading}>
            {
                visible ? <Loading/>: <div style={{height:10}}/>
            }
        </div>
    )
}

const LoadingScreen = ({ isLoading}: { isLoading:boolean}) => {
    return (
        <div className={`${styles.loadingScreen} ${isLoading? '' : styles.loaded}` }>
            <div>loading...</div>
           <Sprite fps={18} framesArray={loading} color={''} width={"50%"} height={"10px"} loop/>
        </div>
    )
}

const Loading = () =>{
    return <Sprite fps={18} framesArray={loading} color={''} width={"100%"} height={"10px"} loop/>
}