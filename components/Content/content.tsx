import { menuList } from '@/utils/frontend/utilsFrontend'
import styles from './content.module.css'
import { Info } from './Info/info'
import { Stats } from './Stats/stats'
import { Commands } from './Commands/commands'
import { Creature } from '@/utils/interfaces'
import { MouseEventHandler, useEffect } from 'react'
import { Settings } from './Settings/settings'



export const Content = ({selectedMenu, info, action, isPlayingAnimation, commands}:{selectedMenu:number[], info:Creature, action:string,isPlayingAnimation:boolean, commands:{feedCommand:MouseEventHandler, petCommand:MouseEventHandler}})=>{

    const getMainContent =(id:number)=>{
        return (menuList[id] === 'stats' ? <Stats info={info} /> :
            menuList[id] === 'actions' ? <Commands feedCommand={commands.feedCommand} petCommand={commands.petCommand} block={isPlayingAnimation} info={action} /> :
            menuList[id] === 'info' ?<Info infoBox={info} /> :
            menuList[id] === 'settings' ? <Settings/> :
        <div>no menu</div> )          
    }
    
    return(
        <div className={`${styles.mainContent}`}>
            {
                selectedMenu.map((el,index)=>{
                    return(
                        <div key={'menu-'+ el} className={`${styles.contentBox} ${index===0 ? styles.left: index===1? styles.actual : styles.right}`}>
                            {getMainContent(el)}
                        </div>
                    )
                })
            }
        </div>
    )
} 