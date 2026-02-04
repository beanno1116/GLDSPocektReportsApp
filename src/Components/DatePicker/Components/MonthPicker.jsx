
import { useState } from 'react';
import styles from '../datePicker.module.css';
import DateUtility from '../Helpers/DateUtility';

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

const MonthButton = ({text,active,onClick}) => {
  return (
    <button className={`${styles.month_button} ${active && styles.active}`} onClick={onClick}>{text}</button>
  )
}

const MonthPicker = ({ selected,date=new Date(),...props }) => {
  const [selectedMonths,setSelectedMonths] = useState(selected);

  const onMonthButtonClick = (month) => {
    setSelectedMonths([...selectedMonths,month]);
  }

  return (
    <div className={styles.month}>
      <YearHeading date={date} onChange={() => {}} />
      <div className={styles.month_picker}>
        {DateUtility.getMonthNames("abrv").map(name => {
          return (
            <MonthButton text={name}  active={DateUtility.monthObj(date).abrv === name} onClick={(e) => onMonthButtonClick(name)}/>
          )
        })}
      </div>
       
    </div>
  );
}

export default MonthPicker;