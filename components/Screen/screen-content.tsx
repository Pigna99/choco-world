import { MouseEventHandler, useState , MouseEvent} from 'react'
import styles from './screen-content.module.css'
import Image from 'next/image'
import { spritesList } from '@/utils/utilsFrontend';
import { Creature } from '@/utils/interfaces';
import { HAPPINESS_NAMES } from '@/utils/settings';





export const Screen = ({sprite, infoBox, width}:{sprite:spritesList, infoBox:Creature, width:number})=>{
    const [isInfo, setInfo] = useState(false);
    
    let reverse = false;
    if(sprite === 'walk-left'){
        sprite = 'walk-right';
        reverse = true;
    }

    const handleInfoButton = (e:MouseEvent):void =>{
        setInfo(!isInfo);
    }
    return(
        <div className={styles.screen} style={{width:width,height:width}}>
            <InfoButton handleClick={handleInfoButton}/>
            <div className={`${reverse ? styles.reverse : undefined} ${styles.sprite}`}>
                <Image
                    src={`/images/sprites/${sprite}.gif`}
                    fill
                    alt='Main screen sprites'
                />
            </div>
            <InfoBox isVisible={isInfo} infoBox={infoBox}/>
        </div>
    )
}

const InfoButton = ({handleClick}:{handleClick:MouseEventHandler}) =>{
    return(
        <div className={styles.infobtn} onClick={handleClick}>
            i
        </div>
    )
}
const InfoBox = ({isVisible, infoBox}:{isVisible:boolean, infoBox:Creature})=>{
    return(
        <div className={`${styles.infobox} ${isVisible? styles.infoboxvisible : styles.infoboxhidden}`}>
            <h2>{infoBox.name}</h2>
            <div>{`Level: ${infoBox.statictics.level}`}</div>
            <div>{`Stamina: ${infoBox.statictics.stamina.actual}/${infoBox.statictics.stamina.max}`}</div>
            <div>{`Hunger: ${infoBox.statictics.hunger.actual}/${infoBox.statictics.hunger.max}`}</div>
            <div>{`Happiness: ${HAPPINESS_NAMES[infoBox.statictics.happiness.actual]}`}</div>
            <div>{`Experience: ${infoBox.statictics.experience.actual}/${infoBox.statictics.experience.max}`}</div>
        </div>
    )
}