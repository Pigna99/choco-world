'use client'
import Sprite from '@/components/Screen/Sprite/Sprite';
import getSprite from '@/components/Screen/Sprite/spriteUtils';
import { State, savedChoco } from '@/utils/interfaces';
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import { spritesList } from '@/utils/frontend/utilsFrontend';

function Test() {
    const [clist, setClist] = useState<savedChoco[]>([]);
    const getCreatures = async ()=>{
        const res = await fetch('/api/');
        const data = await res.json()
        if(!data)return;
        //console.log(data)
        let list:savedChoco[]= []
        for(let i = 0; i<data.routes_list.length; i++){
            const res2 = await fetch(`/api/check?id=${data.routes_list[i]}`,{ method: 'POST' });
            const data2 = await res2.json()
            list = [...list, data2.savedCreature]
            setClist(list)
        }
    }
    const getSpriteName = (s:State):spritesList=>{
        switch (s) {
            case 'walking':
                return 'walk-icon'
            case 'sleeping':
                return 'sleep-icon'
            default:
                return 'stand-icon'
        }
    }

    useEffect(() => {
      getCreatures()
    }, [])
    
    return (
        <div style={{height:'100%'}}>
            <div style={{zIndex:-1, backgroundColor:'white', display:'flex', flexFlow:'row wrap', width:'100%', height:'100%', justifyContent:'center', alignItems:'start',alignContent:'flex-start', overflow:'hidden',position:'absolute', top:0}}>
                {
                    clist.map(el=>{
                        return(
                            <div key={'test-'+el.id} style={{color:'white', display:'flex',margin:'-23px' }}>
                                <Sprite fps={6} framesArray={getSprite(getSpriteName(el.state)).sprite} color={el.color} color2={''} width={'150px'} height={'150px'} loop/>
                            </div>
                        )
                    })
                }
            </div>
            <div className={styles.content}>
                Choco World
            </div>
        </div>
    )
}

export default Test