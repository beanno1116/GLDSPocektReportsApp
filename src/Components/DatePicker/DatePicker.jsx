
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
      const now = new Date();

      if (day.getTime() > now.getTime()){
        return;
      }

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

      if (period === "7day"){
        if (selectedDays.filter(sd => DateUtility.isEqual(sd,day)).length > 0){
          setSelectedDays([]);
          return
        }
        let weekArr = [];
        for(let i = 0; i < 7; i++){
          weekArr.push(DateUtility.addDays(day,i))
        }
        setSelectedDays(weekArr)
        return;
      }

      if (selectedDay){
        setSelectedDays(selectedDays.filter(sd => !DateUtility.isEqual(sd,day)));
        return;
      }
      setSelectedDays([e.detail.day]);
    }

    const handleMonthClick = (e) => {
      const {month} = e.detail;
       if (selectedDays.filter(sd => sd.getMonth() === month[0].getMonth()).length > 0){
        setSelectedDays([])
        return;
       }
       setSelectedDays([...month]);
    }
    
    subscribe("dayclick",handleDayClick);
    subscribe("monthclick",handleMonthClick);
    return () => {
      unsubscribe("dayclick",handleDayClick);
      unsubscribe("monthclick",handleMonthClick);
    }
  },[multiSelect,setSelectedDays,selectedDays,period])

  const filterRef = useRef();
  const periodRef = useRef("day");
  useClickOutside(filterRef,() => close())

  const onPeriodChange = (period) => {
    setPeriod(period);
  }

  const onApplyDateClick = (e) => {
    const action = e.currentTarget.dataset?.action;
    let days = selectedDays;
    if (action && action === "cancel") {
      days = "close";
    }
    onChange && onChange(days);
  }
  return (
    <div className={`${styles.date_picker} ${when ? styles.open : ""}`} ref={filterRef}>
      <FlexColumn width='100%' height='100%'>
        <Header text={"Date Filter"} />
        <PeriodSelector onChange={onPeriodChange} />
        <FlexRow flex='1' width='100%'>
          {period === "day" && <Month selected={selectedDays} monthHeader dayNameHeader multiSelect />}
          {period === "7day" && <Month selected={selectedDays} monthHeader dayNameHeader weekIncrements/>}
          {period === "month" && <MonthPicker selected={selectedDays} />}
        </FlexRow>
        <FlexRow g='1rem'>
          <PrimaryButton action="apply" onClick={onApplyDateClick}>Apply</PrimaryButton>
          <SecondaryButton action="cancel" onClick={onApplyDateClick}>Cancel</SecondaryButton>
        </FlexRow>
      </FlexColumn>
    </div>
  );
}

export default DatePicker;