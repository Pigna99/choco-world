import { MouseEventHandler, useState , MouseEvent, JSX} from 'react'
import styles from './screen-content.module.css'
import { spritesList } from '@/utils/frontend/utilsFrontend';
import { Creature } from '@/utils/interfaces';

import Sprite from "@/components/Sprite/Sprite";
import getSprite from '../Sprite/spriteUtils';

export const Screen = ({sprite, infoBox, width, isInfo}:{sprite:spritesList, infoBox:Creature, width:number, isInfo:boolean})=>{
    
    let reverse = false;
    if(sprite === 'walk-left'){
        sprite = 'walk-right';
        reverse = true;
    }

    
    return(
        <div className={styles.screen} style={{width:width,height:width}}>
            <div className={`${reverse ? styles.reverse : undefined} ${styles.sprite}`}>
                <Sprite  framesArray={getSprite(sprite).sprite} fps={getSprite(sprite).fps} color='#ffbf00' width={width} height={width}/>
            </div>
            <InfoBox isVisible={isInfo} infoBox={infoBox}/>
        </div>
    )
}

const InfoBox = ({isVisible, infoBox}:{isVisible:boolean, infoBox:Creature})=>{
    return(
        <div className={`${styles.infobox} ${isVisible? styles.infoboxvisible : styles.infoboxhidden}`}>
            <div>{`Birthday: ${formatDate(new Date(infoBox.informations.birthday))}`}</div>
            <div>{`Times fed: ${infoBox.informations.feeds}`}</div>
            <div>{`Times petted: ${infoBox.informations.pets}`}</div>
            <div>{`Km done: ${infoBox.informations.steps}`}</div>
        </div>
    )
}

const formatDate=(d:Date)=>{
    return `${d.getMonth()+1}-${d.getDate()}-${d.getFullYear()}`
}