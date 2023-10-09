import React, { MouseEventHandler, useEffect, useState } from 'react'
import styles from './newChoco.module.css'
import {Input, ColorInput} from '@/components/utilsComponents/input'
import { GenderIcon } from '@/components/utilsComponents/icons'
import { Button } from '@/components/utilsComponents/buttons'
import { Gender } from '@/utils/interfaces'


function NewChoco({newChoco, clicks}:{clicks:number, newChoco:(name:string,color:string,gender:Gender)=>void}) {
  const [text, setText] = useState('')
  const [color, setColor] = useState('#000000')
  const [gender, setGender] = useState<Gender>('male')
  const [clicksNeeded, setClicksNeeded] = useState(clicks+10);
  
  useEffect(() => {
    //console.log(clicks, clicksNeeded)
    if(clicksNeeded===clicks){
      newChoco(text,color,gender)
    }
  }, [clicksNeeded, clicks])
  
  return (
    <div className={styles.container}>
      <h5>name:</h5>
      <Input text={text} setText={setText} id='choconame' fontSize={25}/>
      <h5>color:</h5>
      <ColorInput color={color} setColor={setColor} id='chococolor'/>
      <h5>gender:</h5>
      <div className={styles.genderContainer}>
        <SelectedItem selected={gender==='male'} onClick={(e)=>{gender!=='male'?setGender('male'):null}}><GenderIcon gender='male' dim={100}/></SelectedItem>
        <SelectedItem selected={gender==='female'} onClick={(e)=>{gender!=='female'?setGender('female'):null}}><GenderIcon gender='female' dim={100}/></SelectedItem>
      </div>
      <div style={{fontSize:20, margin:10}}>Click on the egg to make it hatch!</div>
      {
        /*
          <div className={styles.buttonContainer}>
          <Button name='confirm' clickEvent={()=>{newChoco(text,color,gender)}}/>
          </div>
         */
      }
      
    </div>
  )
}

const SelectedItem = ({children, selected, onClick}:{children:React.ReactElement,selected?:boolean,onClick:MouseEventHandler})=>{
  return(
    <div className={`${styles.selectedItem} ${selected ? styles.selected: ''}`} onClick={onClick}>
      {children}
    </div>
  )
}

export default NewChoco