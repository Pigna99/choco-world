import Sprite from "../Screen/Sprite/Sprite"
import loading from '../Screen/Sprite/Other/loading'
import styles from './utils.module.css'
import { useEffect, useState } from "react"



const LoadingSpinner = ({visible}:{visible:boolean})=>{
    return(
        <div className={styles.loading}>
            {
                visible ? <Loading/>: <div style={{height:10}}/>
            }
        </div>
    )
}

const Loading = () =>{
    return <Sprite fps={18} framesArray={loading} color={''} width={"100%"} height={"10px"} loop/>
}

const LoadingScreen = ({ isLoading}: { isLoading:boolean}) => {
    const [disable, setDisable] = useState(false);
    useEffect(() => {
        setTimeout(()=>setDisable(true), 1000)
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