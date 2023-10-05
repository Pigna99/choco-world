import { CREATURE_ID, TICK_VALUE } from '@/utils/settings'
import styles from './box-content.module.css'
import { Commands } from './Commands/commands'
import { Info } from './Info/info'
import { Screen } from './Screen/screen-content'
import { useState, MouseEvent, useEffect } from 'react'
import { menu, precalcFeed, precalcPet, spritesList } from '@/utils/frontend/utilsFrontend'
import { Creature, VisualState } from '@/utils/interfaces'
import { VisualCreatureClass } from '@/utils/frontend/VisualCreatureClass'
import { Stats } from './Stats/stats'
import { Menu } from './Menu/menu'

let startElement: spritesList = 'stand';
let startMenu: menu = 'stats';


export const Box = () => {
    const [windowSize, setWindowSize] = useState([
        500,
        500,
    ]);

    const [isFirstLoading, setIsFirstLoading] = useState(true);


    const [selectedMenu, setSelectedMenu] = useState(startMenu)
    const setMenu = (m: menu) => (e: MouseEvent): void => {
        setSelectedMenu(m);
    }

    const [firstUpdate, setFirstUpdate] = useState(true)
    const [lastUpdate, setLastUpdate] = useState(new Date(0));
    const [update, setUpdate] = useState(false);

    const [sprite, setSprite] = useState(startElement);
    const [isPlayingAnimation, setIsPlayingAnimation] = useState(false);

    const [infoText, setInfoText] = useState('loading...');
    const [infoBox, setInfoBox] = useState(VisualCreatureClass.generatePlaceholder());//change to a special info class/interface
    let updateTimeout: ReturnType<typeof setTimeout>;
    const clearUpdateTimeout = () => {
        //console.log(updateTimeout)
        if (updateTimeout) clearTimeout(updateTimeout);
    }

    const isUpdateTime = () => {//check if is time to update, and if true set new time
        //const timeLeft = (new Date()).getTime() - (lastUpdate.getTime()+TICK_VALUE*60000)
        const value = (lastUpdate.getTime() + TICK_VALUE * 60000) < (new Date()).getTime()
        //console.log(timeLeft/1000, value)
        return value
    }

    //block7wait command if is fetching!
    const feedCommand = async (e: MouseEvent) => {
        if (isPlayingAnimation) return;//make animation not interruptable!
        setIsPlayingAnimation(true)
        clearUpdateTimeout()//stop autoupdate timeout

        precalcFeed(infoBox) ? updateVisuals('eating') : updateVisuals('idle-feed')//precalc if you can feed or not for fast update

        const res = await fetch(`/api/feed?id=${CREATURE_ID}`)
        await apiCore(res, false);
    }
    const petCommand = async (e: MouseEvent) => {
        if (isPlayingAnimation) return;//make animation not interruptable!
        setIsPlayingAnimation(true)
        clearUpdateTimeout()

        precalcPet(infoBox) ? updateVisuals('happy') : updateVisuals('idle-pet')//precalc if you can pet or not for fast update

        const res = await fetch(`/api/pet?id=${CREATURE_ID}`)
        await apiCore(res, false);
    }
    const updateCommand = async () => {
        clearUpdateTimeout();
        if (isPlayingAnimation) { setIsPlayingAnimation(false) }//if animation ended
        if (!isUpdateTime()) {//update only visual, not API
            updateVisuals(infoBox.state)
            setUpdate(!update)
            return;
        };
        console.log("Update API")
        const res = await fetch(`/api/update?id=${CREATURE_ID}`)
        await apiCore(res, true);
        if (isFirstLoading) setIsFirstLoading(false);
    }

    const apiCore = async (res: Response, forceVisual: boolean) => {
        const data = await res.json()
        if (!data) {
            console.log("ERROR! DATA NOT RECEIVED"); return;
        }
        if (!data.creature) { console.log("ERROR! CREATURE NOT RECEIVED"); return; }
        const creature: Creature = data.creature;
        updateInfoBox(creature)
        setUpdate(!update)
        if (forceVisual) updateVisuals(creature.state)
        setLastUpdate(new Date());
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

    const updateInfoBox = (c: Creature) => {//format Creature?
        setInfoBox(c);
    }

    useEffect(() => {
        if (firstUpdate) {
            setFirstUpdate(false);
            updateTimeout = setTimeout(updateCommand, 0);
            return;
        }
        updateTimeout = setTimeout(updateCommand, 5000);
    }, [update])

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
            <LoadingScreen isLoading={isFirstLoading} width={windowSize[0]} height={windowSize[1]}/>
            <Screen sprite={sprite} width={windowSize[0]} />
            <div className={styles.mainContent}>
                {
                    selectedMenu === 'stats' ? <Stats info={infoBox} /> :
                        selectedMenu === 'actions' ? <Commands feedCommand={feedCommand} petCommand={petCommand} blockCommand={isPlayingAnimation} info={infoText} /> :
                            <Info infoBox={infoBox} />
                }
            </div>
            <Menu selectedMenu={selectedMenu} setMenu={setMenu} />
        </div>
    )
}

/**
 * <hr className={styles.hr}/>
 * 
 *         
    
 */

const LoadingScreen = ({ isLoading, width, height }: { isLoading:boolean,width: number, height:number }) => {
    return (
        <div className={`${styles.loadingScreen} ${isLoading? '' : styles.loaded}`} style={{ }}>loading...</div>
    )
}