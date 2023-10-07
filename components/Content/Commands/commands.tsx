
import styles from './commands.module.css'
import { MouseEventHandler } from "react"

export const Commands = ({feedCommand, petCommand, block, info}:{feedCommand:MouseEventHandler, petCommand:MouseEventHandler, block:boolean, info:string})=>{
    
    return(
        <div className={styles.container}>
            <div className={styles.infoText}>{info}</div>
            <div className={styles.buttonContainer}>
                <Button name={'Feed'} clickEvent={feedCommand} blocked={block}/>
                <Button name={'Pet'} clickEvent={petCommand} blocked={block}/>
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