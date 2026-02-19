import { useCallback, useRef, useState } from 'react';
import PrimaryButton from '../../../Components/Buttons/PrimaryButton';
import FlexColumn from '../../../Components/FlexComponents/FlexColumn';
import FlexRow from '../../../Components/FlexComponents/FlexRow';
import View from '../../Templates/View/View';
import List from '../../../Components/Lists/List';
import TabView from '../../../Components/TabView/TabView';
import DateRangeLabel from '../StoreReports/Components/DateRangeLabel';
import IconButton from '../../../Components/Buttons/IconButton';
import OutlineCalendarIcon from '../../../assets/icons/OutlineCalendarIcon';
import DatePicker from '../../../Components/DatePicker/DatePicker';
import CloseIcon from '../../../Components/WEModal/components/icons/CloseIcon';
import styles from './forms.module.css';
import { createSalesReport } from '../../../Services/ReportPDFServices';
import Show from '../../../Components/Show/Show';
import Card from '../../Templates/Components/Cards/Card';
import KpiGrid from '../../../Components/Grids/KpiGrid';
import DateRangeView from './Components/DateRangeView';






const SalesReportBuilder = ({ data,close,...props }) => {
  const [currentStep,setCurrentStep] = useState(3);
  const [selectedItems,setSelectedItems] = useState([...data.map(d=>d.lookup)]);
  const [isOpen,setIsOpen] = useState(false);
  const [dateRange,setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date()
  })
  

  const reportTypeRef = useRef(null);



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
    


    const handleResponse = (response) => {

      
      createSalesReport("Ben Klimaszewski","Kings Liquor Test",dateRange,totals);
      
    }
    handleResponse();

  }

  const isAllSelected = selectedItems.length === data.length;
  const isSomeSelected = selectedItems.length > 0 && selectedItems.length < data.length;

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
  
  const onReportTypeButtonClick = useCallback((action) => (e) => {
    reportTypeRef.current = action;
    setCurrentStep(currentStep + 1);
  },[setCurrentStep,currentStep])

  return (
    <View solid={true}>

      <View.Header showDate={false} title={"Configure Sales Report"} />
      {reportTypeRef.current && <FlexRow hAlign='space-between'><span>Report type:</span> <span>{reportTypeRef.current}</span></FlexRow>}

      <FlexRow flex='1' hAlign='center'>

        <Show when={currentStep === 1}>
          <FlexColumn g="1rem" height='100%' flex='1' hAlign='center' vAlign='center'>
            <FlexRow hAlign='center'>Choose report type</FlexRow>
            {/* <Card p='0' m='0'> */}

              <KpiGrid m='0' p="1.75rem" g="1.75rem">
                <KpiGrid.ButtonItem icon="day" label={"Day"} onClick={onReportTypeButtonClick("day")}/>
                <KpiGrid.ButtonItem icon="range" label={"Range"} onClick={onReportTypeButtonClick("range")}/>
                <KpiGrid.ButtonItem icon="compare" label={"Compare"} onClick={onReportTypeButtonClick("compare")}/>
              </KpiGrid>
            {/* </Card> */}
          </FlexColumn>
        </Show>

        <Show when={currentStep === 2}>
          {reportTypeRef.current === "day" && <Card>Select report Date</Card>}
          {reportTypeRef.current === "range" &&  <DateRangeView />}
          {reportTypeRef.current === "compare" && <Card>Select dates to compare</Card>}
        </Show>
        
        
      </FlexRow>
<Show when={currentStep === 3}>
          <FlexColumn height='100%' g='1rem'>

            {/* Period Selection Row */}
            <FlexRow hAlign='space-between' vAlign='center'>

              <DateRangeLabel flex={false} start={dateRange.startDate} end={dateRange.endDate} />

              <button className={styles.header_button} onClick={onDatePickerButtonClick}>
                <OutlineCalendarIcon size={30} />
              </button>


              <DatePicker when={isOpen} onChange={onDateRangeChange} close={() => setIsOpen(false)} selected={[]}  monthPicker/>

            </FlexRow>


            

            {/* Report totals selection row */}
            <FlexColumn width='100%' height='100%'>
              <View.SectionTitle id="reportActions" m='.5rem 0'>Report Totals</View.SectionTitle>
              <div style={{position:"absolute",width:"100%",height:"100%"}}>            
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

          </FlexColumn>

          
        </Show>

      <FlexRow p="1rem 0" g='1rem'>
          <PrimaryButton size='md' action="generate" onClick={onGenerateButtonClick}>Generate</PrimaryButton>
          <IconButton action="close" onClick={(e) => close()}>
            <CloseIcon size={36} />
          </IconButton>
        </FlexRow>
    </View>
  );
}

export default SalesReportBuilder;