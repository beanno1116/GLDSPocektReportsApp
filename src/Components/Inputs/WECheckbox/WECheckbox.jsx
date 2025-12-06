/* eslint-disable react/display-name */
import { forwardRef, useRef } from 'react';

import styles from './weCheckbox.module.css';
import CheckmarkIcon from '../../../assets/icons/CheckmarkIcon';



const LabelContainer = ({ children }) => {
  return (
    <label className={styles.checkbox}>
      {children}
    </label>
  )
}




const CheckboxInput = ({ id, name, value, onChange }) => {

  const handleOnChangeEvent = (e) => {
    let checkbox = e.target;
    let isChecked = checkbox.checked;
    checkbox.value = isChecked;
    checkbox.name = name;
    e.currentTarget = checkbox;
    e.target = checkbox;    
    onChange && onChange(e);
  }


  return (
    <span className={styles.input_span}>
      <input type="checkbox" id={id} name={name} checked={(value === true) ? true : false} onChange={handleOnChangeEvent} />
      <span className={styles.checkbox_input} id="checkbox_control">
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-hidden="true" focusable="false">
          <path fill='none' stroke='currentColor' strokeWidth='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' />
        </svg>
      </span>
    </span>
  )
}




const Label = (props) => {
  return (
    <label htmlFor={props.id} className={styles.cb_label}>{props.text}</label>
  )
}



const generateUniqueId = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  const generator = () => {
    let result = '';
    const charactersLength = characters.length;
    for (let i; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  return generator();
}


const WECheckbox = forwardRef(({name,label=null,value,onChange,size,...props},ref) => {
  const idRef = useRef(`${generateUniqueId(6)}-${name}`);

  const handleOnChangeEvent = (e) => {    
    let checkbox = e.target;
    let isChecked = checkbox.checked;
    checkbox.value = isChecked;
    checkbox.name = name;
    e.currentTarget = checkbox;
    e.target = checkbox;    
    onChange && onChange(e);
  }

  const isChecked = (testValue) => {
    try {      
      if (testValue === "true" || testValue === true){
        return true;
      }
      if (testValue === "false" || testValue === false){
        return false;
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div className={styles.cb_container} style={{...props.style}}>

      {label && <Label id={idRef.current} text={label} />}

      <LabelContainer>

        <span className={styles.input_span}>

          <input ref={ref} type="checkbox" id={idRef} name={name} checked={isChecked(value)} onChange={handleOnChangeEvent} />

          <span className={`${styles.checkbox_input} ${styles[size]}`} id="checkbox_control">
            <CheckmarkIcon color='black'/>
            {/* <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-hidden="true" focusable="false">
              <path fill='none' stroke='currentColor' strokeWidth='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' />
            </svg> */}
          </span>

        </span>      
          
      </LabelContainer>
    </div>
  );
})


export default WECheckbox;