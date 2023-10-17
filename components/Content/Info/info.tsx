import { Creature } from '@/utils/interfaces'
import styles from './info.module.css'

export const Info = ({infoBox,creatureId}:{infoBox:Creature,creatureId:string|null})=>{
    return(
        <div className={`${styles.infobox}`}>
            <div>{`Birthday: ${formatDate(new Date(infoBox.informations.birthday))}`}</div>
            <div>{`Times fed: ${infoBox.informations.feeds}`}</div>
            <div>{`Times petted: ${infoBox.informations.pets}`}</div>
            <div>{`Km done: ${infoBox.informations.steps}`}</div>
            <div>{`Enemies defeated: ${infoBox.informations.enemies}`}</div>
            <div><span style={{fontSize:15}}>id:<span className={styles.copy} onClick={()=>{creatureId? copyId(creatureId):null}}>{creatureId}</span></span></div>
        </div>
    )
}

const copyId = (id:string)=>{
    navigator.clipboard.writeText(id);
}

const formatDate=(d:Date)=>{
    return `${d.getMonth()+1}-${d.getDate()}-${d.getFullYear()}`
}