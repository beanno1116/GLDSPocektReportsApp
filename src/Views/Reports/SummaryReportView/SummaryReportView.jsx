
import { useQueries } from '@tanstack/react-query';
import { useApiClient } from '../../../Api/Api';
import EditIcon from '../../../assets/icons/EditIcon';
import ExportIcon from '../../../assets/icons/ExportIcon';
import HomeIcon from '../../../assets/icons/HomeIcon';
import OutlineCalendarIcon from '../../../assets/icons/OutlineCalendarIcon';
import OutlineRefreshIcon from '../../../assets/icons/OutlineRefreshIcon';
import SendIcon from '../../../assets/icons/SendIcon';
import SolidCalendarIcon from '../../../assets/icons/SolidCalendarIcon';
import BottomNav from '../../../Components/BottomNav/BottomNav';
import TileButton from '../../../Components/Buttons/TileButton';
import DetailRow from '../../../Components/Cards/Components/DetailRow';
import Hero from '../../../Components/Heros/Hero';
import useAppContext from '../../../hooks/useAppContext';
import Format from '../../../Utils/Format';
import ReportDisplayView from '../../StoreReports/Components/ReportDisplayView/ReportDisplayView';
import styles from './summaryReportView.module.css';
import siteStyles from '../../../site.module.css';
import Mutate from '../../../Utils/Mutate';
import Card from '../../../Components/Cards/Card';
import FlexRow from '../../../Components/FlexComponents/FlexRow';
import FlexColumn from '../../../Components/FlexComponents/FlexColumn';
import Button from '../../../Components/Buttons/Button';
import FavoriteReportsIcon from '../../../assets/icons/FavoriteReportsIcon';
import ReportOptionIcon from '../../../assets/icons/ReportOptionIcon';
import SolidBackIcon from '../../../assets/icons/SolidBackIcon';
import { useState } from 'react';
import Heading from '../../../Components/Labels/Heading';
import HeaderLabel from '../../../Components/Labels/HeaderLabel';
import SolidThumbtackIcon from '../../../assets/icons/SolidThumbTackIcon';
import PeriodSelectorButton from '../../../Components/Buttons/PeriodSelectorButton';
import QVReport from '../../../Components/QuickView/Components/Template/QVReport';
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import ScrollView from '../../../Components/ScrollView/ScrollView';
import { motion } from "motion/react";

const devChartData = [
      {
          "name": "Sun",
          "thisWeekSales": 57027.62,
          "lastWeekSales": 43767.74
      },
      {
          "name": "Mon",
          "thisWeekSales": 77767.04,
          "lastWeekSales": 44735.72
      },
      {
          "name": "Tue",
          "thisWeekSales": 110399.73,
          "lastWeekSales": 44521.24
      },
      {
          "name": "Wed",
          "thisWeekSales": 0,
          "lastWeekSales": 43557.11
      },
      {
          "name": "Thu",
          "thisWeekSales": 0,
          "lastWeekSales": 46542.75
      },
      {
          "name": "Fri",
          "thisWeekSales": 0,
          "lastWeekSales": 43212.67
      },
      {
          "name": "Sat",
          "thisWeekSales": 0,
          "lastWeekSales": 52250.66
      }
    ]

const cardToolbarItems = [

  {
    id: 2,
    name: "",
    icon: <SolidBackIcon size={36} color='snow' />,
    action: "/reports/store"
  },
  {
    id: 3,
    name: "",
    icon: <HomeIcon size={36} color='snow' />,
    action: "/"
  },
  {
    id: 4,
    name: "",
    icon: <HomeIcon size={36} color='snow' />,
    action: "/"
  },
    {
    id: 1,
    name: "",
    icon: <HomeIcon size={36} color='snow' />,
    action: "/"
  }
]

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

const slideMenutStyles = {
  position:"absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  background: "#555",
  zIndex: "1"
}

