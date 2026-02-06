
import { useRef, useState } from 'react';
import PrimaryButton from '../../../Components/Buttons/PrimaryButton';
import FlexColumn from '../../../Components/FlexComponents/FlexColumn';
import FlexRow from '../../../Components/FlexComponents/FlexRow';
import View from '../../Templates/View/View';
import List from '../../../Components/Lists/List';
import DateRangeLabel from '../StoreReports/Components/DateRangeLabel';
import IconButton from '../../../Components/Buttons/IconButton';
import OutlineCalendarIcon from '../../../assets/icons/OutlineCalendarIcon';
import DatePicker from '../../../Components/DatePicker/DatePicker';
import CloseIcon from '../../../Components/WEModal/components/icons/CloseIcon';
import styles from './forms.module.css';
import KpiGrid from '../../../Components/Grids/KpiGrid';
import SolidSafeIcon from '../../../assets/icons/SolidSafeIcon';
import DrawerIcon from '../../../assets/icons/DrawerIcon';
import { createSalesTenderReport } from '../../../Services/ReportPDFServices';

const SalesHourlyReportBuilder = ({ data,close }) => {
  // const [selectedItems,setSelectedItems] = useState([...data.map(d=>d.lookup)]);
  const [isOpen,setIsOpen] = useState(false);
  const [dateRange,setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date()
  })

  // const isAllSelected = selectedItems.length === data.length;
  // const isSomeSelected = selectedItems.length > 0 && selectedItems.length < data.length;

  // const onListItemClick = (e,id) => {
  //   if (selectedItems.includes(id)) {
  //     setSelectedItems([...selectedItems.filter(i => i !== id)]);
  //     return;
  //   }

  //   setSelectedItems([...selectedItems,id])
  // }

  // const toggleSelectAll = () => {
  //   if (selectedItems.length === data.length) {
  //     setSelectedItems([]);
  //   } else {
  //     setSelectedItems(data.map(item => item.lookup));
  //   }
  // };

  const onGenerateButtonClick = (e) => {
    
    const totals = data.filter(d => selectedItems.includes(d.lookup));
    


    const handleResponse = (response) => {

      
      createSalesTenderReport("Ben Klimaszewski","Kings Liquor Test",dateRange,totals);
      
    }
    handleResponse();

  }

  const onDatePickerButtonClick = (e) => {
    setIsOpen(!isOpen);
  }

  const onDateRangeChange = (dates) => {
    if (dates === "close"){
      setIsOpen(false);
      return;
    }
    if (dates.length === 2){
      const dateRange = {
        startDate: dates[0],
        endDate: dates[1]
      }
      setDateRange(dateRange);
      setIsOpen(false);
      return;
    }

    if (dates.length > 2 && dates.length <= 7){
      const dateRange = {
        startDate: dates[0],
        endDate: dates[dates.length - 1]
      }
      setDateRange(dateRange);
      setIsOpen(false);
      return;
    }
    const range = {
      startDate: dates[0],
      endDate: dates[0]
    }
    setDateRange(range);
    setIsOpen(false);
  }
return (
    <View solid={true}>

      <View.Header showDate={false} title={"Configure Hourly Report"} />
      
      <FlexColumn height='100%' g='1rem'>

        {/* Period Selection Row */}
        <FlexRow hAlign='space-between' vAlign='center'>

          <DateRangeLabel flex={false} start={dateRange.startDate} end={dateRange.endDate} />

          <button className={styles.header_button} onClick={onDatePickerButtonClick}>
            <OutlineCalendarIcon size={30} />
          </button>

          <DatePicker when={isOpen} onChange={onDateRangeChange} close={() => setIsOpen(false)} selected={[]}  monthPicker/>

        </FlexRow>

        <View.SectionTitle id="tender" m='.5rem 0'>Report Types</View.SectionTitle>
        <KpiGrid>
          <KpiGrid.ButtonItem icon="range" label={"Date Range"} />
          <KpiGrid.ButtonItem icon="compare" label={"Compare"} />
        </KpiGrid>

        {/* Report totals selection row */}
        {/* <FlexColumn width='100%' height='100%'>
          <View.SectionTitle id="reportActions" m='.5rem 0'>Report Totals</View.SectionTitle>
          <div style={{position:"absolute",width:"100%",height:"100%"}}>            
            <List>
              <List.Header title="Select Tenders" selected={selectedItems.length} total={data.length} />
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
        </FlexColumn> */}


      </FlexColumn>

        <FlexRow p="1rem 0" g='1rem'>
          <PrimaryButton size='md' action="generate" onClick={onGenerateButtonClick}>Generate</PrimaryButton>
          <IconButton action="close" onClick={(e) => close()}>
            <CloseIcon size={36} />
          </IconButton>
        </FlexRow>
    </View>
  );
}

export default SalesHourlyReportBuilder;