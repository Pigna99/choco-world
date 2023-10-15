import { Button } from '@/components/utilsComponents/buttons'
import styles from './settings.module.css'
import { MouseEventHandler, useState } from 'react'
import { useGlobalContext } from '@/components/context/globalcontext'

export const Settings = ()=>{
    const {localInfo, toggleSetting, resetLocalInfo, removeActualCreature}= useGlobalContext()
    return(
        <div className={styles.container}>
            <SettingToggler name='music' clickEvent={()=>toggleSetting('music')} active={localInfo.settings.music}/>
            <SettingToggler name='audio' clickEvent={()=>toggleSetting('audio')} active={localInfo.settings.audio}/>
            <SettingToggler name='preload' clickEvent={()=>toggleSetting('preload')} active={localInfo.settings.preload}/>
            {(localInfo.last_choco!== '' && localInfo.last_choco !== 'new') ? <SettingValidator name='remove this choco' clickEvent={removeActualCreature}/>:null}
            <SettingValidator name='delete all local data' clickEvent={resetLocalInfo}/>
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