import { Button } from '@/components/utilsComponents/buttons'
import styles from './settings.module.css'
import { MouseEventHandler } from 'react'

export const Settings = ({deleteAll}:{deleteAll:MouseEventHandler})=>{
    return(
        <div className={``}>
            <Button name='delete data' clickEvent={deleteAll}/>
        </div>
    )
}