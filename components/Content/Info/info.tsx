import { Creature } from '@/utils/interfaces'
import styles from './info.module.css'

export const Info = ({infoBox}:{infoBox:Creature})=>{
    return(
        <div className={`${styles.infobox}`}>
            <div>{`Birthday: ${formatDate(new Date(infoBox.informations.birthday))}`}</div>
            <div>{`Times fed: ${infoBox.informations.feeds}`}</div>
            <div>{`Times petted: ${infoBox.informations.pets}`}</div>
            <div>{`Km done: ${infoBox.informations.steps}`}</div>
        </div>
    )
}

const formatDate=(d:Date)=>{
    return `${d.getMonth()+1}-${d.getDate()}-${d.getFullYear()}`
}