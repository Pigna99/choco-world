import { MouseEventHandler } from "react"
import styles from './utils.module.css'

const Button = ({name, clickEvent, blocked} : {name: String, clickEvent: MouseEventHandler, blocked?:boolean})=>{
    return(
        <button onClick={clickEvent} className={`${styles.button} ${blocked ? styles.blocked : ""}`}>
            {name}
        </button>
    )
}

export {Button}