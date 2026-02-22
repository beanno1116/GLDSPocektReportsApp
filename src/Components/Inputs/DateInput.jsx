
import { useEffect, useRef, useState } from 'react';
import OutlineCalendarIcon from '../../assets/icons/OutlineCalendarIcon';
import SolidCalendarIcon from '../../assets/icons/SolidCalendarIcon';
import IconButton from '../Buttons/IconButton';
import styles from './inputs.module.css';
import TextField from './TextField';
import DatePicker from '../DatePicker/DatePicker';
import WEDatePicker from '../DatePicker/WEDatePicker';
import { subscribe, unsubscribe } from '../../events';
import DateUtility from '../../Utils/DateUtils';
import Format from '../../Utils/Format';

const DateInput = ({ label,value,onChange }) => {
  const [isOpen,setIsOpen] = useState(false);

  const tfRef = useRef();

  useEffect(() => {

    if (tfRef.current){
      tfRef.current.value = value;
    }
    
    const handleDayClick = (e) => {

      const {day} = e.detail;
      const now = new Date();
debugger
      const eCopy = {...e,target:{value:Format.toRequestDateFormat(day)}}

      tfRef.current.value = Format.toRequestDateFormat(day);
      debugger;
      onChange && onChange(eCopy);
      setIsOpen(false);
      
    }

    const handleMonthClick = (e) => {
      const {month} = e.detail;
       
    }
    
    subscribe("dayclick",handleDayClick);
    subscribe("monthclick",handleMonthClick);
    return () => {
      unsubscribe("dayclick",handleDayClick);
      unsubscribe("monthclick",handleMonthClick);
    }
  },[isOpen,onChange,setIsOpen])

  const onDateChange = (e) => {
    debugger;
  }

  return (
    <>
      <label className={styles.label}>{label}</label>
      <div className={styles.date_input_wrapper}>
        <TextField ref={tfRef} name={name} placeholder="DD/MM/YYYY HH:MM:SS" onClick={() => setIsOpen(true)} />
        <WEDatePicker monthPicker dayLetterHeader={true} dayNameHeader={false} showButtons={false}/>
        <DatePicker when={isOpen} onChange={onDateChange} close={() => setIsOpen(false)} selected={[]}  monthPicker dayLetterHeader={true} showButtons={false}/>
      </div>
    </>
  );
}

export default DateInput;