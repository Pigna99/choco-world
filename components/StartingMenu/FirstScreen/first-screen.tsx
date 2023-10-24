import { useGlobalContext } from '@/components/context/globalcontext';
import React, { useEffect, useState } from 'react'
import styles from '../startingmenu.module.css'
import Sprite from '@/components/Screen/Sprite/Sprite';
import getSprite from '@/components/Screen/Sprite/spriteUtils';
import { Button } from '@/components/utilsComponents/buttons';
import { SettingToggler } from '@/components/Content/Settings/settings';

type startMenu = 'loading'|'welcome' | 'data' | 'settings';

function FirstScreen() {
    const {localInfo} = useGlobalContext()
    const [page,setPage] = useState<startMenu>('loading');

    const changePage = (s:startMenu)=>{
        setPage(s)
    }

    useEffect(() => {
      if(localInfo.settings.first_time)setPage('welcome')
    }, [localInfo.settings.first_time])
    
    return (
        <div className={styles.loadingScreen}>
            {
                page === 'loading' ? <LoadingPage/> :
                page === 'welcome' ? <WelcomePage changePage={changePage}/> :
                page === 'data' ? <DataPolicies changePage={changePage}/> :
                page === 'settings' ? <FirstSettings changePage={changePage}/> :
                <LoadingPage/>
            }
        </div>
    )
}

function FirstSettings({changePage}:{changePage:(s:startMenu)=>void}){
    const {localInfo, toggleSetting} = useGlobalContext()
    return (
    <div className={styles.firstMenu}>
        <h4>Settings</h4>
        <p className={styles.menuText}>Initial settings configuration!</p>
        <div className={styles.settingBox}>
            <div className={styles.menuText}>Preload all static files in local storage. Instead of loading all data every time, just store it one time on your device!</div>
            <SettingToggler name='Preload' clickEvent={()=>{toggleSetting('preload')}} active={localInfo.settings.preload}/>
            <div className={styles.menuText}>Activate Music!</div>
            <SettingToggler name='Music' clickEvent={()=>{toggleSetting('music')}} active={localInfo.settings.music}/>
            <div className={styles.menuText}>Activate Audio effects!</div>
            <SettingToggler name='Audio' clickEvent={()=>{toggleSetting('audio')}} active={localInfo.settings.audio}/>
        </div>
        <p className={styles.menuText}>You can change settings any moment from the game.</p>
        <div className={styles.startMenuButton}>
            <Button name='back' clickEvent={()=>{changePage('data')}}/>
            <Button name='start' clickEvent={()=>{toggleSetting('first_time')}}/>
        </div>   
    </div>
    )
}

function DataPolicies({changePage}:{changePage:(s:startMenu)=>void}){
    return (
    <div className={styles.firstMenu}>
        <h4>Data Policy</h4>
        <p className={styles.menuText}>
            This app will not collect any data aside from the infos for the creation of a choco. All others data are anonymous and will be stored on your local memory. You can delete all the data in any moment.
        </p>
        <p className={styles.menuText}>
            All others data are anonymous and will be stored on your local memory.
        </p>
        <p className={styles.menuText}>
           You can delete all the data in any moment.
        </p>
        <div className={styles.startMenuButton}>
            <Button name='back' clickEvent={()=>{changePage('welcome')}}/>
            <Button name='confirm' clickEvent={()=>{changePage('settings')}}/>
        </div>        
    </div>
    )
}

function WelcomePage({changePage}:{changePage:(s:startMenu)=>void}) {
    return (
    <div className={styles.firstMenu}>
        <h4>Welcome to</h4>
        <h3>Choco World</h3>
        <p className={styles.menuText}>Choco World is a tamagochi-like game inspired by Chocobo World from Final Fantasy 8.</p>
        <Sprite fps={6} framesArray={getSprite('walk-icon').sprite} color={'#000000'} color2={'#000000'} width={'200px'} height={'200px'} loop/>
        <p className={styles.menuText}>In Choco World, you can raise your choco! Choco will get exp and levels walking around, and fighting monsters! (from level 10)</p>
        <div className={styles.startMenuButton}>
            <Button name='continue' clickEvent={()=>{changePage('data')}}/>
        </div>
    </div>)
}

function LoadingPage() {
    return <div>loading</div>
}


export default FirstScreen