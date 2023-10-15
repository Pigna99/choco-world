import { creatureMenuList, newMenuList } from '@/utils/frontend/utilsFrontend'
import styles from './menu.module.css'
import { MouseEventHandler } from 'react'
import { useMenuContext } from '../context/menucontext'

export const Menu = ()=>{
    const {selectedMenu, cycleMenu} = useMenuContext()
    return(
        <div className={styles.menu}>
            <MenuArrow reverse cycleMenu={cycleMenu(true)}/>
            <MenuElement selectedMenu={selectedMenu.list[1]} menuName={selectedMenu.name}/>
            <MenuArrow isRight cycleMenu={cycleMenu(false)}/>
        </div>
    )
}

const MenuElement = ({selectedMenu, menuName}:{selectedMenu:number,menuName:string|null})=>{
    return(
        <div className={`${styles.element} ${styles.active}`}>
            <div className={styles.elementText}>{menuName==='new' ?newMenuList[selectedMenu]:creatureMenuList[selectedMenu]}</div>
        </div>
    )
}

const MenuArrow = ({reverse, isRight, cycleMenu}:{reverse?:boolean, isRight?:boolean, cycleMenu:MouseEventHandler})=>{
    return(
        <div className={`${styles.element} ${styles.arrow} ${isRight ? styles.right : ''}`} onClick={cycleMenu}>
            <svg className={`${reverse ? styles.reverse : undefined}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54 54" shapeRendering="crispEdges" height={"40px"} width={"100%"} style={{display:'flex'}}>
                <path stroke="#000000" d="M24 0h6M24 1h6M24 2h6M24 3h6M24 4h6M24 5h6M24 6h12M24 7h12M24 8h12M24 9h12M24 10h12M24 11h12M24 12h18M24 13h18M24 14h18M24 15h18M24 16h18M24 17h18M0 18h48M0 19h48M0 20h48M0 21h48M0 22h48M0 23h48M0 24h54M0 25h54M0 26h54M0 27h54M0 28h54M0 29h54M0 30h48M0 31h48M0 32h48M0 33h48M0 34h48M0 35h48M24 36h18M24 37h18M24 38h18M24 39h18M24 40h18M24 41h18M24 42h12M24 43h12M24 44h12M24 45h12M24 46h12M24 47h12M24 48h6M24 49h6M24 50h6M24 51h6M24 52h6M24 53h6" />
            </svg>
        </div>
    )
}