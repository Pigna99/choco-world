import React, { MouseEventHandler } from 'react'
import styles from './chocoList.module.css'
import { savedChoco } from '@/utils/interfaces'
import { Gender } from '@/utils/interfaces'
import { ChocoImage, GenderIcon } from '../../utilsComponents/icons'

function ChocoList({selectedChocoId, changeChoco, chocoArray}:{selectedChocoId:string|null, changeChoco:(id:string)=>MouseEventHandler ,chocoArray:savedChoco[]}) {
  return (
    <div className={styles.container}>
      {
        chocoArray.map((el)=>{
          return(
            <ListElement active={el.id===selectedChocoId} key={el.id} onClick={(e)=>{if(el.id!==selectedChocoId)changeChoco(el.id)(e)}}>
              <ChocoEntry info={el}/>
            </ListElement>
          )
        })
      }
      {
        chocoArray.length>=3 ? null:
        <ListElement active={selectedChocoId==='new'} onClick={(e)=>{if('new'!==selectedChocoId)changeChoco('new')(e)}}>
          <div className={styles.new}>new choco</div>
        </ListElement>
      }
      
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