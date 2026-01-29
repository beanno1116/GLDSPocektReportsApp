
import { useRef, useState } from 'react';
import OutlineButton from '../../../../Components/Buttons/OutlineButton';
import PrimaryButton from '../../../../Components/Buttons/PrimaryButton';
import ToggleButton from '../../../../Components/Buttons/ToggleButton';
import FlexColumn from '../../../../Components/FlexComponents/FlexColumn';
import FlexRow from '../../../../Components/FlexComponents/FlexRow';
import ScrollSelector from '../../../../Components/ScrollSelector/ScrollSelector';
import Card from '../../../Templates/Components/Cards/Card';
import View from '../../../Templates/View/View';
import styles from './configureReportForm.module.css';
import List from '../../../../Components/Lists/List';
import TextField from '../../../../Components/Inputs/TextField';
import Select from '../../../../Components/Inputs/Select';
import DateUtility from '../../../../Utils/DateUtils';

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

const months = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec"
]

const ConfigureReportForm = ({ data,close,...props }) => {
  const [selectedItems,setSelectedItems] = useState([...data.map(d=>d.lookup)]);
  const [period,setPeriod] = useState("day");
  
  const dateRangeRef = useRef({
    start: DateUtility.today("input"),
    end: DateUtility.today("input")
  })

  const dateInputsRef = useRef(null);

  const refCallback = (ele) => {
    if (ele) {
      ele.value = DateUtility.today("input");
      dateInputsRef.current = ele;      
    }
  }

  const onPeriodButtonClick = (e) => {
    const button = e.currentTarget;
    const action = button.dataset.action;
    setPeriod(action);
  }

  const onMonthSelectChange = (e) => {
    const startDate = new Date();
    startDate.setMonth(e.month.number);
    startDate.setFullYear(e.year);
    startDate.setDate("01");
    startDate.setHours("00");
    startDate.setMinutes("00");
    startDate.setSeconds("00");
    const endDate = DateUtility.getEndOfMonth(startDate);    
    const rangeObj = {
      start: startDate,
      end: endDate
    }
    dateRangeRef.current = rangeObj;
    debugger
    
    
  }

  const renderDateSelector = (period) => {
    dateInputsRef.current = null;
    if (["day","7day"].includes(period)){
      return (
        <>
          <View.SectionTitle id="reportActions" m='.5rem 0'>Report Date</View.SectionTitle>
          <FlexRow g="1rem">
            <input ref={refCallback} name="startDate" style={{flex:"1",margin:"0 1rem"}} type="date" />
          </FlexRow>
        </>
      )
    }
    return (
      <>
      <View.SectionTitle id="reportActions" m='.5rem 0'>Select {period}</View.SectionTitle>
      <Select monthSelect options={months} onChange={onMonthSelectChange} placeholder='Select month'/>
      </>
    )
  }

  const onListItemClick = (e,id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems([...selectedItems.filter(i => i !== id)]);
      return;
    }

    setSelectedItems([...selectedItems,id])
  }

  const toggleSelectAll = () => {
    if (selectedItems.length === data.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(data.map(item => item.lookup));
    }
  };

  const onGenerateButtonClick = (e) => {
    
    const totals = data.filter(d => selectedItems.includes(d.lookup));

    if (dateInputsRef.current){
      dateRangeRef.current.start = new Date(`${dateInputsRef.current.value} 00:00:00`);
      dateRangeRef.current.end = new Date(`${dateInputsRef.current.value} 00:00:00`);
    }

    let startDate = dateRangeRef.current.start;
    let endDate = dateRangeRef.current.end;

    
    debugger;
    const handleResponse = (response) => {

    }

  }

  const isAllSelected = selectedItems.length === data.length;
  const isSomeSelected = selectedItems.length > 0 && selectedItems.length < data.length;
  
  return (
    <View solid={true}>
      <View.Header showDate={false} title={"Configure Report"} />
      <FlexColumn height='100%' g='1rem'>

        {/* Period Selection Row */}
        <FlexColumn width='100%'>
          <View.SectionTitle id="reportActions" m='.5rem 0'>Select Period</View.SectionTitle>
          <FlexRow g='1rem'>
            {periods.map(p => {
              return (
                <ToggleButton key={p.id} action={p.action} active={p.action === period ? true : false} size='sm' onClick={onPeriodButtonClick}>{p.title}</ToggleButton>
              )
            })}
          </FlexRow>
        </FlexColumn>

        {/* Report date selection row */}
        <FlexColumn width='100%'>
          {renderDateSelector(period)}
        </FlexColumn>

        {/* Report totals selection row */}
        <FlexColumn width='100%'>
          <View.SectionTitle id="reportActions" m='.5rem 0'>Report Totals</View.SectionTitle>
          <div style={{flex:"1",width:"100%"}}>            
            <List>
              <List.Header title="Sales Totals" selected={selectedItems.length} total={data.length} />
              <List.SelectAll isAllSelected={isAllSelected} isSomeSelected={isSomeSelected} onClick={toggleSelectAll} />
              <List.ScrollView>
                {data.map(sale => {
                  return (
                    <List.CheckboxListItem id={sale.lookup} title={sale.description} status={selectedItems.includes(sale.lookup) ? true : false} onClick={onListItemClick} />
                  )
                })}
              </List.ScrollView>
            </List>              
          </div>
        </FlexColumn>

        <div style={{flex:"1"}}></div>

      </FlexColumn>

        <FlexRow p="1rem 0" g='1rem'>
          <PrimaryButton action="generate" onClick={onGenerateButtonClick}>Generate</PrimaryButton>
          <button onClick={(e) => close()}>Close</button>
        </FlexRow>
    </View>
  );
}

export default ConfigureReportForm;