import { menuList } from '@/utils/frontend/utilsFrontend'
import styles from './content.module.css'
import { Info } from './Info/info'
import { Stats } from './Stats/stats'
import { Commands } from './Commands/commands'
import { Creature } from '@/utils/interfaces'
import React, { MouseEventHandler, TouchEventHandler, useEffect, useState } from 'react'
import { Settings } from './Settings/settings'

export const Content = ({selectedMenu, info, action, isPlayingAnimation, commands , cycleMenu}:{selectedMenu:number[], info:Creature, action:string,isPlayingAnimation:boolean, commands:{feedCommand:MouseEventHandler, petCommand:MouseEventHandler} ,cycleMenu:(e:boolean)=>()=>void})=>{
    
    //touch
    const [touchStart, setTouchStart] = useState<null|number>(null)
    const [touchEnd, setTouchEnd] = useState<null|number>(null)

    // the required distance between touchStart and touchEnd to be detected as a swipe
    const minSwipeDistance = 80 

    const onTouchStart:TouchEventHandler<HTMLDivElement> = (e) => {
        setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
        setTouchStart(e.targetTouches[0].clientX)
    }

    const onTouchMove:TouchEventHandler<HTMLDivElement> = (e) => setTouchEnd(e.targetTouches[0].clientX)

    const onTouchEnd:TouchEventHandler<HTMLDivElement> = () => {
        if (!touchStart || !touchEnd) return
        setTouchEnd(0);setTouchStart(0)
        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > minSwipeDistance
        const isRightSwipe = distance < -minSwipeDistance
        //if (isLeftSwipe || isRightSwipe) console.log('swipe', isLeftSwipe ? 'left' : 'right')
        if(isLeftSwipe)cycleMenu(false)()
        if(isRightSwipe)cycleMenu(true)()
    }

    const setTranslateSwipe=()=>{
        const min_swipe=10;
        return touchStart&&touchEnd ? touchEnd-touchStart>=min_swipe ? touchEnd-touchStart-min_swipe : touchEnd-touchStart<=-min_swipe ? touchEnd-touchStart+min_swipe : 0 : 0
    }
    //touch

    //connect menu entry to menu component
    const getMainContent =(id:number)=>{
        return (menuList[id] === 'stats' ? <Stats info={info} /> :
            menuList[id] === 'actions' ? <Commands feedCommand={commands.feedCommand} petCommand={commands.petCommand} block={isPlayingAnimation} info={action} /> :
            menuList[id] === 'info' ?<Info infoBox={info} /> :
            menuList[id] === 'settings' ? <Settings/> :
        <div>no menu</div> )          
    }
    //connect menu entry to menu component

    return(
        <div className={`${styles.mainContent}`} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
            {
                selectedMenu.map((el,index)=>{
                    return(
                        <div key={'menu-'+ el} className={`${styles.contentBox} ${index===0 ? styles.left: index===1? styles.actual : styles.right}`}
                            style={
                                index===0 ?{transform:`translateX(${setTranslateSwipe()}px) translateX(-100%)`}:
                                index===1 ?{transform:`translateX(${setTranslateSwipe()}px)`}:
                                {transform:`translateX(${setTranslateSwipe()}px) translateX(100%)`}
                            }
                        >
                            {getMainContent(el)}
                        </div>
                    )
                })
            }
        </div>
    )
} 