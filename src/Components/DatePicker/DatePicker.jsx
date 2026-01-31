
import { useEffect, useRef, useState } from 'react';
import FlexColumn from '../FlexComponents/FlexColumn';
import styles from './datePicker.module.css';
import useClickOutside from '../../hooks/useClickOutside';
import View from '../../Views/Templates/View/View';
import ToggleButton from '../Buttons/ToggleButton';
import FlexRow from '../FlexComponents/FlexRow';
import PeriodSelector from './Components/PeriodSelector';
import PrimaryButton from '../Buttons/PrimaryButton';
import SecondaryButton from '../Buttons/SecondaryButton';
import Month from './Components/Month';
import { subscribe, unsubscribe } from '../../events';
import DateUtility from './Helpers/DateUtility';
import MonthPicker from './Components/MonthPicker';



const Header = ({text}) => <div className={styles.date_picker_header}><span>{text}</span></div>


const DatePicker = ({ when,close,selected,multiSelect,onChange,monthPicker,...props }) => {
  const [selectedDays,setSelectedDays] = useState(selected);
  const [period,setPeriod] = useState("day");

  

  useEffect(() => {
    const handleDayClick = (e) => {
      const {day} = e.detail;
      const filteredDays = selectedDays.filter(sd => DateUtility.isEqual(sd,day));
      let selectedDay = undefined;
      if (filteredDays.length > 0){
        selectedDay = filteredDays[0];
      }

      if (multiSelect){
        if (selectedDay){
          setSelectedDays(selectedDays.filter(sd => !DateUtility.isEqual(sd,day)));
          return;
        }
        setSelectedDays([...selectedDays,e.detail.day]);
        return;
      }
      setSelectedDays([e.detail.day]);
    }
    
    subscribe("dayclick",handleDayClick)
    return () => {
      unsubscribe("dayclick",handleDayClick);
    }
  },[multiSelect,setSelectedDays,selectedDays])

  const filterRef = useRef();
  const periodRef = useRef("day");
  useClickOutside(filterRef,() => close())

  const onPeriodChange = (period) => {
    setPeriod(period);
  }

  const onApplyDateClick = (e) => {
    onChange && onChange(selectedDays);
  }
  return (
    <div className={`${styles.date_picker} ${when ? styles.open : ""}`} ref={filterRef}>
      <FlexColumn width='100%' height='100%'>
        <Header text={"Date Filter"} />
        <PeriodSelector onChange={onPeriodChange} />
        <FlexRow flex='1' width='100%'>
          {period === "day" && <Month selected={selectedDays} monthHeader dayNameHeader multiSelect />}
          {period === "month" && <MonthPicker />}
        </FlexRow>
        <SecondaryButton onClick={onApplyDateClick}>Apply</SecondaryButton>
      </FlexColumn>
    </div>
  );
}

export default DatePicker;