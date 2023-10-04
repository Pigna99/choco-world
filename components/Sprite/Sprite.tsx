import React from 'react'

import { useState, useEffect } from "react";

function Sprite({fps, framesArray, color}:{fps:number, framesArray:((color:string)=>React.JSX.Element[]), color:string}) {
    const generatedFrames = framesArray(color);
    const [frame, setFrame] = useState(generatedFrames[0]);
    const [frameNumber, setFrameNumber] = useState(0);
    const [isChangeFrame, setIsChangeFrame] = useState(false);

    useEffect(() => {
        const maxFrame = generatedFrames.length;
        frameNumber<(maxFrame-1) ? setFrameNumber(frameNumber+1) : setFrameNumber(0);
        setTimeout(()=>{
            setIsChangeFrame(!isChangeFrame)
        },Math.round((1000)/(fps)))
    }, [isChangeFrame]);

    useEffect(() => {
        setFrame(generatedFrames[frameNumber])
    }, [frameNumber]);

    useEffect(() => {
        //console.log(frame)
    }, [frame]);
  return (
    <div style={{backgroundColor:'white', width:500, height:500}}>
        {
            frame
        }
      </div>
  )
}

export default Sprite