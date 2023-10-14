import { Button } from '@/components/utilsComponents/buttons'
import styles from './settings.module.css'
import { MouseEventHandler, useState } from 'react'
import useGlobalContext from '@/components/context'

export const Settings = ()=>{
    const {removeActualCreature, resetCreatureList, creatureId, toggleMusic, musicSettings,toggleAudio,audioSettings, isPreload, togglePreload} = useGlobalContext()
    
    return(
        <div className={styles.container}>
            <SettingValidator name='delete all local data' clickEvent={resetCreatureList}/>
            {(creatureId!== '' && creatureId !== 'new') ? <SettingValidator name='remove this choco' clickEvent={removeActualCreature}/>:null}
            <SettingToggler name='preload' clickEvent={togglePreload} active={isPreload}/>
            <SettingToggler name='music' clickEvent={toggleMusic} active={musicSettings.isPlaying}/>
            <SettingToggler name='audio' clickEvent={toggleAudio} active={audioSettings.isPlaying}/>
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

const SettingToggler = ({clickEvent,name, active}:{clickEvent:MouseEventHandler,name:string, active:boolean})=>{
    return (
        <div className={styles.toggler} onClick={clickEvent}>
            
            <div>{name+':'}</div>
            {
                active ? <span>{'<on>'}</span> : <span>{'on'}</span>
            }
            {
                active ? <span>{'off'}</span> : <span>{'<off>'}</span>
            }
        </div>
    )
}