
import styles from './commands.module.css'
import { MouseEventHandler, MouseEvent } from "react"

const buttonHandler = (e:MouseEvent):void=>{
    console.log("test")
}

export const Commands = ({testCommand}:{testCommand:MouseEventHandler})=>{
    
    return(
        <div className={styles.container}>
            <Button name={'Feed'} clickEvent={testCommand}/>
            <Button name={'Pet'} clickEvent={buttonHandler}/>
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