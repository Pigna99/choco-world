import { Button } from '@/components/utilsComponents/buttons'
import styles from './settings.module.css'
import { MouseEventHandler, useState } from 'react'
import useGlobalContext from '@/components/context'

export const Settings = ()=>{
    const {removeActualCreature, resetCreatureList, creatureId, toggleAudio} = useGlobalContext()
    
    return(
        <div className={styles.container}>
            <SettingValidator name='delete all local data' clickEvent={resetCreatureList}/>
            {(creatureId!== '' && creatureId !== 'new') ? <SettingValidator name='remove this choco' clickEvent={removeActualCreature}/>:null}
            <SettingValidator name='sound test' clickEvent={toggleAudio}/>
        </div>
    )
}

const SettingValidator = ({clickEvent,name}:{clickEvent:MouseEventHandler,name:string})=>{
    const [isOpen, setIsOpen] = useState(false);

    return(
        <div className={styles.validator}>
            {
                isOpen ?
                <div className={styles.validatorText}>
                    Are you sure?
                    <Button name='yes' clickEvent={clickEvent}/>
                    <Button name='no' clickEvent={()=>setIsOpen(false)}/>
                </div>
                : <Button name={name} clickEvent={()=>{setIsOpen(true)}} style={styles.settingButton}/>
            }
        </div>
    )
}