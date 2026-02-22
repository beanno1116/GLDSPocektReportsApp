
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
import DragableList from '../../../../Components/Lists/DragableList';
import SecondaryButton from '../../../../Components/Buttons/SecondaryButton';
import { faqs } from '../../../../AppData/Faqs/StoreReportFaqs';
import useAppSettings from '../../../../hooks/useAppSettings';
import Sort from '../../../../Utils/Sort';
import SaleTotalsBarChart from '../Components/Widgets/SaleTotalsBarChart';
import SalesKpiGrid from '../Components/Widgets/SalesKpiGrid';
import MarkdownTotals from '../Components/Widgets/MarkdownTotals';
import SafeDrawerButtonGrid from '../Components/Widgets/SafeDrawerButtonGrid';
import LoyaltyTotals from '../Components/Widgets/LoyaltyTotals';
import CouponTotals from '../Components/Widgets/CouponTotals';
import ExceptionTotals from '../Components/Widgets/ExceptionTotals';
import ReportToolsButtonGrid from '../Components/Widgets/ReportTools';
import TaxTotals from '../Components/Widgets/TaxTotals';
import TransactionTotals from '../Components/Widgets/TransactionTotals';
import ToolGrid from '../Components/Widgets/ToolGrid';


const reportWidgets = [
  {
    id: 1,
    order: 1,
    title: "This Week",
    source: "weekData",
    link: "SalesTotalsBarChart",
    name: 'SalesTotalsBarChart',
    Widget: SaleTotalsBarChart,
  },
  {
    id: 2,
    order: 2,
    title: "Sales",
    source: "salesData",
    link: "SalesTotals",
    name: 'SalesKpiGrid',
    Widget: SalesKpiGrid,
  },
  {
    id: 3,
    order: 3,
    title: "Markdowns",
    source: "markdownData",
    link: "MarkdownTotals",
    name: 'MarkdownTotals',
    Widget: MarkdownTotals,
  },
  {
    id: 4,
    order: 4,
    title: "Safe & Drawer",
    link: "SafeDrawer",
    name: 'ButtonGrid',
    Widget: SafeDrawerButtonGrid,
  },
  {
    id: 5,
    order: 5,
    title: "Loyalty",
    source: "loyaltyData",
    link: "LoyaltyTotals",
    name: 'LoyaltyTotals',
    Widget: LoyaltyTotals,
  },
  {
    id: 6,
    order: 6,
    title: "Coupons",
    source: "couponData",
    link: "CouponTotals",
    name: 'CouponTotals',
    Widget: CouponTotals,
  },
  {
    id: 8,
    order: 8,
    title: "Exceptions",
    source: "exceptionData",
    link: "ExceptionTotals",
    name: 'ExceptionTotals',
    Widget: ExceptionTotals,
  },
  {
    id: 10,
    order: 10,
    title: "Report Tools",
    link: "ReportTools",
    name: 'ReportToolsButtonGrid',
    Widget: ReportToolsButtonGrid,
  },
  {
    id: 7,
    order: 7,
    title: "Taxes",
    source: "taxData",
    link: "TaxTotals",
    name: 'TaxTotals',
    Widget: TaxTotals,
  },
  {
    id: 9,
    order: 9,
    title: "Transactions",
    source: "transactionData",
    link: "TransactionTotals",
    name: 'TransactionTotals',
    Widget: TransactionTotals,
  },
  {
    id: 11,
    order: 10,
    title: "Tools",
    link: "ReportTools",
    name: 'ToolGrid',
    Widget: ToolGrid,
  }
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
  const viewSettings = useAppSettings();
  const [selectedItems,setSelectedItems] = useState([...viewSettings.settings.map(d=>d.id)]);

  const closeAndSave = (e) => {
    viewSettings.updateSettings("viewSettings","storeReports","widgets",reportWidgets.filter(w => selectedItems.includes(w.id)));
    close && close(e)
  }

  const onListItemClick = (e,id) => {
    debugger;
    if (selectedItems.includes(id)) {
      setSelectedItems([...selectedItems.filter(i => i !== id)]);
      viewSettings.updateSettings("viewSettings","storeReports","widgets",reportWidgets.filter(w => [...selectedItems.filter(i => i !== id)].includes(w.id)));
      return;
    }

    setSelectedItems([...selectedItems,id])
    viewSettings.updateSettings("viewSettings","storeReports","widgets",reportWidgets.filter(w => [...selectedItems,id].includes(w.id)));
  }
  
  const toggleSelectAll = () => {
    debugger;
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

        <View.SectionTitle m='2rem 0 .5rem 0'>Report order</View.SectionTitle>
        <Card>  
          {/* <DragableList initialItems={reportWidgetArr} />   */}
            {Sort.byOrder(viewSettings.settings,"asc").map(widget => {
              return (
                <List.DraggableListItem key={widget.id} id={widget.id} title={widget.title} status={selectedItems.includes(widget.id) ? true : false} onClick={()=>{}} />
              )
            })}
        </Card>

        <View.SectionTitle m='2rem 0 .5rem 0'>Report Widgets</View.SectionTitle>
        <Card>
          <List.Header title="Widgets" selected={selectedItems.length} total={reportWidgets.length} />
          <List.SelectAll isAllSelected={isAllSelected} isSomeSelected={isSomeSelected} onClick={toggleSelectAll} />
          
            {reportWidgets.map(widget => {
              return (
                <List.CheckboxListItem key={widget.id} id={widget.id} title={widget.title} status={selectedItems.includes(widget.id) ? true : false} onClick={onListItemClick} />
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
      </ScrollView>

      
      
      <div style={{flex:"1"}}></div>
      <FlexRow p="1rem 0">
        <PrimaryButton size="md" onClick={closeAndSave}>Close</PrimaryButton>
      </FlexRow>
    </View>
  );
}

export default SettingsModalView;