import { CREATURE_ID, TICK_VALUE } from '@/utils/settings'
import styles from './box-content.module.css'
import { Screen } from './Screen/screen-content'
import { useState, MouseEvent, useEffect } from 'react'
import { API_string, menuList, precalcFeed, precalcPet, spritesList } from '@/utils/frontend/utilsFrontend'
import { Creature, VisualState } from '@/utils/interfaces'
import { VisualCreatureClass } from '@/utils/frontend/VisualCreatureClass'
import { Menu } from './Menu/menu'
import Sprite from './Screen/Sprite/Sprite'
import loading from './Screen/Sprite/Other/loading'
import { Content } from './Content/content'

let startElement: spritesList = 'stand';
let startMenu = [menuList.length-1,0,1];
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
        let length_menu = menuList.length;
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

    //info for fetching
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
    const updateCommand = async () => {
        if (!isUpdateTime()) {//update only visual, not API
            updateVisuals(infoBox.state)
            newTimeout(updateCommand,5000);
            return;
        };

        await apiCore('update', true);
    }

    const apiCore = async (api: API_string, forceVisual?: boolean) => {
        console.log("Update API")
        setIsFetching(true);
        const res = await fetch(`/api/${api}?id=${CREATURE_ID}`)
        const data = await res.json()
        if (!data) {
            console.log("ERROR! DATA NOT RECEIVED"); return;
        }
        if (!data.creature) { console.log("ERROR! CREATURE NOT RECEIVED"); return; }
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
        setFirstUpdate(false)
        updateCommand();
    }, [])

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
            <Screen sprite={sprite} width={windowSize[0]+"px"} />
            <LoadingSpinner visible={isFetching || isPlayingAnimation}/>
            <Content selectedMenu={selectedMenu} info={infoBox} action={infoText} isPlayingAnimation={isPlayingAnimation} commands={{
                feedCommand: feedCommand,petCommand: petCommand
            }} cycleMenu={cycleMenu}/>
            <Menu selectedMenu={selectedMenu[1]} cycleMenu={cycleMenu} />
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
           <Sprite fps={18} framesArray={loading} color={''} width={"50%"} height={"10px"}/>
        </div>
    )
}

const Loading = () =>{
    return <Sprite fps={18} framesArray={loading} color={''} width={"100%"} height={"10px"}/>
}