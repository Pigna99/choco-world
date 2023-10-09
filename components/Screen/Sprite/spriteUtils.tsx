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
import hatchingend from "./Sprites/hatchingend";

const getSprite=(sprite:spritesList)=>{
    const baseStatiFPS= 32;
    let returnValues =
    {sprite:none, fps:baseStatiFPS}
    switch (sprite) {
        case 'eat':  returnValues.sprite = eat; returnValues.fps = 8 ;break;
        case 'happy':  returnValues.sprite = happy; returnValues.fps = 12 ;break;
        case 'sleep':  returnValues.sprite = sleep; returnValues.fps = 8 ;break;
        case 'stand':  returnValues.sprite = stand; returnValues.fps = 4 ;break;
        case 'walk-top':  returnValues.sprite = walktop; returnValues.fps = 16 ;break;
        case 'walk-bottom':  returnValues.sprite = walkbottom; returnValues.fps = 16 ;break;
        case 'walk-right':  returnValues.sprite = walkright; returnValues.fps =  16;break;
        case 'egg': returnValues.sprite = egg; returnValues.fps = baseStatiFPS; break;
        case 'eggshake': returnValues.sprite = eggshake; returnValues.fps = baseStatiFPS;break;
        case 'hatching': returnValues.sprite = hatching; returnValues.fps = 6;break;
        case 'hatching-end': returnValues.sprite = hatchingend; returnValues.fps = baseStatiFPS;break;
        case 'none':
        default: returnValues.sprite = none; returnValues.fps = 16;break;
    }
    return returnValues;
}

export default getSprite;