import { Creature , Stat} from '@/utils/interfaces'
import styles from './stats.module.css'
import { HAPPINESS_NAMES } from '@/utils/settings';
import { GenderIcon } from '../../utilsComponents/icons';



export const Stats = ({info}:{info:Creature})=>{
    return(
        <div className={styles.container}>
            <div className={styles.nameContainer}>
                <h4>{info.name}</h4>
                <GenderIcon gender={info.gender} dim={45}/>
            </div>
            <div className={styles.statName}>
                {`Level ${info.statictics.level}`}
            </div>
            <Stat s={info.statictics.stamina} name='Stamina' colored/>
            <Stat s={info.statictics.hunger} name='Hunger' colored/>
            <Stat s={info.statictics.happiness} name='Happiness' happiness colored/>
            <Stat s={info.statictics.experience} name='Exp'/>
        </div>
    )
}

const Stat = ({s, name, happiness, colored}:{s:Stat, name:string, happiness?:boolean, colored?:boolean})=>{
    return(
        <div className={styles.statContainer}>
            <div className={styles.statName}>
                {
                    name
                }
            </div>
            <div className={styles.statBar}>
                <StatBar s={s} colored={colored}>
                    <div className={styles.statValue}>
                    {
                        happiness ? HAPPINESS_NAMES[s.actual]:`${s.actual}/${s.max}`
                    }
                    </div>
                </StatBar>
            </div>
            
            
        </div>
    )
}

const StatBar = ({s, colored, children}:{s:Stat, colored?:boolean, children?:React.ReactNode})=>{
    let bar_color = 'lightblue'
    if(colored){
        let percentage = Math.round((s.actual/s.max)*100)
        if(percentage<=25) bar_color ='red'
        else if (25<percentage && percentage<=50) bar_color = 'yellow'
        else if (50<percentage && percentage<=75) bar_color = 'lightgreen'
        else bar_color = 'green'
    }
    return(
        <div style={{width:'100%', height:15, backgroundColor:'gray'}} >
            <div style={{width:`${(s.actual/s.max)*100}%`,height:'100%', backgroundColor:bar_color}}>  
            </div>
            {children}
        </div>
    )
}