
import { useState } from 'react';
import PeriodSelector from './Components/PeriodSelector';
import styles from './datePicker.module.css';
import {DAY_TYPE,RANGE_TYPE,MONTH_TYPE} from './Data/periods';




const Header = ({text}) => <div className={styles.date_picker_header}><span>{text}</span></div>

const WEDatePicker = ({ header,hasPeriodSelector,hasMonthHeader,hasDayHeader,mode }) => {
  const [period,setPeriod] = useState(mode);
  const [selectedDays,setSelectedDays] = useState([]);


  const onPeriodChange = (period) => {
    setPeriod(period);
  }



  return (
    <div className={styles.date_picker_container}>
      {header && <Header text={header} />}
      {hasPeriodSelector && <PeriodSelector onChange={onPeriodChange} />}
      <FlexRow flex='1' width='100%'>
        {period === DAY_TYPE && <Month selected={selectedDays} monthHeader dayNameHeader multiSelect />}
        {period === RANGE_TYPE && <Month selected={selectedDays} monthHeader dayNameHeader weekIncrements/>}
        {period === MONTH_TYPE && <MonthPicker selected={selectedDays} />}
      </FlexRow>
      <FlexRow g='1rem'>
        <PrimaryButton action="apply" onClick={onApplyDateClick}>Apply</PrimaryButton>
        <SecondaryButton action="cancel" onClick={onApplyDateClick}>Cancel</SecondaryButton>
      </FlexRow>
    </div>
  );
}

export default WEDatePicker;