import { creatureName } from '@/utils/settings'
import styles from './box-content.module.css'
import { Commands } from './Commands/commands'
import { Info } from './Info/info'
import { Screen } from './Screen/screen-content'
import {useState, MouseEvent, useEffect} from 'react'
import { spritesList } from '@/utils/utilsFrontend'
import { Creature, VisualState } from '@/utils/interfaces'

let startVisualState: VisualState = 'idle';
let startElement: spritesList = 'stand';



export const Box = ()=>{
    const [visualState, setVisualState] = useState(startVisualState);
    const [sprite, setSprite] = useState(startElement);
    const [infoText, setInfoText] = useState('info');
    const [infoBox, setInfoBox] = useState('infos');//change to a special info class/interface


    const feedCommand = async (e:MouseEvent) =>{
        //setSprite('walk-right')
    }
    const petCommand = async (e:MouseEvent) =>{
        
        
    }
    const updateCommand = async() =>{
        const res = await fetch(`/api/update?name=${creatureName}`)
        const data = await res.json()
        
        if(!data){
            console.log("ERROR! DATA NOT RECEIVED"); return;
        }
        console.log("Data received from API:", data)
        const creature: Creature = data.creature;
        setVisualState(creature.state)
        //set info and infobox
    }

    useEffect(() => {
        updateCommand();
        return () => {
        }
    }, [])

    useEffect(() => {//set the sprites based on visualState
        
    }, [visualState])
    

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