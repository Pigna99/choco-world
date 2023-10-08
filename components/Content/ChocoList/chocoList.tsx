import React, { MouseEventHandler } from 'react'
import styles from './chocoList.module.css'
import { savedChoco } from '@/utils/interfaces'
import { Gender } from '@/utils/interfaces'

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
      <ChocoImage color={info.color}/>
      <ChocoInfo name={info.name} gender={info.gender}/>
  </>)
}

const ChocoInfo = ({name,gender}:{name:string, gender:Gender})=>{
  return (
    <div className={styles.info}>
      <div className={styles.name}>{name}</div>
      <div className={styles.gender}>{gender}</div>
    </div>
  )
}

const ChocoImage = ({color}:{color:string})=>{
  return(
    <div className={styles.imageContainer}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 105" shapeRendering="crispEdges"  height={'70px'} style={{display:'flex'}}>
      <path stroke={color} d="M36 0h12M36 1h12M36 2h12M36 3h12M36 4h12M36 5h12M36 6h6M48 6h6M36 7h6M48 7h6M36 8h6M48 8h6M36 9h6M48 9h6M36 10h6M48 10h6M36 11h6M48 11h6M24 12h12M48 12h6M24 13h12M48 13h6M24 14h12M48 14h6M24 15h12M48 15h6M24 16h12M48 16h6M24 17h12M48 17h6M18 18h6M42 18h12M18 19h6M42 19h12M18 20h6M42 20h12M18 21h6M42 21h12M18 22h6M42 22h12M18 23h6M42 23h12M12 24h6M48 24h6M12 25h6M48 25h6M12 26h6M48 26h6M12 27h6M48 27h6M12 28h6M48 28h6M12 29h6M48 29h6M6 30h6M18 30h6M42 30h6M54 30h6M6 31h6M18 31h6M42 31h6M54 31h6M6 32h6M18 32h6M42 32h6M54 32h6M6 33h6M18 33h6M42 33h6M54 33h6M6 34h6M18 34h6M42 34h6M54 34h6M6 35h6M18 35h6M42 35h6M54 35h6M6 36h6M18 36h6M42 36h6M54 36h6M6 37h6M18 37h6M42 37h6M54 37h6M6 38h6M18 38h6M42 38h6M54 38h6M6 39h6M18 39h6M42 39h6M54 39h6M6 40h6M18 40h6M42 40h6M54 40h6M6 41h6M18 41h6M42 41h6M54 41h6M6 42h6M54 42h6M6 43h6M54 43h6M6 44h6M54 44h6M6 45h6M54 45h6M6 46h6M54 46h6M6 47h6M54 47h6M12 48h12M42 48h12M12 49h12M42 49h12M12 50h12M42 50h12M12 51h12M42 51h12M12 52h12M42 52h12M12 53h12M42 53h12M18 54h12M36 54h12M18 55h12M36 55h12M18 56h12M36 56h12M18 57h12M36 57h12M18 58h12M36 58h12M18 59h12M36 59h12M12 60h12M30 60h6M42 60h12M12 61h12M30 61h6M42 61h12M12 62h12M30 62h6M42 62h12M12 63h12M30 63h6M42 63h12M12 64h12M30 64h6M42 64h12M12 65h12M30 65h6M42 65h12M6 66h6M54 66h6M6 67h6M54 67h6M6 68h6M54 68h6M6 69h6M54 69h6M6 70h6M54 70h6M6 71h6M54 71h6M0 72h6M60 72h6M0 73h6M60 73h6M0 74h6M60 74h6M0 75h6M60 75h6M0 76h6M60 76h6M0 77h6M60 77h6M0 78h12M18 78h6M42 78h6M54 78h12M0 79h12M18 79h6M42 79h6M54 79h12M0 80h12M18 80h6M42 80h6M54 80h12M0 81h12M18 81h6M42 81h6M54 81h12M0 82h12M18 82h6M42 82h6M54 82h12M0 83h12M18 83h6M42 83h6M54 83h12M0 84h12M18 84h6M42 84h6M54 84h12M0 85h12M18 85h6M42 85h6M54 85h12M0 86h12M18 86h6M42 86h6M54 86h12M0 87h12M18 87h6M42 87h6M54 87h12M0 88h12M18 88h6M42 88h6M54 88h12M0 89h12M18 89h6M42 89h6M54 89h12M6 90h18M42 90h18M6 91h18M42 91h18M6 92h18M42 92h18M6 93h18M42 93h18M6 94h18M42 94h18M6 95h18M42 95h18M12 96h6M24 96h18M48 96h6M12 97h6M24 97h18M48 97h6M12 98h6M24 98h18M48 98h6M12 99h6M24 99h18M48 99h6M12 100h6M24 100h18M48 100h6M12 101h6M24 101h18M48 101h6M12 102h6M48 102h6M12 103h6M48 103h6M12 104h6M48 104h6M12 105h6M48 105h6M12 106h6M48 106h6M12 107h6M48 107h6" />
    </svg>
    </div>
  )
}


export default ChocoList