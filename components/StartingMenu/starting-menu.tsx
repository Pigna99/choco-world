import { useEffect, useState } from "react";
import styles from './startingmenu.module.css'
import useGlobalContext from "../context";
import { Button } from "../utilsComponents/buttons";

const LoadingScreen = () => {
    const {isFirstLoading} = useGlobalContext()
    
    return (
        <div className={`${styles.loadingScreen} ${ isFirstLoading ? '': styles.loaded}` }>
            <LoadingMenu/>
        </div>
    )
}

const LoadingMenu = () =>{
    const {loadingInfo, playButton, isPreload, isFirstLoading} = useGlobalContext()
    return(
        <div className={styles.loadingMenu}>
            <h3>Choco World</h3>
            <div className={styles.loadingContent}>
                <div className={styles.loadingInfo}>{loadingInfo.name}</div>
                <LoadingBar percentage={loadingInfo.percentage}/>
                <div className={styles.confirmButton}>
                    <Button name='play' clickEvent={(e)=>{if(loadingInfo.name==='complete')playButton(e)}}
                        blocked={loadingInfo.name!=='complete'}
                    />
                </div>
            </div>
            
            {
                !isPreload&&loadingInfo.name==='complete'  ? <div className={styles.loadingAdvice}> 
                    enable preloading local files in the settings menu for better performance
                </div> : <div className={styles.loadingAdvice}/>
            }
        </div>
    )
}

const LoadingBar = ({percentage}:{percentage:number})=>{
    return(
        <div className={styles.loadingborder}>
            <div className={styles.loadingcontent} style={{width:percentage+"%"}}/>
        </div>
    )
}

export default LoadingScreen