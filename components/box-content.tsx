import { TICK_VALUE } from '@/utils/settings'
import styles from './box-content.module.css'
import { Screen } from './Screen/screen-content'
import { useState, MouseEvent, useEffect } from 'react'
import { API_string, chocoMenuList, frontend_info, getRange, newMenuList, precalcFeed, precalcPet, spritesList } from '@/utils/frontend/utilsFrontend'
import { Creature, Gender, VisualState, savedChoco } from '@/utils/interfaces'
import { VisualCreatureClass } from '@/utils/frontend/VisualCreatureClass'
import { Menu } from './Menu/menu'
import { LoadingScreen, LoadingSpinner } from './utilsComponents/loading'

import { Content } from './Content/content'
import useGlobalContext from './context'


export const Box = () => {
    const {isFirstLoading, isFetching, isPlayingAnimation} = useGlobalContext()


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
            <LoadingScreen isLoading={isFirstLoading}/>
            <Screen width={windowSize[0]+"px"} />
            <LoadingSpinner visible={isFetching || isPlayingAnimation}/>
            <Content />
            <Menu/>
        </div>
    )
}