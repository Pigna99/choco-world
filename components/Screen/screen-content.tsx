import styles from './screen-content.module.css'
import { spritesList } from '@/utils/frontend/utilsFrontend';

import Sprite from "@/components/Screen/Sprite/Sprite";
import getSprite from './Sprite/spriteUtils';

export const Screen = ({sprite, width, color}:{sprite:spritesList,width:string,color:string})=>{
    
    let reverse = false;
    if(sprite === 'walk-left'){
        sprite = 'walk-right';
        reverse = true;
    }
    return(
        <div className={styles.screen} style={{width:width,height:width}}>
            <div className={`${reverse ? styles.reverse : undefined} ${styles.sprite}`}>
                <Sprite  framesArray={getSprite(sprite).sprite} fps={getSprite(sprite).fps} color={color} width={width} height={width}/>
            </div>
        </div>
    )
}