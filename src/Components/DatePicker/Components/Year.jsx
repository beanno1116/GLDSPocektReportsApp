
import styles from '../datePicker.module.css';
import DateUtility from '../Helpers/DateUtility';

const Year = ({ startDate,month,selected,showWeekNumber,...props }) => {

  const renderMonths = (startDate) => {
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
        />
      )
      i++;
      currentDay = DateUtility.addDays(currentDay,1);DateUtility
      if (i >= 7){
        break;
      }
    }
    return days;
  }

  return (
    <div
      {...props}
      className={styles.year}>
        {renderMonths(startDate)}
    </div>
  );
}

export default Year;