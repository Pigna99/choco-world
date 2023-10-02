
import styles from './commands.module.css'
import { MouseEventHandler } from "react"

export const Commands = ({feedCommand, petCommand, blockCommand}:{feedCommand:MouseEventHandler, petCommand:MouseEventHandler, blockCommand:boolean})=>{
    
    return(
        <div className={styles.container}>
            <Button name={'Feed'} clickEvent={feedCommand} blocked={blockCommand}/>
            <Button name={'Pet'} clickEvent={petCommand} blocked={blockCommand}/>
        </div>
    )
}


const Button = ({name, clickEvent, blocked} : {name: String, clickEvent: MouseEventHandler, blocked:boolean})=>{
    return(
        <button onClick={clickEvent} className={`${styles.button} ${blocked ? styles.blocked : ""}`}>
            {name}
        </button>
    )
}