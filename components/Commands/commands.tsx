
import styles from './commands.module.css'
import { MouseEventHandler } from "react"

export const Commands = ({feedCommand, petCommand, blockCommand, info}:{feedCommand:MouseEventHandler, petCommand:MouseEventHandler, blockCommand:boolean, info:string})=>{
    
    return(
        <div className={styles.container}>
            <div className={styles.infoText}>{info}</div>
            <div className={styles.buttonContainer}>
                <Button name={'Feed'} clickEvent={feedCommand} blocked={blockCommand}/>
                <Button name={'Pet'} clickEvent={petCommand} blocked={blockCommand}/>
            </div>
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