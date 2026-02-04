
import DateUtility from '../../../../Utils/DateUtils';
import styles from '../view.module.css';

const DropdownHeader = ({ title,showDate }) => {

  const renderDate = () => {
    const date = new Date();
    const month = DateUtility.monthAsString(date);
    const day = date.getDate();
    return `${month}, ${day}`;
  }

  return (
    <div className={styles.header}>
      <div className={styles.header_title}>
        <span>{title}</span>
        <span className={styles.header_indicator}></span>
      </div>
      {showDate && (
        <div className={styles.header_date}>
          {renderDate()}
        </div>
      )}
    </div>
  );
}

export default DropdownHeader;