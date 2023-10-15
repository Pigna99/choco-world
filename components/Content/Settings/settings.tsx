import { Button } from '@/components/utilsComponents/buttons'
import styles from './settings.module.css'
import { MouseEventHandler, useState } from 'react'
import { useGlobalContext } from '@/components/context/globalcontext'
import { useAppContext } from '@/components/context/appcontext'

export const Settings = ()=>{
    const {localInfo}= useGlobalContext()
    const {toggleAudioACTION, toggleMusicACTION, togglePreloadACTION, clearDataACTION, removeActualCreatureACTION} = useAppContext()
    return(
        <div className={styles.container}>
            <SettingToggler name='music' clickEvent={toggleMusicACTION} active={localInfo.settings.music}/>
            <SettingToggler name='audio' clickEvent={toggleAudioACTION} active={localInfo.settings.audio}/>
            <SettingToggler name='preload' clickEvent={togglePreloadACTION} active={localInfo.settings.preload}/>
            {(localInfo.last_choco!== '' && localInfo.last_choco !== 'new') ? <SettingValidator name='remove this choco' clickEvent={removeActualCreatureACTION}/>:null}
            <SettingValidator name='delete all local data' clickEvent={clearDataACTION}/>
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