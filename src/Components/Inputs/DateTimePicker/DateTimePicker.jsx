
import styles from '../inputs.module.css';
import TextField from '../TextField';

const DateTimePicker = ({ ...props }) => {
  return (
    <div className={styles.date_picker_wrapper}>
       <TextField size="sm" />
    </div>
  );
}

export default DateTimePicker;