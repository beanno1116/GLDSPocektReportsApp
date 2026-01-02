
import { useState } from 'react';
import LockIcon from '../../../../assets/icons/LockIcon';
import DateUtility from '../../../../Utils/DateUtils';
import styles from '../view.module.css';
import UnlockIcon from '../../../../assets/icons/UnlockIcon';

const Header = ({ title,showDate=false,onClick }) => {
  const [isLocked,setIsLocked] = useState(false);

  const renderDate = () => {
    const date = new Date();
    const month = DateUtility.monthAsString(date);
    const day = date.getDate();
    return `${month}, ${day}`;
  }

  const onDateLockClick = (e) => {
    setIsLocked(!isLocked);
    onClick && onClick(e,!isLocked);
  }

  return (
    <div className={styles.header}>
      <div className={styles.header_title}>
        <span>{title}</span>
        <span className={styles.header_indicator}></span>
      </div>
      {showDate && (
        <div data-locked={isLocked} className={styles.header_date} onClick={onDateLockClick}>
          {isLocked ? <LockIcon size={"1.25rem"} /> : <UnlockIcon size={"1.25rem"} />}
          {renderDate()}
        </div>
      )}
    </div>
  );
}

export default Header;