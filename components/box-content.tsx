import styles from './box-content.module.css'
import { Commands } from './Commands/commands'
import { Info } from './Info/info'
import { Screen } from './Screen/screen-content'
import {useState, MouseEvent} from 'react'

const spritesList =[
    'eat',
    'happy',
    'sleep',
    'stand',
    'walk-bottom',
    'walk-right',
    'walk-top',
]
const startElement = {value:spritesList[0], n:0};



export const Box = ()=>{
    const [sprite, setSprite] = useState(startElement );

    const cycleSprites = (e:MouseEvent):void=>{
        let i = sprite.n+1;
        if (i < spritesList.length){
            setSprite({value:spritesList[i],n:i});
        }else{
            setSprite(startElement);
        }
    }

    return(
    <div className={styles.box}>
        <h1 className={styles.title}>Choco World</h1>
        <Info/>
        <hr className={styles.hr}/>
        <Screen sprite={sprite.value}/>
        <hr className={styles.hr}/>
        <Commands testCommand={cycleSprites}/>
    </div>
    )
}