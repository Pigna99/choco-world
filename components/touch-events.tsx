import React, {TouchEventHandler, useState } from 'react'

const startTouchValue: number|null = null;

function Touch({onTouchLeft, onTouchRight, children}:{onTouchLeft:()=> void,onTouchRight:()=> void,children: JSX.Element}) {
    const [touchStart, setTouchStart] = useState(startTouchValue)
    const [touchEnd, setTouchEnd] = useState(startTouchValue)

// the required distance between touchStart and touchEnd to be detected as a swipe
    const minSwipeDistance = 50 

    const onTouchStart:TouchEventHandler<HTMLDivElement> = (e) => {
        setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
        setTouchStart(e.targetTouches[0].clientX)
    }

    const onTouchMove:TouchEventHandler<HTMLDivElement> = (e) => setTouchEnd(e.targetTouches[0].clientX)

    const onTouchEnd:TouchEventHandler<HTMLDivElement> = () => {
        if (!touchStart || !touchEnd) return
        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > minSwipeDistance
        const isRightSwipe = distance < -minSwipeDistance
        //if (isLeftSwipe || isRightSwipe) console.log('swipe', isLeftSwipe ? 'left' : 'right')
        // add your conditional logic here
        isLeftSwipe ? onTouchLeft() : onTouchRight()
    }


  return (
    <div onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} style={{width:"100%", height:"100%"}}>
        {children}
    </div>
  )
}

export default Touch