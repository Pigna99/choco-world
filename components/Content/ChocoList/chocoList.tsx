import React, { MouseEventHandler } from 'react'
import styles from './chocoList.module.css'
import { savedChoco } from '@/utils/interfaces'
import { Gender } from '@/utils/interfaces'
import { ChocoImage, GenderIcon } from '../icons'

function ChocoList({selectedChocoId, changeChoco}:{selectedChocoId:string|null, changeChoco:(id:string)=>void}) {
  const testChoco1:savedChoco={
    name: 'Pigna',
    color: '#aaa000',
    gender: 'male',
    id: '65193d0fd0780be48381e964'
  }
  const testChoco2:savedChoco={
    name: 'Villano',
    color: '#f00000',
    gender: 'male',
    id: '6522807f982f72aa57f7daed'
  }
  const list = [testChoco1,testChoco2]

  return (
    <div className={styles.container}>
      {
        list.map((el)=>{
          return(
            <ListElement active={el.id===selectedChocoId} key={el.id} onClick={()=>{if(el.id!==selectedChocoId)changeChoco(el.id)}}>
              <ChocoEntry info={el}/>
            </ListElement>
          )
        })
      }
      <ListElement active={selectedChocoId==='new'} onClick={()=>{if('new'!==selectedChocoId)changeChoco('new')}}>
        <div className={styles.new}>new choco</div>
      </ListElement>
    </div>
  )
}

const ListElement = ({children, active,onClick}:{children:React.ReactNode,active?:boolean,onClick:MouseEventHandler})=>{
  return(
    <div className={`${styles.element} ${active?styles.active:''}`} onClick={onClick}>
      {children}
    </div>
  )
}

const ChocoEntry = ({info}:{info:savedChoco})=>{
  return(
  <>
      <div className={styles.imageContainer}><ChocoImage color={info.color}/></div>
      <ChocoInfo name={info.name} gender={info.gender}/>
  </>)
}

const ChocoInfo = ({name,gender}:{name:string, gender:Gender})=>{
  return (
    <div className={styles.info}>
      <div className={styles.name}>{name}</div>
      <div className={styles.gender}><GenderIcon gender={gender} dim={70}/></div>
    </div>
  )
}


export default ChocoList