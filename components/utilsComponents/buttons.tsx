import { MouseEventHandler } from "react"
import styles from './utils.module.css'

const Button = ({name, clickEvent, blocked, style} : {name: String, clickEvent: MouseEventHandler, blocked?:boolean, style?:string})=>{
    return(
        <button onClick={clickEvent} className={`${style?style:styles.button} ${blocked ? styles.blocked : ""}`}>
            {name}
        </button>
    )
}

export {Button}