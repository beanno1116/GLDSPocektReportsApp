
import { publish } from '../../../events';
import styles from '../datePicker.module.css';
import DateUtility from '../Helpers/DateUtility';

const Day = ({ day,selected=false,inMonth,size,...props }) => {

  const isToday = DateUtility.isEqual(day,new Date())

  const onDayClick = (e) => {
    publish("dayclick",{e,day})
  }

  const fontSize = {
    sm: ".8rem"
  }

  return (
    <div className={`${styles.day} ${isToday ? styles.today : "" }  ${selected ? styles.selected : ""} ${!inMonth ? styles.out : ""} ${styles[size]}`} onClick={onDayClick} style={{fontSize:fontSize[size]}} >
       {day.getDate()}
      {/* <span className={`${isToday ? styles.today : "" }  ${selected ? styles.selected : ""} ${!inMonth ? styles.out : ""}`} onClick={onDayClick}>
      </span> */}
    </div>
  );
}

export default Day;