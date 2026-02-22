
import styles from '../datePicker.module.css';
import DateUtility from '../Helpers/DateUtility';
import Day from './Day';

const Week = ({ startDate,month,selected,showWeekNumber,size,...props }) => {

  const renderDays = (startDate) => {
    const days = [];

    let currentDay = startDate;
    let i = 0;
    while (true) {
      let temp = selected;
      
      days.push(
        <Day 
          key={currentDay.getDate()}
          day={currentDay}
          inMonth={currentDay.getMonth() === month}
          selected={selected.length > 0 && selected.filter(s => DateUtility.isEqual(s,currentDay))[0]}
          size={size}
        />
      )
      i++;
      currentDay = DateUtility.addDays(currentDay,1);
      if (i >= 7){
        break;
      }
    }
    return days;
  }

  return (
    <div
      {...props}
      className={styles.week}>
        {renderDays(startDate)}
    </div>
  );
}

export default Week;