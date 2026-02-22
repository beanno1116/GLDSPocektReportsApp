
import { useState } from 'react';
import OutlineCalendarIcon from '../../assets/icons/OutlineCalendarIcon';
import SolidCalendarIcon from '../../assets/icons/SolidCalendarIcon';
import StoreIcon from '../../assets/icons/StoreIcon';
import FlexColumn from '../FlexComponents/FlexColumn';
import FlexRow from '../FlexComponents/FlexRow';
import styles from './headings.module.css';
import DatePicker from '../DatePicker/DatePicker';
import useAppContext from '../../hooks/useAppContext';
import Show from '../Show/Show';

const ViewHeading = ({ title,subtitle,onClick,showDatePicker=true,...props }) => {
  const [isOpen,setIsOpen] = useState(false);
  const {state} = useAppContext();

  const onHeadingButtonClick = (e) => {
    setIsOpen(true);
  }

  const onDateChange = (dates) => {
    if (dates === "close") {
      setIsOpen(false);
      return;
    }
    
    onClick && onClick(dates)
    setIsOpen(false);
  }

  return (
    <div className={styles.header}>
      <FlexColumn vAlign='center' width='100%'>
        <div className={styles.header_title}>
          <span>{title}</span>
        </div>
        <FlexRow width='100%'>
          <div className={styles.header_subtitle}>{subtitle ? subtitle : state.stores.filter(s=>s.id === state.activeStore)[0].name}</div>
        </FlexRow>
        
      </FlexColumn>
      <Show when={showDatePicker}>
        <button className={styles.header_button} onClick={onHeadingButtonClick}>
          <OutlineCalendarIcon size={30} />
        </button>
        {/* <DatePicker when={isOpen} onChange={onDateChange} close={() => setIsOpen(false)} selected={[]} multiSelect/> */}
        <DatePicker when={isOpen} onChange={onDateChange} close={() => setIsOpen(false)} selected={[]}  monthPicker header periodSelector/>
      </Show>
        
    </div>
  );
}

export default ViewHeading;