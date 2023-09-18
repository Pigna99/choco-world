import { MouseEventHandler, useState , MouseEvent} from 'react'
import styles from './screen-content.module.css'
import Image from 'next/image'





export const Screen = ({sprite}:{sprite:string})=>{
    const [isInfo, setInfo] = useState(false);

    const handleInfoButton = (e:MouseEvent):void =>{
        setInfo(!isInfo);
    }
    return(
        <div className={styles.screen}>
            <Image
                src={`/images/sprites/${sprite}.gif`}
                width={200}
                height={200}
                alt='Main screen sprites'
            />
            <InfoButton handleClick={handleInfoButton}/>
            <InfoBox isVisible={isInfo}/>
        </div>
    )
}

const InfoButton = ({handleClick}:{handleClick:MouseEventHandler}) =>{
    return(
        <div className={styles.infobtn} onClick={handleClick}>
            i
        </div>
    )
}
const InfoBox = ({isVisible}:{isVisible:boolean})=>{
    return(
        <div className={`${styles.infobox} ${isVisible? styles.infoboxvisible : styles.infoboxhidden}`}>
            Infobox
        </div>
    )
}