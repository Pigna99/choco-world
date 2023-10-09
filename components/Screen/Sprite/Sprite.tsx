import React from 'react'

import { useState, useEffect } from "react";

function Sprite({fps, framesArray, color, width, height , loop}
    :{fps:number, framesArray:((color:string)=>React.JSX.Element[]), color:string,
        width:string, height:string, loop?:boolean}) {
    const generatedFrames = framesArray(color);
    const [frame, setFrame] = useState(generatedFrames[0]);
    const [frameNumber, setFrameNumber] = useState(0);
    const [isChangeFrame, setIsChangeFrame] = useState(false);
    const [lastFrameTimeOut, setLastFrameTimeOut] =useState<NodeJS.Timeout |null>(null)

    useEffect(() => {
        const maxFrame = generatedFrames.length;
        if(!loop && maxFrame-1===frameNumber)return;
        
        frameNumber<(maxFrame-1) ? setFrameNumber(frameNumber+1) : setFrameNumber(0);
        if(lastFrameTimeOut)clearTimeout(lastFrameTimeOut);
        setLastFrameTimeOut(setTimeout(()=>{
            setIsChangeFrame(!isChangeFrame)
        },Math.round((1000)/(fps))))
    }, [isChangeFrame,framesArray]);

    useEffect(() => {
        setFrame(generatedFrames[frameNumber])
    }, [frameNumber]);

    useEffect(() => {
        //console.log(frame)
    }, [frame]);
  return (
    <div style={{width:width, height:height}}>
        {
            frame
        }
      </div>
  )
}

export default Sprite