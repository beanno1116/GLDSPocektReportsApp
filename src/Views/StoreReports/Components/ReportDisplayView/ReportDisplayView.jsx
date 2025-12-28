
import { useState } from 'react';
import Button from '../../../../Components/Buttons/Button';
import FlexColumn from '../../../../Components/FlexComponents/FlexColumn';
import FlexRow from '../../../../Components/FlexComponents/FlexRow';
import Heading from '../../../../Components/Labels/Heading';
import Toolbar from '../../../../Components/Toolbar/Toolbar';
import styles from './reportDisplayView.module.css';


import ToolbarViewHandler from './Components/ToolbarViewHandler';
import OutlineCalendarIcon from '../../../../assets/icons/OutlineCalendarIcon';
import OutlineRefreshIcon from '../../../../assets/icons/OutlineRefreshIcon';
import SendIcon from '../../../../assets/icons/SendIcon';
import ExportIcon from '../../../../assets/icons/ExportIcon';
import { useFetchReportData } from '../../../../Api/ApiRoutes';
import Mutate from '../../../../Utils/Mutate';
import ChevronIcon from '../../../../assets/icons/ChevronIcon';
import WEAccordion from '../../../../Components/WEAccordion/WEAccordion';
import ScrollView from '../../../../Components/ScrollView/ScrollView';

import { handleZeroValue } from '../../../../Utils/Utils';

import HorizontalScrollView from '../../../../Components/ScrollView/HorizontalScrollView';



const views = {
  range: "Range",
  share: "Share",
  export: "Export"
}

const reportToolbarButtons = [
  {
    id: 1,
    name: "",
    icon: <OutlineRefreshIcon size={30} color='snow' />,
    action: "refresh"
  },
  {
    id: 2,
    name: "",
    icon: <OutlineCalendarIcon size={30} color='snow' />,
    action: "range"
  },
  {
    id: 3,
    name: "",
    icon: <SendIcon size={30} color='snow' />,
    action: "share"
  },
  {
    id: 4,
    name: "",
    icon: <ExportIcon size={30} color='snow' />,
    action: "export"
  },
]
const cardToolbarItems = [

  {
    id: 2,
    name: "",
    icon: <OutlineCalendarIcon size={30} color='snow' />,
    action: "range"
  },
  {
    id: 3,
    name: "",
    icon: <SendIcon size={30} color='snow' />,
    action: "share"
  },
  {
    id: 4,
    name: "",
    icon: <ExportIcon size={30} color='snow' />,
    action: "export"
  },
    {
    id: 1,
    name: "",
    icon: <ChevronIcon size={30} />,
    action: "refresh"
  }
]

const safeDetailQueries = [
  {
    action: "SafeDetails",
    adapter: (data) => {
      
      const adaptedData = Mutate.safeDetailsData(data);
      return adaptedData;
      
    }
  }
  ,
  {
    action: "Stats",
    adapter: (data) => {
      const adaptedData = Mutate.storeStatsData(data);
      return adaptedData;
    }
  }
]


const Label = ({text}) => {
  return (
    <label className={styles.detail_row_header_label}>{text}</label>
  )
}

const SubLabel = ({text}) => {
  return (
    <span className={styles.detail_row_header_sublabel}>{text}</span>
  )
}

const LabelRow = ({label,value}) => {
  return (
    <div className={styles.details_row_label_row}>
      <label className={styles.details_row_label_row_label}>{label}</label>                  
      <span className={styles.details_row_label_row_value}>{value}</span>
    </div>
  )
}


const ReportViewToolbar = ({ buttons,eventHandler }) => {

  const onToolbarClick = (e) => {
    eventHandler && eventHandler(e);
  }

  return (
    <FlexRow p='0 1rem 1rem 1rem'>
      <Toolbar buttons={buttons} onClick={onToolbarClick} />
    </FlexRow>
  )
}

const ReportViewTitle = ({size,mode="lite",children}) => {
  return (
    <FlexRow p='1rem 1rem .25rem 1rem'>
      <Heading size={size} mode={mode}>{children}</Heading>
    </FlexRow>
  )
}

