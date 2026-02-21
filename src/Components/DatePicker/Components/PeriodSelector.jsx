
import { useCallback, useState } from 'react';
import ToggleButton from '../../Buttons/ToggleButton';
import FlexColumn from '../../FlexComponents/FlexColumn';
import FlexRow from '../../FlexComponents/FlexRow';
import { selectorPeriods } from '../Data/periods';
import { publish } from '../Events/events';




const PeriodSelector = ({ onChange,...props }) => {
  const [period,setPeriod] = useState("day");

  const onPeriodButtonClick = useCallback((selectedPeriod) => (e) => {
    if (period === selectedPeriod) return;
    setPeriod(selectedPeriod);
    onChange && onChange(selectedPeriod);
    publish("periodchange",{event:e,period});
  },[setPeriod,period,onChange])

  return (
    <FlexColumn width='100%'>
      <FlexRow g='1rem'>
        {selectorPeriods.map(p => {
          return (
            <ToggleButton key={p.id} action={p.action} active={p.action === period ? true : false} size='sm' onClick={onPeriodButtonClick(p.action)}>{p.title}</ToggleButton>
          )
        })}
      </FlexRow>
    </FlexColumn>
  );
}

export default PeriodSelector;