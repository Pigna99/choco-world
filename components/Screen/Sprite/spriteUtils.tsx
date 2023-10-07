import walkright from "@/components/Screen/Sprite/Sprites/walkright";
import walktop from "@/components/Screen/Sprite/Sprites/walktop";
import walkbottom from "@/components/Screen/Sprite/Sprites/walkbottom";
import stand from "@/components/Screen/Sprite/Sprites/stand"
import sleep from "@/components/Screen/Sprite/Sprites/sleep";
import happy from "@/components/Screen/Sprite/Sprites/happy";
import eat from "@/components/Screen/Sprite/Sprites/eat";
import { spritesList } from "@/utils/frontend/utilsFrontend";

const getSprite=(sprite:spritesList)=>{
    let returnValues =
    {sprite:stand, fps:12}
    switch (sprite) {
        case 'eat':  returnValues.sprite = eat; returnValues.fps = 8 ;break;
        case 'happy':  returnValues.sprite = happy; returnValues.fps = 12 ;break;
        case 'sleep':  returnValues.sprite = sleep; returnValues.fps = 8 ;break;
        case 'stand':  returnValues.sprite = stand; returnValues.fps = 4 ;break;
        case 'walk-top':  returnValues.sprite = walktop; returnValues.fps = 16 ;break;
        case 'walk-bottom':  returnValues.sprite = walkbottom; returnValues.fps = 16 ;break;
        case 'walk-right':  returnValues.sprite = walkright; returnValues.fps = 16 ;break;
        default:  break;
    }
    return returnValues;
}

export default getSprite;