const ReportViewPeriodDisplay = ({start,end}) => {
  return (
    <FlexRow p='0 0 1rem 0' hAlign='center'>
      <div style={{fontSize:"1.25rem",fontWeight:"900",color:"snow"}}>
        <span>{start}</span> to <span>{end}</span></div>
    </FlexRow>
  )
}

const ReportViewButtonRow = ({children}) => {
  return (
    <FlexRow g='1rem' p='1rem'>
      {children}
    </FlexRow>
  )
}

{/* Hero section */}
const ReportViewHeroRow = ({children}) => {
  return (
    <FlexRow  p='.25rem 1rem' g='1rem'>
      {children}
      {/* <Hero theme='blue' spacing='between'>
        <Hero.Title>Total Sales</Hero.Title>
        <Hero.Value>{Format.moneyAbbreviation(4734.54)}</Hero.Value>
      </Hero>
      <Hero theme="blue" spacing='between'>
        <Hero.Title>Sale Count</Hero.Title>
        <Hero.Value>111</Hero.Value>
      </Hero> */}
    </FlexRow>
  )
}

const ReportViewHeading = ({children}) => {
  return (
    <FlexRow p='.25rem 1rem'>
      <Heading size='sm' mode='light' textAlign='left'>{children}</Heading>
    </FlexRow>
  )
}

const ReportViewPinnedRow = ({children}) => {
  return (
    <FlexRow p='.25rem 1rem'>
      <HorizontalScrollView>
        {children}
      </HorizontalScrollView>
    </FlexRow>
  )
}

const ReportViewScrollView = ({children}) => {
  return (
    <FlexRow flex='1' p='.75rem 1rem'>

      <ScrollView>
        {children}
        
        {/* <FlexRow  p='0 1rem 1rem 1rem' g='1rem'>
          <Card flex='1'>
            <Card.Content>
              <Card.Title>Statistics</Card.Title>
              <FlexRow p='.5rem'></FlexRow>
              <FlexRow g='1rem'>
                <Hero theme='green'>
                  <Hero.Title>Refunds</Hero.Title>
                  <Hero.Value>12</Hero.Value>
                </Hero>
                <Hero theme='red'>
                  <Hero.Title>No Sales</Hero.Title>
                  <Hero.Value>30</Hero.Value>
                </Hero>
              </FlexRow>
              <FlexRow p='.5rem'></FlexRow>
              <Button size='lg'>See Summary</Button>
            </Card.Content>
          </Card>
        </FlexRow>

        <FlexRow  p='0 1rem 1rem 1rem' g='1rem'>
          <Card flex='1'>
            <Card.Content>
              <Card.Title>Safe</Card.Title>
              <FlexRow p='.5rem'></FlexRow>
              <FlexRow g='1rem'>
                <Hero theme='green'>
                  <Hero.Title>Refunds</Hero.Title>
                  <Hero.Value>12</Hero.Value>
                </Hero>
                <Hero theme='red'>
                  <Hero.Title>No Sales</Hero.Title>
                  <Hero.Value>30</Hero.Value>
                </Hero>
              </FlexRow>
              <FlexRow p='.5rem'></FlexRow>
              <Button size='lg'>See Summary</Button>
            </Card.Content>
          </Card>
        </FlexRow>

        <FlexRow  p='0 1rem 1rem 1rem' g='1rem'>
          <Card flex='1'>
            <Card.Content>
              <Card.Title>Drawers</Card.Title>
              <FlexRow p='.5rem'></FlexRow>
              <FlexRow g='1rem'>
                <Hero theme='green'>
                  <Hero.Title>Refunds</Hero.Title>
                  <Hero.Value>12</Hero.Value>
                </Hero>
                <Hero theme='red'>
                  <Hero.Title>No Sales</Hero.Title>
                  <Hero.Value>30</Hero.Value>
                </Hero>
              </FlexRow>
              <FlexRow p='.5rem'></FlexRow>
              <Button size='lg'>See Summary</Button>
            </Card.Content>
          </Card>
        </FlexRow>

        <FlexRow p='0 1rem 1rem 1rem' g='1rem'>
          <DetailRow></DetailRow>
        </FlexRow>

        <FlexRow p='0 1rem 1rem 1rem' g='1rem'>
          <Card flex='1'>
            <Card.Content>
              <Card.Title>Safe Information</Card.Title>
            </Card.Content>
          </Card>
        </FlexRow>

        <FlexRow  p='0 1rem 1rem 1rem' g='1rem'>
          <Card flex='1'>
            <Card.Content>
              <Card.Title>Drawer Information</Card.Title>
            </Card.Content>
          </Card>
        </FlexRow> */}

      </ScrollView>
      
    </FlexRow>
  )
}







