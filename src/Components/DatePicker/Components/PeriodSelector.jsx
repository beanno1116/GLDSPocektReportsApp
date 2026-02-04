
import { useCallback, useState } from 'react';
import ToggleButton from '../../Buttons/ToggleButton';
import FlexColumn from '../../FlexComponents/FlexColumn';
import FlexRow from '../../FlexComponents/FlexRow';
import View from '../../../Views/Templates/View/View';

const periods = [
  {
    id: 1,
    action: "day",
    title: "Day"
  },
  {
    id: 2,
    action: "7day",
    title: "7-Day"
  },
  {
    id: 3,
    action: "month",
    title: "Month"
  },
  {
    id: 4,
    action: "year",
    title: "Year"
  },
]

const PeriodSelector = ({ onChange,...props }) => {
  const [period,setPeriod] = useState("day");
  const onPeriodButtonClick = useCallback((selectedPeriod) => (e) => {
    if (period === selectedPeriod) return;
    setPeriod(selectedPeriod);
    onChange && onChange(selectedPeriod);
  },[setPeriod,period,onChange])
  return (
    <FlexColumn width='100%'>
      <View.SectionTitle id="reportActions" m='.5rem 0'>Select Period</View.SectionTitle>
      <FlexRow g='1rem'>
        {periods.map(p => {
          return (
            <ToggleButton key={p.id} action={p.action} active={p.action === period ? true : false} size='sm' onClick={onPeriodButtonClick(p.action)}>{p.title}</ToggleButton>
          )
        })}
      </FlexRow>
    </FlexColumn>
  );
}

export default PeriodSelector;