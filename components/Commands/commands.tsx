
import styles from './commands.module.css'
import { MouseEventHandler } from "react"

export const Commands = ({feedCommand, petCommand}:{feedCommand:MouseEventHandler, petCommand:MouseEventHandler})=>{
    
    return(
        <div className={styles.container}>
            <Button name={'Feed'} clickEvent={feedCommand}/>
            <Button name={'Pet'} clickEvent={petCommand}/>
        </div>
    )
}


const Button = ({name, clickEvent} : {name: String, clickEvent: MouseEventHandler})=>{
    return(
        <button onClick={clickEvent} className={styles.button}>
            {name}
        </button>
    )
}