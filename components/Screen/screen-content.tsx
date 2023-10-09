import styles from './screen-content.module.css'
import { spritesList } from '@/utils/frontend/utilsFrontend';

import Sprite from "@/components/Screen/Sprite/Sprite";
import getSprite from './Sprite/spriteUtils';
import { MouseEventHandler } from 'react';

export const Screen = ({sprite, width, color, clickScreen}:{sprite:spritesList,width:string,color:string,clickScreen:MouseEventHandler})=>{
    
    let reverse = false;
    if(sprite === 'walk-left'){
        sprite = 'walk-right';
        reverse = true;
    }
    return(
        <div className={styles.screen} style={{width:width,height:width}} onClick={clickScreen}>
            <div className={`${reverse ? styles.reverse : undefined} ${styles.sprite}`}>
                <Sprite loop={getSprite(sprite).loop} framesArray={getSprite(sprite).sprite} fps={getSprite(sprite).fps} color={color} width={width} height={width}/>
            </div>
        </div>
    )
}