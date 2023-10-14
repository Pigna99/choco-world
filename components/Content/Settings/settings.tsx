import { Button } from '@/components/utilsComponents/buttons'
import styles from './settings.module.css'
import { MouseEventHandler, useState } from 'react'
import { useAppContext } from '@/components/context/appcontext'
import { useAudioContext } from '@/components/context/audiocontext'
import { useGlobalContext } from '@/components/context/globalcontext'

export const Settings = ()=>{
    const {removeActualCreature, creatureId} = useAppContext()
    const {toggleAudio, toggleMusic, musicSettings,audioSettings} = useAudioContext()
    const {isPreload, togglePreload, resetLocalStorageInfo}= useGlobalContext()
    return(
        <div className={styles.container}>
            <SettingToggler name='music' clickEvent={toggleMusic} active={musicSettings.isPlaying}/>
            <SettingToggler name='audio' clickEvent={toggleAudio} active={audioSettings.isPlaying}/>
            <SettingToggler name='preload' clickEvent={togglePreload} active={isPreload}/>
            {(creatureId!== '' && creatureId !== 'new') ? <SettingValidator name='remove this choco' clickEvent={removeActualCreature}/>:null}
            <SettingValidator name='delete all local data' clickEvent={resetLocalStorageInfo}/>
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