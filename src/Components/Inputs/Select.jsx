
import { useRef, useState } from 'react';
import styles from './inputs.module.css';
import FlexRow from '../FlexComponents/FlexRow';
import DateUtility from '../../Utils/DateUtils';

const months = [
  {
    number: 0,
    short: "jan",
    full: "january"
  },
  {
    number: 1,
    short: "feb",
    full: "february"
  },
  {
    number: 2,
    short: "mar",
    full: "march"
  },
  {
    number: 3,
    short: "apr",
    full: "april"
  },
  {
    number: 4,
    short: "may",
    full: "may"
  },
  {
    number: 5,
    short: "jun",
    full: "june"
  },
  {
    number: 6,
    short: "jul",
    full: "july"
  },
  {
    number: 7,
    short: "aug",
    full: "august"
  },
  {
    number: 8,
    short: "sep",
    full: "september"
  },
  {
    number: 9,
    short: "oct",
    full: "october"
  },
  {
    number: 10,
    short: "nov",
    full: "november"
  },
  {
    number: 11,
    short: "dec",
    full: "december"
  }
]

const YearSelector = ({selectedMonth,onChange}) => {
  const [currentYear,setCurrentYear] = useState(selectedMonth?.year ? selectedMonth?.year : DateUtility.thisYear);

  const decrement = () => {
    setCurrentYear(currentYear - 1);
    onChange && onChange("y",currentYear - 1);
  }

  const increment = () => {
    const date = new Date();
    const year = parseInt(date.getFullYear());
    if (year === parseInt(currentYear)) return;
    setCurrentYear(currentYear + 1);
    onChange && onChange("y",currentYear + 1);
  }

  return (
    <FlexRow hAlign='space-between' p='.5rem'>
      <div onClick={decrement}>{"<"}</div>
      <div>{currentYear}</div>
      <div onClick={increment}>{">"}</div>
    </FlexRow>
  )
}
const MonthSelector = ({selectedMonth,onChange}) => {
  return (
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)"}}>
      {months.map(month => {
        return (
          <button key={month.number} className={`${styles.option} ${selectedMonth?.month?.number === month.number && styles.option_selected}`} style={{justifyContent:"center"}} onClick={() => onChange(month)}>
            {month.short}
          </button>
        )
      })}
      
    </div>
  )
}

const Select = ({ label,disabled=false,size="md",options=[],subOptions=[],monthSelect=false,onChange,placeholder="Select...",...props }) => {
  const [isOpen,setIsOpen] = useState(false);
  const [selectedValue,setSelectedValue] = useState({
    year: DateUtility.thisYear,
    month: months[DateUtility.thisMonth]
  });

  const selectRef = useRef();
  const monthRef = useRef({
    year: DateUtility.thisYear,
    month: months[DateUtility.thisMonth]
  })

  const handleMonthSelection = (dateComponent,value) => {
    
    if (dateComponent === "y"){
      const monthObj = {...monthRef.current,year:value}
      monthRef.current = monthObj;
      return
    }
  }

const handleSelect = (option) => {
  if (monthSelect){
    const monthObj = {...monthRef.current,month:option};
    monthRef.current = monthObj;
    setSelectedValue(monthRef.current);
    onChange?.(monthRef.current);
    setIsOpen(false);
    return;
  }
  };

  return (
    <div className={styles.form_group}>
      {label && <label className={styles.select_label}>{label}</label>}
      <div className={styles.select} ref={selectRef}>
        <button
          className={`${styles.select_button} ${styles[size]}}`}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
        >
          <span className={selectedValue ? styles.selected_text : styles.placeholder_text}>
            {selectedValue ? `${selectedValue.month.full} ${selectedValue.year}` : placeholder}
          </span>
          <span className={styles.chevron} styles={{transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}}>▼</span>
        </button>

        {isOpen && !disabled && (
          <div className={styles.options_container}>
            {monthSelect && (
              <>
                <YearSelector selectedMonth={selectedValue} onChange={handleMonthSelection}/>
                <MonthSelector selectedMonth={selectedValue} onChange={handleSelect} />
              </>
            )}
            {/* {options.map((option) => (
              <button key={option} className={`${styles.option} ${selectedValue?.value === option && styles.option_selected}`} onClick={() => handleSelect(option)}>
                {option}
                {selectedValue?.value === option && (
                  <span className={styles.checkmark}>✓</span>
                )}
              </button>
            ))} */}
          </div>
        )}
      </div>
      {/* {helperText && (
        <div style={{
          ...styles.helperText,
          color: state === 'error' ? '#ff6b35' : state === 'success' ? '#00ff88' : '#8b9cc5'
        }}>
          {helperText}
        </div>
      )} */}
    </div>
  );
}

export default Select;