
import styles from './commands.module.css'
import { MouseEventHandler, MouseEvent } from "react"
import { creatureName } from '@/utils/settings'


const buttonHandler = async (e:MouseEvent)=>{
    console.log("Button Pressed")
    const res = await fetch(`/api/update?name=${creatureName}`)
    const data = await res.json()
    console.log("Data received from API:", data)
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