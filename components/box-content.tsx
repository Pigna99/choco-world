import { creatureId } from '@/utils/settings'
import styles from './box-content.module.css'
import { Commands } from './Commands/commands'
import { Info } from './Info/info'
import { Screen } from './Screen/screen-content'
import {useState, MouseEvent, useEffect, useRef} from 'react'
import { spritesList } from '@/utils/utilsFrontend'
import { Creature, VisualState } from '@/utils/interfaces'
import { VisualCreatureClass } from '@/utils/VisualCreatureClass'

let startElement: spritesList = 'stand';



export const Box = ()=>{
    const [windowSize, setWindowSize] = useState([
        500,
        500,
    ]);

    const [firstUpdate, setFirstUpdate] = useState(true)
    const [update, setUpdate] = useState(false);

    const [sprite, setSprite] = useState(startElement);
    const [isPlayingAnimation, setIsPlayingAnimation] = useState(false);

    const [infoText, setInfoText] = useState('loading...');
    const [infoBox, setInfoBox] = useState(VisualCreatureClass.generatePlaceholder());//change to a special info class/interface
    let updateTimeout:ReturnType<typeof setTimeout>;
    const clearUpdateTimeout = ()=>{
        //console.log(updateTimeout)
        if(updateTimeout)clearTimeout(updateTimeout);
    }

    const feedCommand = async (e:MouseEvent) =>{
        if(isPlayingAnimation)return;//make animation not interruptable!
        setIsPlayingAnimation(true)
        clearUpdateTimeout()
        const res = await fetch(`/api/feed?id=${creatureId}`)
        const data = await res.json()
        const creature: Creature = data.creature;
        updateInfoBox(creature)
        if(data.update){
            updateVisuals('eating')
        }else{
            updateVisuals('idle')
            setInfoText('not hungry')
            console.log('You have to wait more before eating again')
        }
        setUpdate(!update)
    }
    const petCommand = async (e:MouseEvent) =>{
        if(isPlayingAnimation)return;//make animation not interruptable!
        setIsPlayingAnimation(true)
        clearUpdateTimeout()
        const res = await fetch(`/api/pet?id=${creatureId}`)
        const data = await res.json()
        const creature: Creature = data.creature;
        updateInfoBox(creature)
        if(data.update){
            updateVisuals('happy')
        }else{
            updateVisuals('idle')
            setInfoText('try pet later')
            console.log('You have to wait more before petting again')
        }
        setUpdate(!update)
    }
    const updateCommand = async() =>{
        clearUpdateTimeout();
        if(isPlayingAnimation){setIsPlayingAnimation(false)}//if animation ended
        await coreUpdate();
        setUpdate(!update)
    }

    const coreUpdate = async() =>{
        const res = await fetch(`/api/update?id=${creatureId}`)
        const data = await res.json()
        
        if(!data){
            console.log("ERROR! DATA NOT RECEIVED"); return;
        }
        //console.log("Data received from API:", data)
        const creature: Creature = data.creature;
        updateInfoBox(creature)
        updateVisuals(creature.state)
        //set info and infobox
    }

    const updateVisuals = (v:VisualState)=>{
        switch (v) {
            case 'walking':
                let r = Math.floor(Math.random()*4)
                const walking_sprites:spritesList[] = ['walk-bottom','walk-right','walk-left','walk-top']
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

    const updateInfoBox = (c:Creature)=>{//format Creature?
        setInfoBox(c);
    }

    useEffect(() => {
        if(firstUpdate){
            setFirstUpdate(false);
            updateTimeout= setTimeout(updateCommand, 0);
            return;
        }
        
        updateTimeout= setTimeout(updateCommand, 5000);
    }, [update])

    useEffect(() => {
        const handleWindowResize = () => {//set a max width
          setWindowSize([window.innerWidth<=500 ? window.innerWidth : 500, window.innerHeight]);
        };
    
        window.addEventListener('resize', handleWindowResize);
    
        return () => {
          window.removeEventListener('resize', handleWindowResize);
        };
      }, []);
    return(
    <div className={styles.box}>
        <h1 className={styles.title}>Choco World</h1>
        <Info infoText={infoText}/>
        <hr className={styles.hr}/>
        <Screen sprite={sprite} infoBox={infoBox} width={windowSize[0]}/>
        <hr className={styles.hr}/>
        <Commands feedCommand={feedCommand} petCommand={petCommand}/>
    </div>
    )
}