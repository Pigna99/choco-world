import walkright from "@/components/Sprite/Sprites/walkright";
import walktop from "@/components/Sprite/Sprites/walktop";
import walkbottom from "@/components/Sprite/Sprites/walkbottom";
import stand from "@/components/Sprite/Sprites/stand"
import sleep from "@/components/Sprite/Sprites/sleep";
import happy from "@/components/Sprite/Sprites/happy";
import eat from "@/components/Sprite/Sprites/eat";
import { spritesList } from "@/utils/frontend/utilsFrontend";

const getSprite=(sprite:spritesList)=>{
    let returnValues =
    {sprite:stand, fps:12}
    switch (sprite) {
        case 'eat':  returnValues.sprite = eat; returnValues.fps = 8 ;break;
        case 'happy':  returnValues.sprite = happy; returnValues.fps = 8 ;break;
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