const ReportDisplayView = ({ subViews,report,close,children }) => {
  const {status,data} = useFetchReportData({action:"Stats",mutate:Mutate.storeStatsData});
  const [isToolbarViewShowing,setIsToolbarViewShowing] = useState(false);
  const [selectedView,setSelectedView] = useState("");

  const onToolbarClick = (action) => {
    
    setIsToolbarViewShowing(true);
    setSelectedView(views[action]);
  }

  if (status.isLoading){
    
    const temp = data;
    console.log("Loaded")
    return (
      <div>Loading....</div>
    )
  }
  

  const renderStoreStats = (data) => {

    let statGroups = Object.keys(data);

    return statGroups.map(group => {
      return (
              <div className={styles.display_row} style={{marginBottom:"1rem"}}>
          <WEAccordion>
            <WEAccordion.Panel>
              <WEAccordion.Panel.Header>
                <Label text={group} />
                <SubLabel text={""} />
                {/* <label style={{fontSize:"1.5rem",fontWeight:"900",color:"#0316028d",textAlign:"left"}}>{data.sales[0].group}</label>
                <span style={{flex:"1",fontSize:"1rem",fontWeight:"700",textAlign:"right"}}></span> */}
                
              </WEAccordion.Panel.Header>
                
              <WEAccordion.Panel.Content>
                {data[group].map(stat => {
                  return (
                    <>
                      <FlexColumn width='100%'>
                        <div style={{width:"100%",display:"inline-flex",justifyContent:"space-between",padding:".25rem 1rem"}}>
                          <label style={{flex:"2",fontSize:"1.25rem",fontWeight:"500",color:"#F1F3FF"}}>{stat.description}</label>                  
                          {/* <span style={{flex:"1",fontSize:"1.25rem",fontWeight:"500",color:"#F1F3FF",textAlign:"right"}}>{Format.totalSalesShort(stat.total)}</span> */}
                          <span style={{flex:"1",fontSize:"1.25rem",fontWeight:"500",color:"#F1F3FF",textAlign:"right"}}>${handleZeroValue(stat.total)}</span>
                        </div>

                      </FlexColumn>              
                    </>
                  )
                })}

                <FlexColumn width='100%' p='.5rem'>
                <Button>View Details</Button>

              </FlexColumn>
              </WEAccordion.Panel.Content>
            </WEAccordion.Panel>
          </WEAccordion>
        </div>
      )
    })



  }
  
  return (
    <div className={`${styles.report_display_view}`}>

        <ToolbarViewHandler views={subViews} when={isToolbarViewShowing} close={() => setIsToolbarViewShowing(false)} view={selectedView} />

        <FlexColumn width='100%' height='100%'>
          {children}
        </FlexColumn>
        
    </div>
  );
}

ReportDisplayView.Toolbar = ReportViewToolbar;
ReportDisplayView.Title = ReportViewTitle;
ReportDisplayView.PeriodDisplay = ReportViewPeriodDisplay;
ReportDisplayView.ButtonRow = ReportViewButtonRow;
ReportDisplayView.QuickStats = ReportViewHeroRow;
ReportDisplayView.PinnedRow = ReportViewPinnedRow;
ReportDisplayView.ScrollView = ReportViewScrollView;
ReportDisplayView.Heading = ReportViewHeading;
 
export default ReportDisplayView;