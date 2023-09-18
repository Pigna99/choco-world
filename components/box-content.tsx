import styles from './box-content.module.css'
import { Commands } from './Commands/commands'
import { Info } from './Info/info'
import { Screen } from './Screen/screen-content'

export const Box = ()=>{

    return(
    <div className={styles.box}>
        <h1 className={styles.title}>Choco World</h1>
        <Info/>
        <hr className={styles.hr}/>
        <Screen/>
        <hr className={styles.hr}/>
        <Commands/>
    </div>
    )
}