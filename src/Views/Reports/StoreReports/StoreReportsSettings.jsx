import PrimaryButton from '../../../Components/Buttons/PrimaryButton';
import FlexRow from '../../../Components/FlexComponents/FlexRow';
import Card from '../../Templates/Components/Cards/Card';
import View from '../../Templates/View/View';
import knowledgeIcon from '../../../assets/images/knowledgeIcon.png';
import List from '../../../Components/Lists/List';
import { useCallback, useState } from 'react';
import FlexColumn from '../../../Components/FlexComponents/FlexColumn';
import ScrollView from '../../../Components/ScrollView/ScrollView';
import WEAccordion from '../../../Components/WEAccordion/WEAccordion';
import SecondaryButton from '../../../Components/Buttons/SecondaryButton';
import { faqs } from '../../../AppData/Faqs/StoreReportFaqs';
import useAppSettings from '../../../hooks/useAppSettings';
import Sort from '../../../Utils/Sort';
import { reportWidgets } from '../../../Components/Widgets/widgets';
import useNavigateView from '../../../hooks/useNavigateView';
import useAppContext from '../../../hooks/useAppContext';



const StoreReportsSettings = () => {
  const {getViewSetting,updateViewSetting} = useAppSettings("view","storeReports");
  const settingWidgets = getViewSetting("storeReports","widgets");
  const [selectedItems,setSelectedItems] = useState([...settingWidgets.map(d=>d.id)]);
  const {state} = useAppContext();
  const navigate = useNavigateView();

  const closeAndSave = useCallback((e) => {
    updateViewSetting("storeReports","widgets",reportWidgets.filter(w => selectedItems.includes(w.id)));
    navigate("/report/stores");
  },[updateViewSetting,selectedItems])

  const onListItemClick = (e,id) => {
    ;
    if (selectedItems.includes(id)) {
      setSelectedItems([...selectedItems.filter(i => i !== id)]);
      viewSettings.updateSettings("viewSettings","storeReports","widgets",reportWidgets.filter(w => [...selectedItems.filter(i => i !== id)].includes(w.id)));
      return;
    }

    setSelectedItems([...selectedItems,id])
    viewSettings.updateSettings("viewSettings","storeReports","widgets",reportWidgets.filter(w => [...selectedItems,id].includes(w.id)));
  }
  
  const toggleSelectAll = () => {
    ;
    if (selectedItems.length === reportWidgets.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(reportWidgets.map(item => item.id));
    }
  };
  
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

        {/* <View.SectionTitle m='2rem 0 .5rem 0'>Report order</View.SectionTitle>
        <Card>  
            {Sort.byOrder(viewSettings.settings,"asc").map(widget => {
              return (
                <List.DraggableListItem key={widget.id} id={widget.id} title={widget.title} status={selectedItems.includes(widget.id) ? true : false} onClick={()=>{}} />
              )
            })}
        </Card> */}

        <View.SectionTitle m='2rem 0 .5rem 0'>Report Widgets</View.SectionTitle>
        <Card>
          <List.Header title="Widgets" selected={selectedItems.length} total={reportWidgets.length} />
          <List.SelectAll isAllSelected={isAllSelected} isSomeSelected={isSomeSelected} onClick={toggleSelectAll} />
          
            {Sort.byOrder(reportWidgets,"asc").map(widget => {
              return (
                <List.CheckboxListItem 
                  key={widget.id} 
                  id={widget.id} 
                  title={widget.title} 
                  status={selectedItems.includes(widget.id) ? true : false} 
                  onClick={onListItemClick} 
                  dragable={true} />
              )
            })}
        </Card>

        <View.SectionTitle m='2rem 0 .5rem 0'>Report Alerts</View.SectionTitle>
        <Card>
          <FlexColumn g='1rem'>
            <List.DraggableListItem key={"under"} id={"under"} title={"Under performing sales"}  onClick={()=>{}} />
            <List.DraggableListItem key={"Upcoming trend"} id={"Upcoming trend"} title={"Upcoming trend"}  onClick={()=>{}} />
            <FlexRow>
              <SecondaryButton>Create Alert</SecondaryButton>
            </FlexRow>
          </FlexColumn>
        </Card>

        <View.SectionTitle m='2rem 0 .5rem 0'>Help</View.SectionTitle>
        <Card>
          <WEAccordion>
            <WEAccordion.Panel>
              <WEAccordion.Panel.Header>
                <h3>FAQs</h3>
              </WEAccordion.Panel.Header>
              <WEAccordion.Panel.Content>
                {faqs.filter(f => f.group === "faq").map(faq => {
                  return (
                    <List.CheckboxListItem id={`${faq.group}_${faq.id}`} title={faq.question} status={selectedItems.includes("") ? true : false} onClick={()=>{}} />
                  )
                })}
              </WEAccordion.Panel.Content>
            </WEAccordion.Panel>
            <WEAccordion.Panel>
              <WEAccordion.Panel.Header>
                <h3>How To's</h3>
              </WEAccordion.Panel.Header>
              <WEAccordion.Panel.Content>
                {faqs.filter(f => f.group === "howto").map(faq => {
                  return (
                    <List.CheckboxListItem id={`${faq.group}_${faq.id}`} title={faq.question} status={selectedItems.includes("") ? true : false} onClick={()=>{}} />
                  )
                })}
              </WEAccordion.Panel.Content>
            </WEAccordion.Panel>
          </WEAccordion>
        </Card>

        {state.organization === "2" && (<a href='https://gldspocketreports.com/tools/' style={{color:"snow"}}>Barcode Scanner</a>)}

      </ScrollView>

      
      
      <div style={{flex:"1"}}></div>
      <FlexRow p="1rem 0">
        <PrimaryButton size="md" onClick={closeAndSave}>Close</PrimaryButton>
      </FlexRow>
    </View>
  );
}

export default StoreReportsSettings;