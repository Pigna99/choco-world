import React from 'react'

import { useState, useEffect } from "react";

function Sprite({fps, framesArray, color, width, height , loop, numberLoops, onEnd}
    :{fps:number, framesArray:((color:string)=>React.JSX.Element[]), color:string,
        width:string, height:string, loop?:boolean, numberLoops?:number, onEnd?:()=>void}) {
    //console.log(fps,color,loop, numberLoops)
    const generatedFrames = framesArray(color);
    const [frame, setFrame] = useState(generatedFrames[0]);
    const [frameNumber, setFrameNumber] = useState({n:0, loops: 0});
    const [isChangeFrame, setIsChangeFrame] = useState(false);
    const [lastFrameTimeOut, setLastFrameTimeOut] =useState<NodeJS.Timeout |null>(null)

    useEffect(() => {
        const maxFrame = generatedFrames.length;
        //console.log(maxFrame, frameNumber)
        
        if(frameNumber.n<(maxFrame-1)){
            setFrameNumber({...frameNumber, n:frameNumber.n+1})
        }else{
            if(loop){
                setFrameNumber({...frameNumber, n:0});
            }else{
                if(frameNumber.loops>0){
                    setFrameNumber({n:0, loops:(frameNumber.loops-1)});
                }else{
                    //console.log('animation end')
                    if(onEnd)onEnd()
                    return;
                }
            }
        }
        if(lastFrameTimeOut)clearTimeout(lastFrameTimeOut);
        setLastFrameTimeOut(setTimeout(()=>{
            setIsChangeFrame(!isChangeFrame)
        },Math.round((1000)/(fps))))
    }, [isChangeFrame,framesArray]);

    useEffect(() => {
        //console.log(frameNumber)
        setFrame(generatedFrames[frameNumber.n])
    }, [frameNumber]);

    useEffect(() => {
        //console.log(frame)
    }, [frame]);

    useEffect(()=>{
        setFrameNumber({n:0, loops: (numberLoops ? numberLoops : 0)});
    },[framesArray])

    
    
  return (
    <div style={{width:width, height:height}}>
        {
            frame
        }
      </div>
  )
}

export default Sprite