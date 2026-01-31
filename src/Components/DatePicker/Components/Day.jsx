
import { publish } from '../../../events';
import styles from '../datePicker.module.css';
import DateUtility from '../Helpers/DateUtility';

const Day = ({ day,selected=false,inMonth,...props }) => {

  const isToday = DateUtility.isEqual(day,new Date())

  const onDayClick = (e) => {
    publish("dayclick",{e,day})
  }

  return (
    <div className={`${styles.day}`}>
      <span className={`${isToday ? styles.today : "" }  ${selected ? styles.selected : ""} ${!inMonth ? styles.out : ""}`} onClick={onDayClick}>
       {day.getDate()}
      </span>
    </div>
  );
}

export default Day;