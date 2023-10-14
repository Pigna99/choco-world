import styles from './box-content.module.css'
import { Screen } from './Screen/screen-content'
import { useState, useEffect } from 'react'
import { Menu } from './Menu/menu'
import { LoadingSpinner } from './utilsComponents/loading'
import { Content } from './Content/content'
import { useAppContext } from './context/appcontext'
import LoadingScreen from './StartingMenu/starting-menu'
import { useScreenContext } from './context/screencontext'



export const Box = () => {
    const {isFetching} = useAppContext()
    const {isPlayingAnimation} = useScreenContext()
    //window size
    const [windowSize, setWindowSize] = useState([
        500,
        500,
    ]);

    useEffect(() => {
        const handleWindowResize = () => {//set a max width
            setWindowSize([window.innerWidth <= 500 ? window.innerWidth : 500, window.innerHeight <= 1000 ? window.innerHeight:1000] );
        };

        window.addEventListener('resize', handleWindowResize);
        setWindowSize([window.innerWidth <= 500 ? window.innerWidth : 500, window.innerHeight <= 1000 ? window.innerHeight:1000]);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);
    return (
        <div className={styles.box}>
            <LoadingSpinner visible={isFetching || isPlayingAnimation}/>
            <LoadingScreen/>
            <Screen width={windowSize[0]+"px"} />
            <Content/>
            <Menu/>
        </div>
    )
}