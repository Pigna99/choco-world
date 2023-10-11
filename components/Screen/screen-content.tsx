import styles from './screen-content.module.css'
import { spritesList } from '@/utils/frontend/utilsFrontend';

import Sprite from "@/components/Screen/Sprite/Sprite";
import getSprite from './Sprite/spriteUtils';
import useGlobalContext from '../context';

export const Screen = ({ width}:{width:string})=>{
    const {creatureInfo, clickScreen} = useGlobalContext()
    let {sprite} = useGlobalContext()
    let reverse = false;
    if(sprite === 'walk-left'){
        sprite = 'walk-right';
        reverse = true;
    }
    return(
        <div className={styles.screen} style={{width:width,height:width}} onClick={clickScreen}>
            <div className={`${reverse ? styles.reverse : ''} ${styles.sprite}`}>
                <Sprite loop={getSprite(sprite).loop} framesArray={getSprite(sprite).sprite} fps={getSprite(sprite).fps} color={creatureInfo.color} width={width} height={width}/>
            </div>
        </div>
    )
}