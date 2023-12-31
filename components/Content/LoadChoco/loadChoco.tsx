import React, { MouseEventHandler, useState } from 'react'
import styles from './loadChoco.module.css'
import { Button } from '@/components/utilsComponents/buttons'
import {Input} from '@/components/utilsComponents/input'

function LoadChoco({loadChoco}:{loadChoco:(id:string)=>MouseEventHandler}) {
  const [inputText, setInputText] = useState('')

  return (
    <div className={styles.container}>
      <h5>Load a Choco from id:</h5>
      <Input text={inputText} setText={setInputText} id='chocoid'/>
      <div className={styles.buttonContainer}><Button name='load choco' clickEvent={(e)=>{loadChoco(inputText)(e)}}/></div>
    </div>
  )
}

export default LoadChoco