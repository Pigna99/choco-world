import React from 'react';
import styles from './utils.module.css'


const  Input = ({text, setText, id, fontSize}:{text:string, setText:React.Dispatch<React.SetStateAction<string>>, id:string, fontSize?:number})=>{

    const handleChange =( e:React.FormEvent<HTMLInputElement>) => {
        const letterNumber = /^[0-9a-zA-Z]+$/;
        if(!e.currentTarget.value.match(letterNumber))return;
        setText(e.currentTarget.value);
        //console.log('value is:', e.currentTarget.value);
    };

    return(
    <input 
        className={styles.input}
        type='text'
        id={id}
        name={id}
        onChange={handleChange}
        value={text}
        pattern='[a-zA-Z0-9-]+'
        style={{fontSize:fontSize ? fontSize : 15}}
      />)
}

const ColorInput = ({color, setColor, id}:{color:string, setColor:React.Dispatch<React.SetStateAction<string>>, id:string})=>{
    const handleChange =( e:React.FormEvent<HTMLInputElement>) => {
        setColor(e.currentTarget.value);
        //console.log('value is:', e.currentTarget.value);
    };

    return(
    <input 
        className={styles.color}
        type='color'
        id={id}
        name={id}
        onChange={handleChange}
        value={color}
      />)
}

export {Input, ColorInput}