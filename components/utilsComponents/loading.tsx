import Sprite from "../Screen/Sprite/Sprite"
import loading from '../Screen/Sprite/Other/loading'
import styles from './utils.module.css'
import { useEffect, useState } from "react"



const LoadingSpinner = ({visible}:{visible:boolean})=>{
    return(
        <div className={styles.loading}>
            <div className={styles.loadingContainer}>
            {
                visible ? <Loading/>: <div style={{height:10}}/>
            }
            </div>
        </div>
    )
}

const Loading = () =>{
    return <Sprite fps={18} framesArray={loading} color={'#000000'} width={"100%"} height={"10px"} loop/>
}


export {LoadingSpinner}