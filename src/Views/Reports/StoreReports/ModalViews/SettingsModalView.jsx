
import PrimaryButton from '../../../../Components/Buttons/PrimaryButton';
import FlexRow from '../../../../Components/FlexComponents/FlexRow';
import Card from '../../../Templates/Components/Cards/Card';
import View from '../../../Templates/View/View';
import knowledgeIcon from '../../../../assets/images/knowledgeIcon.png';
import List from '../../../../Components/Lists/List';
import { useState } from 'react';
import FlexColumn from '../../../../Components/FlexComponents/FlexColumn';
import ScrollView from '../../../../Components/ScrollView/ScrollView';
import WEAccordion from '../../../../Components/WEAccordion/WEAccordion';


const reportWidgets = [
  "Details",
  "Markdowns",
  "Loyalty",
  "Coupons",
  "Safe & Drawer",
  "Taxes",
  "Exceptions",
  "Transactions"
]

const defaultReportOrder = [
  "Details",
  "Markdowns",
  "Loyalty",
  "Coupons",
  "Safe & Drawer",
  "Taxes",
  "Exceptions",
  "Transactions"
]


const SettingsModalView = ({ close }) => {
  const [selectedItems,setSelectedItems] = useState([...reportWidgets.map(d=>d.toLowerCase())]);
  
    const isAllSelected = selectedItems.length === reportWidgets.length;
  const isSomeSelected = selectedItems.length > 0 && selectedItems.length < reportWidgets.length;

  return (
    <View solid={true}>

      <View.DropdownHeader showDate={false} title={"Store Report View"} />
      
      
      <Card m='0' accent='top'>
        <FlexRow g="1rem">
          <img src={knowledgeIcon} width={50} height={50} style={{float:"left"}} />
          <p>
            Current data is compared to previous date range period.
          </p>
        </FlexRow>
      </Card>

      <ScrollView>
        <View.SectionTitle m='1rem 0 .5rem 0'>Report order</View.SectionTitle>
        <Card>    
            {reportWidgets.map(widget => {
              return (
                <List.DraggableListItem key={widget} id={widget} title={widget} status={selectedItems.includes(widget) ? true : false} onClick={()=>{}} />
              )
            })}
        </Card>

        <View.SectionTitle m='0 0 .5rem 0'>Report Widgets</View.SectionTitle>
        <Card>
          <List.Header title="Widgets" selected={selectedItems.length} total={reportWidgets.length} />
          <List.SelectAll isAllSelected={isAllSelected} isSomeSelected={isSomeSelected} onClick={()=>{}} />
          
            {reportWidgets.map(widget => {
              return (
                <List.CheckboxListItem key={widget} id={widget} title={widget} status={selectedItems.includes(widget.toLowerCase()) ? true : false} onClick={()=>{}} />
              )
            })}
        </Card>

        <View.SectionTitle m='0 0 .5rem 0'>Report Alerts</View.SectionTitle>
        <Card>
          <List.DraggableListItem key={"under"} id={"under"} title={"Under performing sales"}  onClick={()=>{}} />
          <List.DraggableListItem key={"Upcoming trend"} id={"Upcoming trend"} title={"Upcoming trend"}  onClick={()=>{}} />
        </Card>

        <View.SectionTitle m='0 0 .5rem 0'>Help</View.SectionTitle>
        <Card>
          <WEAccordion>
            <WEAccordion.Panel>
              <WEAccordion.Panel.Header>
                <h3>FAQs</h3>
              </WEAccordion.Panel.Header>
              <WEAccordion.Panel.Content>
                <List.CheckboxListItem id={"FAQ1"} title={"How are changes calculated?"} status={selectedItems.includes("") ? true : false} onClick={()=>{}} />
              </WEAccordion.Panel.Content>
            </WEAccordion.Panel>
            <WEAccordion.Panel>
              <WEAccordion.Panel.Header>
                <h3>How To's</h3>
              </WEAccordion.Panel.Header>
              <WEAccordion.Panel.Content>
                <List.CheckboxListItem id={"howto1"} title={"Selecting the dates for the report view."} status={selectedItems.includes("") ? true : false} onClick={()=>{}} />
                <List.CheckboxListItem id={"howto1"} title={"Using the report widget to drill deeper into a report."} status={selectedItems.includes("") ? true : false} onClick={()=>{}} />
                <List.CheckboxListItem id={"howto1"} title={"Exporting the report data."} status={selectedItems.includes("") ? true : false} onClick={()=>{}} />
                <List.CheckboxListItem id={"howto1"} title={"Creating targets for a report type."} status={selectedItems.includes("") ? true : false} onClick={()=>{}} />
                <List.CheckboxListItem id={"howto1"} title={"View a generated summary description."} status={selectedItems.includes("") ? true : false} onClick={()=>{}} />
                <List.CheckboxListItem id={"howto1"} title={"Configuring alerts for a report type."} status={selectedItems.includes("") ? true : false} onClick={()=>{}} />
              </WEAccordion.Panel.Content>
            </WEAccordion.Panel>
          </WEAccordion>
        </Card>
      </ScrollView>

      
      
      <div style={{flex:"1"}}></div>
      <FlexRow p="1rem 0">
        <PrimaryButton size="md" onClick={() => close()}>Close</PrimaryButton>
      </FlexRow>
    </View>
  );
}

export default SettingsModalView;