import { MouseEventHandler, useState , MouseEvent} from 'react'
import styles from './screen-content.module.css'
import Image from 'next/image'
import { spritesList } from '@/utils/utilsFrontend';
import { Creature } from '@/utils/interfaces';





export const Screen = ({sprite, infoBox}:{sprite:spritesList, infoBox:Creature})=>{
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
        <div className={styles.screen}>
            <div className={reverse ? styles.reverse : undefined}>
                <Image
                    src={`/images/sprites/${sprite}.gif`}
                    width={200}
                    height={200}
                    alt='Main screen sprites'
                />
            </div>
            <InfoButton handleClick={handleInfoButton}/>
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
            <div>{`Happiness: ${infoBox.statictics.happiness.actual}/${infoBox.statictics.happiness.max}`}</div>
            <div>{`Experience: ${infoBox.statictics.experience.actual}/${infoBox.statictics.experience.max}`}</div>
        </div>
    )
}