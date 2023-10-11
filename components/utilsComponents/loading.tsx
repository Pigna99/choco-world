import Sprite from "../Screen/Sprite/Sprite"
import loading from '../Screen/Sprite/Other/loading'
import styles from './utils.module.css'



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
    return (
        <div className={`${styles.loadingScreen} ${isLoading? '' : styles.loaded}` }>
            <div>loading...</div>
           <Sprite fps={18} framesArray={loading} color={''} width={"50%"} height={"10px"} loop/>
        </div>
    )
}

export {LoadingScreen, LoadingSpinner}