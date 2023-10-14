import styles from './screen-content.module.css'

import Sprite from "@/components/Screen/Sprite/Sprite";
import getSprite from './Sprite/spriteUtils';
import { useAppContext } from '../context/appcontext';
import { useScreenContext } from '../context/screencontext';

export const Screen = ({ width}:{width:string})=>{
    const {creatureInfo} = useAppContext()
    let {sprite, clickScreen} = useScreenContext()
    let reverse = false;
    if(sprite.name === 'walk-left'){
        sprite.name = 'walk-right';
        reverse = true;
    }
    const baseFPS= 32;
    return(
        <div className={styles.screen} style={{width:width,height:width}} onClick={clickScreen}>
            <div className={`${reverse ? styles.reverse : ''} ${styles.sprite}`}>
                <Sprite onEnd={sprite.onEnd} loop={sprite.loop} numberLoops={sprite.numLoops} framesArray={getSprite(sprite.name).sprite} fps={sprite.fps? sprite.fps : baseFPS} color={creatureInfo.color} width={width} height={width}/>
            </div>
        </div>
    )
}