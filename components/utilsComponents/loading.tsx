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

const LoadingScreen = ({ isLoading}: { isLoading:boolean}) => {
    const [disable, setDisable] = useState(false);
    useEffect(() => {
        if(!isLoading)setTimeout(()=>setDisable(true), 500)
    }, [isLoading])//disable this animation after 1 second
    
    return (
        <div className={`${styles.loadingScreen} ${isLoading? '' : styles.loaded}` }>
            <div>loading...</div>
           {
                disable ? null :  <Sprite fps={18} framesArray={loading} color={''} width={"50%"} height={"10px"} loop/>
           }
            
        </div>
    )
}

export {LoadingScreen, LoadingSpinner}