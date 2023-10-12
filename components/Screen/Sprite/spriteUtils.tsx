import walkright from "@/components/Screen/Sprite/Sprites/walkright";
import walktop from "@/components/Screen/Sprite/Sprites/walktop";
import walkbottom from "@/components/Screen/Sprite/Sprites/walkbottom";
import stand from "@/components/Screen/Sprite/Sprites/stand"
import sleep from "@/components/Screen/Sprite/Sprites/sleep";
import happy from "@/components/Screen/Sprite/Sprites/happy";
import eat from "@/components/Screen/Sprite/Sprites/eat";
import { spritesList } from "@/utils/frontend/utilsFrontend";
import egg from "./Sprites/egg";
import eggshake from "./Sprites/eggshake";
import none from "./Sprites/none";
import hatching from "./Sprites/hatching";

const getSprite=(sprite:spritesList)=>{
    const baseFPS= 32;
    let returnValues =
    {sprite:none,}
    switch (sprite) {
        case 'eat':  returnValues.sprite = eat;break;
        case 'happy':  returnValues.sprite = happy;break;
        case 'sleep':  returnValues.sprite = sleep; break;
        case 'stand':  returnValues.sprite = stand;break;
        case 'walk-top':  returnValues.sprite = walktop; break;
        case 'walk-bottom':  returnValues.sprite = walkbottom;break;
        case 'walk-right':  returnValues.sprite = walkright;break;
        case 'egg': returnValues.sprite = egg;break;
        case 'eggshake': returnValues.sprite = eggshake;break;
        case 'hatching': returnValues.sprite = hatching;break;
        case 'none':
        default: returnValues.sprite = none;break;
    }
    return returnValues;
}

export default getSprite;