
import { Button } from '@/components/utilsComponents/buttons'
import styles from './commands.module.css'
import { MouseEventHandler } from "react"
import { useFetchContext } from '@/components/context/fetchcontext'

export const Commands = ({feedCommand, petCommand, block, info}:{feedCommand:MouseEventHandler, petCommand:MouseEventHandler, block:boolean, info:string})=>{
    const {creatureInfo} = useFetchContext()
    return(
        <div className={styles.container}>
            <div className={styles.infoText}>{`${creatureInfo.name} ${info}`}</div>
            <div className={styles.buttonContainer}>
                <Button name={'Feed'} clickEvent={feedCommand} blocked={block}/>
                <Button name={'Pet'} clickEvent={petCommand} blocked={block}/>
            </div>
        </div>
    )
}


