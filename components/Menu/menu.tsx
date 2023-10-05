import { menu } from '@/utils/frontend/utilsFrontend'
import styles from './menu.module.css'
import { MouseEventHandler } from 'react'

export const Menu = ({selectedMenu,setMenu}:{selectedMenu:menu,setMenu:(e:menu)=>MouseEventHandler})=>{
    return(
        <div className={styles.menu}>
            <MenuElement elementName='stats' selectedMenu={selectedMenu} setMenu={setMenu}/>
            <MenuElement elementName='actions' selectedMenu={selectedMenu} setMenu={setMenu}/>
            <MenuElement elementName='info' selectedMenu={selectedMenu} setMenu={setMenu} isRight/>
        </div>
    )
}

const MenuElement = ({elementName,selectedMenu,setMenu,isRight}:{elementName:menu,selectedMenu:menu,setMenu:(e:menu)=>MouseEventHandler, isRight?:boolean})=>{
    return(
        <div onClick={setMenu(elementName)}className={`${styles.element} ${elementName===selectedMenu ? styles.active : ''} ${isRight ? styles.right : ''}`}>
            <div className={styles.elementText}>{elementName}</div>
        </div>
    )
}