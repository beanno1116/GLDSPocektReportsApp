
import { useNavigate } from 'react-router';
import HomeIcon from '../../assets/icons/HomeIcon';
import BottomNav from '../../Components/BottomNav/BottomNav';
import FlexColumn from '../../Components/FlexComponents/FlexColumn';
import Heading from '../../Components/Labels/Heading';
import View from '../Templates/View/View';
import styles from './storeReportsView.module.css';
import ReportView from '../Templates/ReportView/ReportView';
import { useState } from 'react';
import IconButton from '../../Components/Buttons/IconButton';
import XIcon from '../../assets/icons/XIcon';
import PanelViewManager from './Components/PanelViewManager';
import ReportDisplayView from './Components/ReportDisplayView/ReportDisplayView';

const reports = {
  financial: [
    {
      title: "Total Summary"
    },
    {
      title: "Balance Sheet",
    },
    {
      title: "Multi Total",
    },
    {
      title: "Single Total",
    },
  ],
  departments: [
    {
      title: "Multi Total",
    },
    {
      title: "Single Total",
    },
    {
      title: "Sales vs Last Year",
    },
    {
      title: "Cost of Goods Sold",
    },
  ],
  subdepartments: [
    {
      title: "Multi Total",
    },
    {
      title: "Single Total",
    },
    {
      title: "Sales vs Last Year",
    },
    {
      title: "Cost of Goods Sold",
    },
  ]
}

const cardToolbarItems = [

  {
    id: 2,
    name: "",
    icon: <HomeIcon size={30} color='snow' />,
    action: "range"
  },
  {
    id: 3,
    name: "",
    icon: <HomeIcon size={30} color='snow' />,
    action: "share"
  },
  {
    id: 4,
    name: "",
    icon: <HomeIcon size={30} color='snow' />,
    action: "export"
  },
    {
    id: 1,
    name: "",
    icon: <HomeIcon size={30} color='snow' />,
    action: "refresh"
  }
]



const StoreReportsView = ({ ...props }) => {
  const [showReportPanel,setShowReportPanel] = useState(false);
  const [currentReport,setCurrentReport] = useState({
    report: "",
    group: "",
    type: "Store"
  });
  const navigate = useNavigate();

  const onHomeButtonClick = (action) => {
    debugger;
    navigate(action,{ viewTransition: true });
  }

  const onReportButtonClick = (e) => {    
    debugger;
    let target = e.currentTarget;
    let report = target.dataset.report;
    let group = target.dataset.group;
    setCurrentReport({...currentReport,report,group});
    setShowReportPanel(!showReportPanel);
  }

  return (
    <View>
      <PanelViewManager close={() => setShowReportPanel(false)} when={showReportPanel} report={currentReport} view={currentReport} />
      {/* {showReportPanel && (
        <PanelViewManager>
          <ReportDisplayView report={currentReport} close={()=>setShowReportPanel(false)}/>
        </PanelViewManager>
      )} */}
        

        <Heading mode='lite' size='lg'>Store Reports</Heading>

        {/* <FlexColumn flex='1'></FlexColumn> */}

        <ReportView>
          <ReportView.SelectionRow title="Financial" reports={reports.financial} onClick={onReportButtonClick}/>
          <ReportView.SelectionRow title="Department" reports={reports.departments} onClick={onReportButtonClick} />
          <ReportView.SelectionRow title="Sub-Department" reports={reports.subdepartments} onClick={onReportButtonClick} />
        </ReportView>

      
      
      <BottomNav buttons={cardToolbarItems} onClick={onHomeButtonClick} />
      
    </View>
  );
}

export default StoreReportsView;