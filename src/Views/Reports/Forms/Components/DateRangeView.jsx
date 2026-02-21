import { useState } from "react";
import OutlineCalendarIcon from "../../../../assets/icons/OutlineCalendarIcon";
import DatePicker from "../../../../Components/DatePicker/DatePicker";
import FlexColumn from "../../../../Components/FlexComponents/FlexColumn";
import FlexRow from "../../../../Components/FlexComponents/FlexRow";
import Card from "../../../Templates/Components/Cards/Card";
import DateRangeLabel from "../../StoreReports/Components/DateRangeLabel";
import styles from "../forms.module.css";
import Month from "../../../../Components/DatePicker/Components/Month";



const DateRangeView = ({ ...props }) => {
  const [isOpen,setIsOpen] = useState(false);
  const [dateRange,setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date()
  })
  
  const onDatePickerButtonClick = (days) => {
    setDateRange({...dateRange,startDate:days[0]})
    console.log(days)
    
  }
  const onDateRangeChange = () => {

  }
  return (
    <FlexColumn g="1rem" height='100%' flex='1' hAlign='center' vAlign='center'>
        <FlexRow hAlign="center">{dateRange.startDate ? "Select start date" : "Select end date"}</FlexRow>
      <Card m="0" p=".5rem 1rem"> 
       
          {/* <Month selected={[]} monthHeader dayNameHeader multiSelect /> */}
           <DatePicker selected={[]} onChange={onDatePickerButtonClick}  monthPicker panel={false}/>
         
      </Card>
    </FlexColumn>
  );
}

export default DateRangeView;