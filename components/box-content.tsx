import { creatureName } from '@/utils/settings'
import styles from './box-content.module.css'
import { Commands } from './Commands/commands'
import { Info } from './Info/info'
import { Screen } from './Screen/screen-content'
import {useState, MouseEvent, useEffect} from 'react'
import { spritesList } from '@/utils/utilsFrontend'
import { Creature, VisualState } from '@/utils/interfaces'

let startElement: spritesList = 'stand';



export const Box = ()=>{
    const [firstUpdate, setFirstUpdate] = useState(true)
    const [update, setUpdate] = useState(false);

    const [sprite, setSprite] = useState(startElement);
    const [infoText, setInfoText] = useState('info');
    const [infoBox, setInfoBox] = useState('infos');//change to a special info class/interface
    let updateTimeout:ReturnType<typeof setTimeout>;
    const clearUpdateTimeout = ()=>{
        //console.log(updateTimeout)
        if(updateTimeout)clearTimeout(updateTimeout);
    }

    const feedCommand = async (e:MouseEvent) =>{
        clearUpdateTimeout()
        const res = await fetch(`/api/feed?name=${creatureName}`)
        const data = await res.json()
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
        clearUpdateTimeout()
        const res = await fetch(`/api/pet?name=${creatureName}`)
        const data = await res.json()
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
        await coreUpdate();
        setUpdate(!update)
        //set info and infobox
    }

    const coreUpdate = async() =>{
        const res = await fetch(`/api/update?name=${creatureName}`)
        const data = await res.json()
        
        if(!data){
            console.log("ERROR! DATA NOT RECEIVED"); return;
        }
        //console.log("Data received from API:", data)
        const creature: Creature = data.creature;
        updateVisuals(creature.state)
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

    useEffect(() => {
        if(firstUpdate){
            setFirstUpdate(false);
            updateTimeout= setTimeout(updateCommand, 0);
            return;
        }
        updateTimeout= setTimeout(updateCommand, 5000);
    }, [update])

    return(
    <div className={styles.box}>
        <h1 className={styles.title}>Choco World</h1>
        <Info infoText={infoText}/>
        <hr className={styles.hr}/>
        <Screen sprite={sprite} infoBox={infoBox}/>
        <hr className={styles.hr}/>
        <Commands feedCommand={feedCommand} petCommand={petCommand}/>
    </div>
    )
}