import styles from './screen-content.module.css'
import { spritesList } from '@/utils/frontend/utilsFrontend';

import Sprite from "@/components/Sprite/Sprite";
import getSprite from '../Sprite/spriteUtils';

export const Screen = ({sprite, width}:{sprite:spritesList,width:string})=>{
    
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
        </div>
    )
}