
import { useEffect, useState } from 'react';
import styles from '../datePicker.module.css';
import DateUtility from '../Helpers/DateUtility';
import Week from './Week';
import { subscribe, unsubscribe } from '../../../events';

const FIXED_WEEK_COUNT = 6;
const isFixedWeek = true;

const MonthHeader = ({date,onChange}) => {
  const onButtonClick = (action) => {
    onChange && onChange(action);
  }
  return (
    <div className={styles.month_header}>
      <button className={styles.month_header_button} onClick={(e) => onButtonClick("back")}>{"<"}</button>
      <div className={styles.month_header_title}>
        {`${DateUtility.monthObj(date)?.name} ${DateUtility.monthObj(date)?.year}`}
      </div>
      <button className={styles.month_header_button} onClick={(e) => onButtonClick("next")}>{">"}</button>
    </div>
  )
}

const DayNameHeader = ({children}) => {
  return (
    <div className={styles.day_name_header}>{children}</div>
  )
}

const Month = ({ date=new Date(),selected,monthHeader,dayNameHeader,multiSelect,...props }) => {
  const [currentDate,setCurrentDate] = useState(new Date(date));

  const onMonthChange = (action) => {
    if (action === "back"){
      setCurrentDate(new Date(DateUtility.setMonthBack(currentDate,1)))
    }else{
      setCurrentDate(DateUtility.setMonthBack(currentDate,-1));
    }
  }


  const renderWeeks = (date) => {
    const startOfMonth = DateUtility.getStartOfMonth(date);
    const startOfWeek = DateUtility.getStartOfWeek(startOfMonth);
    const startDay = startOfMonth.getDay();
    const startDate = startOfMonth.getDate();
    const endOfMonth = DateUtility.getEndOfMonth(date);
    // 

    const weeks = [];

    let currentStartOfWeek = startOfWeek;

    let i = 0;
    

    while(true){
      weeks.push(
        <Week 
          startDate={currentStartOfWeek}
          month={DateUtility.monthObj(date).number}
          multiSelect={multiSelect}
          selected={selected}
        />
      )

      i++;      
      currentStartOfWeek = DateUtility.addWeeks(currentStartOfWeek,1);
      const isFixedAndBreak = isFixedWeek && i >= FIXED_WEEK_COUNT 

      if (isFixedAndBreak){
        break;
      }
    }



    return weeks;
  }

  const renderDayNameHeaders = (date) => {    
    return (
      <DayNameHeader>

        {DateUtility.dayNames.map(name => {
        return (
          <div key={name}>{name.slice(0,3)}</div>
        )
      })}

      </DayNameHeader>
    )
  }

  return (
    <div className={styles.month}>
      {monthHeader && <MonthHeader date={currentDate} onChange={onMonthChange} />}
      {dayNameHeader && renderDayNameHeaders()}
       <div>
        {renderWeeks(currentDate)}
       </div>
    </div>
  );
}

export default Month;