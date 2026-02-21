
import { useState } from 'react';
import styles from '../datePicker.module.css';
import DateUtility from '../Helpers/DateUtility';
import { publish } from '../../../events';

const YearHeading = ({date,onChange}) => {
  const onButtonClick = (action) => {
    onChange && onChange(action);
  }
  return (
    <div className={styles.month_header}>
      <button className={styles.month_header_button} onClick={(e) => onButtonClick("back")}>{"<"}</button>
      <div className={styles.month_header_title}>
        {`${DateUtility.monthObj(date)?.year}`}
      </div>
      <button className={styles.month_header_button} onClick={(e) => onButtonClick("next")}>{">"}</button>
    </div>
  )
}

const MonthButton = ({text,active,selected,onClick}) => {
  return (
    <button data-text={text} className={`${styles.month_button} ${active && styles.active} ${selected && styles.selected}`} onClick={onClick}>{text}</button>
  )
}

const MonthPicker = ({ selected,date=new Date(),...props }) => {
  const [currentDate,setCurrentDate] = useState(new Date(date));
  

  const onMonthButtonClick = (index) => {
    const startDate = new Date(currentDate.getFullYear(),index,1,0,0,0,0);
    const endDate = DateUtility.getEndOfMonth(startDate);
    publish("monthclick",{month:[startDate,endDate]});
  }

  const onYearChange = (action) => {
    if (action === "back"){
      setCurrentDate(DateUtility.setYearBack(currentDate,1));
    }else{
      setCurrentDate(DateUtility.setYearBack(currentDate,-1));
    }    
  }

  const isActiveMonth = (month) => {
    const dateObj = DateUtility.monthObj(new Date());
    const currentDateObj = DateUtility.monthObj(currentDate);

    let test = DateUtility.isSameMonth(new Date(),currentDate);
    
    if ((dateObj.number === currentDateObj.number) && (dateObj.year === currentDateObj.year)) {
      if (currentDateObj.abrv === month){
        return true;
      }
    }
    return false;
  }

  return (
    <div className={styles.month}>
      <YearHeading date={currentDate} onChange={onYearChange} />
      <div className={styles.month_picker}>
        {DateUtility.getMonthNames("abrv").map((name,index) => {
          return (
            <MonthButton 
              text={name} 
              selected={selected.filter(s => s.getMonth() === index).length > 0}  
              active={isActiveMonth(name)} 
              onClick={(e) => onMonthButtonClick(index)} />
          )
        })}
      </div>
       
    </div>
  );
}

export default MonthPicker;