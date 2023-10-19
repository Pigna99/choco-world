
import { Button } from '@/components/utilsComponents/buttons'
import styles from './commands.module.css'
import { MouseEventHandler, useEffect, useState } from "react"
import { useFetchContext } from '@/components/context/fetchcontext'

export const Commands = ({feedCommand, petCommand, block, info}:{feedCommand:MouseEventHandler, petCommand:MouseEventHandler, block:boolean, info:string})=>{
    const {creatureInfo} = useFetchContext()
    const [isInteraction, setIsInteraction] = useState(false);
    const [lastInteractionTime, setLastInteractionTime] = useState('>1 minute ago');

    useEffect(() => {
        updateInteractionText()
        setTimeout(()=>setIsInteraction(!isInteraction),30000)
    }, [isInteraction])

    useEffect(()=>{
        updateInteractionText()
    },[creatureInfo])

    const updateInteractionText= ()=>{
        const earlier_interaction = creatureInfo.last_time_feed>creatureInfo.last_time_pet ? creatureInfo.last_time_feed : creatureInfo.last_time_pet
        setLastInteractionTime(calculateLastInteractionTime(new Date(earlier_interaction)))
    }
    const calculateLastInteractionTime = (last:Date):string=>{
        const time = Date.now() - last.getTime();
        let number = 0;
        if(time>86400000){
            number = Math.floor(time/86400000)
            if(number===1){
                return `1 day ago`
            }
            return `${number} days ago`
        }
        if(time>3600000){
            number = Math.floor(time/3600000)
            if(number===1){
                return `1 hour ago`
            }
            return `${number} hours ago`
        }
        if(time>60000){
            number = Math.floor(time/60000)
            if(number===1){
                return `1 minute ago`
            }
            return `${number} minutes ago`
        }

        return `>1 minute ago`
    }
    
    return(
        <div className={styles.container}>
            <div className={styles.infoText}>{`${creatureInfo.name} ${info}`}</div>
            <div className={styles.interactionText}>last interaction: {lastInteractionTime}</div>
            <div className={styles.buttonContainer}>
                <Button name={'Feed'} clickEvent={feedCommand} blocked={block}/>
                <Button name={'Pet'} clickEvent={petCommand} blocked={block}/>
            </div>
        </div>
    )
}


