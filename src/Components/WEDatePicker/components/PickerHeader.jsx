import React from 'react';
import { ABR_DAYS_OF_WEEK, MONTHS_OF_YEAR } from '../WEDateUtils';


import LeftNavButton from './buttons/LeftNavButton';
import RightNavButton from './buttons/RightNavButton';

import styles from '../weDatePicker.module.css';

const renderDetails = (date) => {
  const month = Object.keys(ABR_DAYS_OF_WEEK)[date.getMonth()];
  const year = date.getFullYear();
  return `${month} - ${year}`;
}

const PickerHeader = ({ date, navAction }) => {



  return (
    <div className={styles.picker_header}>
      <div className={styles.header_btn} onClick={e => navAction(e, "prev")}><LeftNavButton /></div>
      <div className={styles.header_details}>{renderDetails(date)}</div>
      <div className={styles.header_btn} onClick={e => navAction(e, "next")}><RightNavButton /></div>
    </div>
  );
}

export default PickerHeader;