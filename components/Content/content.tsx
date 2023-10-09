import { chocoMenuList, newMenuList } from '@/utils/frontend/utilsFrontend'
import styles from './content.module.css'
import { Info } from './Info/info'
import { Stats } from './Stats/stats'
import { Commands } from './Commands/commands'
import { Creature, Gender, savedChoco } from '@/utils/interfaces'
import React, { MouseEventHandler, TouchEventHandler, useState } from 'react'
import { Settings } from './Settings/settings'
import ChocoList from './ChocoList/chocoList'
import NewChoco from './NewChoco/newChoco'
import LoadChoco from './LoadChoco/loadChoco'

export const Content = (
    {clicks,selectedChocoId,changeChoco,selectedMenu, info, action, isPlayingAnimation, commands , cycleMenu, chocoArray}:
    {clicks: number,selectedChocoId:string|null,selectedMenu:number[], info:Creature, action:string,isPlayingAnimation:boolean, commands:{feedCommand:MouseEventHandler, petCommand:MouseEventHandler, loadChoco:(id:string)=>void, newChoco:(name:string,color:string,gender:Gender)=>void, deleteAll:MouseEventHandler} ,cycleMenu:(e:boolean)=>()=>void,changeChoco:(id:string)=>void, chocoArray:savedChoco[]})=>{
    
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
        if(selectedChocoId!=='new'){
            return (
                chocoMenuList[id] === 'stats' ? <Stats info={info} /> :
                chocoMenuList[id] === 'actions' ? <Commands feedCommand={commands.feedCommand} petCommand={commands.petCommand} block={isPlayingAnimation} info={action} /> :
                chocoMenuList[id] === 'info' ?<Info infoBox={info} creatureId={selectedChocoId}/> :
                chocoMenuList[id] === 'chocos' ? <ChocoList selectedChocoId={selectedChocoId} changeChoco={changeChoco} chocoArray={chocoArray}/> :
                chocoMenuList[id] === 'settings' ? <Settings deleteAll={commands.deleteAll}/> :
            <div></div> ) 
        }
        return(
            newMenuList[id] === 'new' ? <NewChoco newChoco={commands.newChoco} clicks={clicks}/>:
            newMenuList[id] === 'load' ? <LoadChoco loadChoco={commands.loadChoco}/>:
            newMenuList[id] === 'chocos' ? <ChocoList selectedChocoId={selectedChocoId} changeChoco={changeChoco} chocoArray={chocoArray}/> :
            newMenuList[id] === 'settings' ? <Settings deleteAll={commands.deleteAll}/> :
            <div></div>
        )
                 
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