
import styles from '../datePicker.module.css';

const Calendar = ({ ...props }) => {
  const renderMonths = (startdate) => {
    return []
  }
  return (
    <div className={styles.calendar_container}>
      {renderMonths(new Date())}
    </div>
  );
}

export default Calendar;