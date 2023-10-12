import styles from './box-content.module.css'
import { Screen } from './Screen/screen-content'
import { useState, useEffect } from 'react'
import { Menu } from './Menu/menu'
import { LoadingScreen, LoadingSpinner } from './utilsComponents/loading'
import { Content } from './Content/content'
import useGlobalContext from './context'
import ReactHowler from 'react-howler'


export const Box = () => {
    const {isFirstLoading, isFetching, isPlayingAnimation, isAudioPlaying} = useGlobalContext()

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
            <LoadingScreen isLoading={isFirstLoading}/>
            <Screen width={windowSize[0]+"px"} />
            <Content/>
            <Menu/>
            <ReactHowler src={'/music/chocotheme.mp3'} playing={isAudioPlaying}/>
        </div>
    )
}