const SummaryReportView = ({ report,closeView,...props }) => {
  const [panelShowing,setPanelShowing] = useState(false);
  const api = useApiClient();
  const {state} = useAppContext();
  const results = useQueries({
    queries: safeDetailQueries.map(query => ({
      queryKey: [query.action,state.agentString],
      queryFn: async () => {         
        const response = await api.post("data",{action:query.action,agentString:state.agentString},{...api.headers.applicationJson}); 
        if (response.success){
          
          const adaptedData = query.adapter(response.data);
          
          return adaptedData;
        }  
        throw new Error("Newtwork response was unsuccessfull");
      }      
    }))
  })

  const onBottomNavClick = (e) => {    
    closeView && closeView(e);
  }

  const viewData = results.map(r => r.data);
  const isLoading = results.some(r => r.isLoading);
  const isError = results.some(r => r.isError);

  if (isLoading){
    return (
      <div>Loading....</div>
    )
  }
  
  if (isError){
    return (
      <div>ERROR!!</div>
    )
  }

  const temp = {
    safe: viewData[0],
    stats: viewData[1]
  }
  debugger;

  const onCardViewButtonClick = (e,action) => {
    setPanelShowing(!panelShowing);
  }
  return (
    <ReportDisplayView>

      {
        <div id="test" className={`${styles.panel_view_container} ${panelShowing ? styles.visible : ""}`}>
          <FlexColumn width='100%' height='100%' g='.5rem'>

            <Heading size='lg' mode='lite'>Sales Summary</Heading>

            <FlexRow flex='1'>


              
              
              <div style={{position:"relative",width:"100%",height:"100%",overflowY:"scroll"}}>
                

                <div style={{height:"75%",padding:"0 1rem"}}>
                  <QVReport status={true}>
                    <QVReport.Title mode='lite' text="Total Sales" />
                    <QVReport.PeriodSelector />
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={devChartData} margin={{top:0,right:0,left:-25,bottom:0}}>
                        <Tooltip />
                        <Line type="monotone" dataKey="thisWeekSales" stroke="#ff0fef" fill='#ff0fef' strokeWidth={4} />              
                        <Line type="monotone" dataKey="lastWeekSales" stroke="#82ca9d" fill='#82ca9d' strokeWidth={4} />              
                        <XAxis dataKey="name" stroke="snow" tickLine={false} axisLine={false} padding={{right:30}} />
                        <YAxis mirror={false} yAxisId={1} stroke="snow" hide={false} tickLine={false} axisLine={false} />
                        <Legend />
                      </LineChart>
                    </ResponsiveContainer>
                  </QVReport>
                </div>

                <div className={styles.section_bg} style={{position:"sticky",top:"0",height:"100%",marginTop:"1rem"}}>
                  <div style={{position:"relative",width:"100%",height:"100%",padding:"1rem",overflowY:"scroll"}}>
                    <ScrollView>
                      <HeaderLabel>
                        <FlexColumn width='100%' g='1rem'>
                          <span>Total Sales</span>
                          <span style={{textAlign:"right",width:"100%"}}>$77,706.42</span>
                        </FlexColumn>
                      </HeaderLabel>
                      <HeaderLabel>
                        <FlexColumn width='100%' g='1rem'>
                          <span>Net Sales</span>
                          <span style={{textAlign:"right",width:"100%"}}>$77,706.42</span>
                        </FlexColumn>
                      </HeaderLabel>
                      <HeaderLabel>
                        <FlexColumn width='100%' g='1rem'>
                          <span>Hash Sales</span>
                          <span style={{textAlign:"right",width:"100%"}}>$77,706.42</span>
                        </FlexColumn>
                      </HeaderLabel>
                      <HeaderLabel>
                        <FlexColumn width='100%' g='1rem'>
                          <span>Grand Total</span>
                          <span style={{textAlign:"right",width:"100%"}}>$77,706.42</span>
                        </FlexColumn>
                      </HeaderLabel>
                      <HeaderLabel>
                        <FlexColumn width='100%' g='1rem'>
                          <span>Grand Total Training</span>
                          <span style={{textAlign:"right",width:"100%"}}>$77,706.42</span>
                        </FlexColumn>
                      </HeaderLabel>
                      <HeaderLabel>
                        <FlexColumn width='100%' g='1rem'>
                          <span>Grand Total Training</span>
                          <span style={{textAlign:"right",width:"100%"}}>$77,706.42</span>
                        </FlexColumn>
                      </HeaderLabel>
                      <HeaderLabel>
                        <FlexColumn width='100%' g='1rem'>
                          <span>Grand Total Training</span>
                          <span style={{textAlign:"right",width:"100%"}}>$77,706.42</span>
                        </FlexColumn>
                      </HeaderLabel>
                      <HeaderLabel>
                        <FlexColumn width='100%' g='1rem'>
                          <span>Grand Total Training</span>
                          <span style={{textAlign:"right",width:"100%"}}>$77,706.42</span>
                        </FlexColumn>
                      </HeaderLabel>
                    </ScrollView>
                    
                  </div>
                </div>

              </div>

            </FlexRow>



            <Button theme='lite' size='lg' onClick={onCardViewButtonClick}>Close</Button>
            
          </FlexColumn>
        </div>
      }


      <ReportDisplayView.Title size="lg">{report.title}</ReportDisplayView.Title>

      <ReportDisplayView.Toolbar buttons={reportToolbarButtons} eventHandler={() => {}} />
      
      <ReportDisplayView.QuickStats>
        <Hero theme='blue' spacing='between'>
            <Hero.Title>Total Sales</Hero.Title>
            <Hero.Value>{Format.moneyAbbreviation(parseFloat(temp.stats.totalSales.total))}</Hero.Value>
          </Hero>
          <Hero theme="blue" spacing='between'>
            <Hero.Title>Sale Count</Hero.Title>
            <Hero.Value>{temp.stats.totalSales.quantity}</Hero.Value>
          </Hero>
      </ReportDisplayView.QuickStats>

      <ReportDisplayView.Heading>
        Pinned
      </ReportDisplayView.Heading>

      <ReportDisplayView.PinnedRow>
        <TileButton>
          <SolidCalendarIcon size={35} />
          <span style={{fontSize:"1rem"}}>
            Sales
          </span>
        </TileButton>
        <TileButton>
          <SolidCalendarIcon size={35} />
          <span style={{fontSize:"1rem"}}>
            Statistics
          </span>
        </TileButton>
        <TileButton circle={true}>
          <EditIcon size={35} />
        </TileButton>
      </ReportDisplayView.PinnedRow>



      <ReportDisplayView.ScrollView>
        
        <Card>
          <Card.Content>
            <FlexColumn g='1rem'>
              <FlexRow width='100%' g='1rem'>
                <FlexColumn flex='3' g='1rem'>
                  <div className={styles.gradient_heading} style={{width:"100%",fontSize:"3rem",fontWeight:"800",lineHeight:1}}>Sales</div>
                  {/* <div style={{width:"100%",fontSize:"1.75rem"}}>Total Sales: $77,701.43</div> */}
                </FlexColumn>
                <FlexColumn hAlign='center' vAlign='flex-end' g='1rem'>
                  <button className={styles.icon_button}>
                    <SolidThumbtackIcon size={34} color="snow"/>
                  </button>
                  <button className={styles.icon_button}>
                    <ReportOptionIcon size={32} color="snow" />
                  </button>
                </FlexColumn>
              </FlexRow>
            <Button action="sales" size='lg' theme='dark' onClick={onCardViewButtonClick}>View Summary</Button>
            </FlexColumn>
          </Card.Content>
        </Card>
        
        <Card>
          <Card.Content>
            <FlexColumn g='1rem'>
              <FlexRow width='100%'>
                <FlexColumn flex='3' g='1rem'>
                  <div style={{width:"100%",fontSize:"3rem",fontWeight:"800",lineHeight:1}}>Safe</div>
                  {/* <div style={{width:"100%",fontSize:"1.75rem"}}>Total Sales: $77,701.43</div> */}
                </FlexColumn>
                <FlexColumn hAlign='center' vAlign='flex-end' g='1rem'>
                  <button className={styles.icon_button}>
                    <SolidThumbtackIcon size={34} color="snow"/>
                  </button>
                  <button className={styles.icon_button}>
                    <ReportOptionIcon size={32} color="snow" />
                  </button>
                </FlexColumn>
              </FlexRow>
            <Button action="safe" size='lg' theme='dark' onClick={onCardViewButtonClick}>View Summary</Button>
            </FlexColumn>
          </Card.Content>
        </Card>
        
        <Card>
          <Card.Content>
            <FlexColumn g='1rem'>
              <FlexRow width='100%'>
                <FlexColumn flex='3' g='1rem'>
                  <div style={{width:"100%",fontSize:"3rem",fontWeight:"800",lineHeight:1}}>Drawer</div>
                  {/* <div style={{width:"100%",fontSize:"1.75rem"}}>Total Sales: $77,701.43</div> */}
                </FlexColumn>
                <FlexColumn hAlign='center' vAlign='flex-end' g='1rem'>
                  <button className={styles.icon_button}>
                    <SolidThumbtackIcon size={34} color="snow"/>
                  </button>
                  <button className={styles.icon_button}>
                    <ReportOptionIcon size={32} color="snow" />
                  </button>
                </FlexColumn>
              </FlexRow>
            <Button action="drawer" size='lg' theme='dark' onClick={onCardViewButtonClick}>View Summary</Button>
            </FlexColumn>
          </Card.Content>
        </Card>
        
        <Card>
          <Card.Content>
            <FlexColumn g='1rem'>
              <FlexRow width='100%'>
                <FlexColumn flex='3' g='1rem'>
                  <div style={{width:"100%",fontSize:"3rem",fontWeight:"800",lineHeight:1}}>Statistics</div>
                  {/* <div style={{width:"100%",fontSize:"1.75rem"}}>Total Sales: $77,701.43</div> */}
                </FlexColumn>
                <FlexColumn hAlign='center' vAlign='flex-end' g='1rem'>
                  <button className={styles.icon_button}>
                    <SolidThumbtackIcon size={34} color="snow"/>
                  </button>
                  <button className={styles.icon_button}>
                    <ReportOptionIcon size={32} color="snow" />
                  </button>
                </FlexColumn>
              </FlexRow>
            <Button action="stats" size='lg' theme='dark' onClick={onCardViewButtonClick}>View Summary</Button>
            </FlexColumn>
          </Card.Content>
        </Card>

      </ReportDisplayView.ScrollView>

      <BottomNav buttons={cardToolbarItems} eventHandler={onBottomNavClick} />

    </ReportDisplayView>
  );
}

export default SummaryReportView;