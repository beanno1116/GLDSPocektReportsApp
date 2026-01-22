
import { useCallback, useRef, useState } from 'react';
import ScrollSelector from '../ScrollSelector/ScrollSelector';
import styles from './periodSelector.module.css';


const scrollSelectorOptions = [
  {
    id: 6,
    text: "Custom",
    action: "custom",
    active: false
  },
  {
    id: 1,
    text: "Today",
    action: "today",
    active: true
  },
  {
    id: 2,
    text: "Yesterday",
    action: "prevDay",
    active: false
  },
  {
    id: 3,
    text: "Last Week",
    action: "prevWeek",
    active: false
  },
  {
    id: 4,
    text: "Last Month",
    action: "prevMonth",
    active: false
  },
  {
    id: 5,
    text: "Last Year",
    action: "prevYear",
    active: false
  }
]

const defaultScrollBehavior = {
      block: 'center',
      inline: 'center',
      behavior: 'smooth' 
    }

const PeriodSelector = ({ currentPeriod,options=scrollSelectorOptions,scrollBehavior=defaultScrollBehavior,onClick }) => {
  const [period,setPeriod] = useState(currentPeriod);

  const optionRef = useRef("today");

  const onPeriodButtonClick = useCallback((option) => (e) => {
    e.currentTarget.scrollIntoView(scrollBehavior);    
    // setPeriod(option);
    optionRef.current = option;
    onClick && onClick(e,option);
  },[onClick,scrollBehavior])

  return (
    <ScrollSelector>
      {options.map(option => {
        return (
          <ScrollSelector.Item 
            key={option.id} 
            id={option.action} 
            active={currentPeriod === option.action ? true : false} 
            text={option.text} 
            onClick={onPeriodButtonClick(option.action)} 
          />
        )
      })}
    </ScrollSelector>
  );
}

export default PeriodSelector;