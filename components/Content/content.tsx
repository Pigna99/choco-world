import { creatureMenuList, newMenuList } from '@/utils/frontend/utilsFrontend'
import styles from './content.module.css'
import { Info } from './Info/info'
import { Stats } from './Stats/stats'
import { Commands } from './Commands/commands'
import React, { TouchEventHandler, useState } from 'react'
import { Settings } from './Settings/settings'
import ChocoList from './ChocoList/chocoList'
import NewChoco from './NewChoco/newChoco'
import LoadChoco from './LoadChoco/loadChoco'
import useGlobalContext from '../context'

export const Content = ()=>{
    const {clicks,creatureId,changeCreature,selectedMenu, creatureInfo, infoText, isPlayingAnimation, cycleMenu, creatureList} = useGlobalContext()
    const {feedCommand,petCommand,loadCreature,newCreature} = useGlobalContext()
    const sMenu:any[] = selectedMenu.list;

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
        if(selectedMenu.name!=='new'){
            return (
                creatureMenuList[id] === 'stats' ? <Stats info={creatureInfo} /> :
                creatureMenuList[id] === 'actions' ? <Commands feedCommand={feedCommand} petCommand={petCommand} block={isPlayingAnimation} info={infoText} /> :
                creatureMenuList[id] === 'info' ?<Info infoBox={creatureInfo} creatureId={creatureId}/> :
                creatureMenuList[id] === 'chocos' ? <ChocoList selectedChocoId={creatureId} changeChoco={changeCreature} chocoArray={creatureList}/> :
                creatureMenuList[id] === 'settings' ? <Settings/> :
            <div></div> ) 
        }
        return(
            newMenuList[id] === 'new' ? <NewChoco newChoco={newCreature} clicks={clicks}/>:
            newMenuList[id] === 'load' ? <LoadChoco loadChoco={loadCreature}/>:
            newMenuList[id] === 'chocos' ? <ChocoList selectedChocoId={creatureId} changeChoco={changeCreature} chocoArray={creatureList}/> :
            newMenuList[id] === 'settings' ? <Settings/> :
            <div></div>
        )
                 
    }
    //connect menu entry to menu component

    return(
        <div className={`${styles.mainContent}`} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
            {
                sMenu.map((el,index)=>{
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