
import { useNavigate } from 'react-router';
import HomeIcon from '../../assets/icons/HomeIcon';
import BottomNav from '../../Components/BottomNav/BottomNav';
import Heading from '../../Components/Labels/Heading';
import View from '../Templates/View/View';
import styles from './storeReportsView.module.css';
import ReportView from '../Templates/ReportView/ReportView';
import { useCallback, useState } from 'react';
import PanelViewManager from './Components/PanelViewManager';


const reports = {
  financial: [
    {
      report: "summary",
      title: "Store Summary"
    },
    {
      report: "balance",
      title: "Store Balance",
    },
    {
      report: "multi",
      title: "Store Multi-Totals",
    },
    {
      report: "single",
      title: "Store Single Total",
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
    icon: <HomeIcon size={36} color='snow' />,
    action: "/"
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



const StoreReportsView = ({ ...props }) => {
  const [showReportPanel,setShowReportPanel] = useState(false);
  const [currentReport,setCurrentReport] = useState({
    name: "",
    group: "",
    type: "",
    title: ""
  });
  const navigate = useNavigate();

  const onHomeButtonClick = (e,action) => {
    
    navigate(action,{ viewTransition: true });
  }

  const onReportButtonClick = (e) => {    
    // 
    
    let target = e.currentTarget;
    let name = target.dataset.report;
    let type = target.dataset.type;
    let group = target.dataset.group;
    let title = target.dataset.title;
    setCurrentReport({...currentReport,type,name,group,title});
    setShowReportPanel(!showReportPanel);
  }

  const onClosePanelView = useCallback((e) => {
    
    e.stopPropagation();
    e.preventDefault();
    setShowReportPanel(false);
  },[showReportPanel])

  return (
    <View>
      <div className={styles.grain}></div>
      <div className={styles.anamorphic_streak}></div>
      
      <PanelViewManager close={onClosePanelView} when={showReportPanel} report={currentReport} />
      
        <Heading mode='lite' size='lg'>Store Reports</Heading>

        <ReportView>
          <ReportView.SelectionRow type="store" group="Financial" reports={reports.financial} onClick={onReportButtonClick}/>
          <ReportView.SelectionRow type="store" group="Department" reports={reports.departments} onClick={onReportButtonClick} />
          <ReportView.SelectionRow type="store" group="Sub-Department" reports={reports.subdepartments} onClick={onReportButtonClick} />
        </ReportView>

        <BottomNav buttons={cardToolbarItems} eventHandler={onHomeButtonClick} />
      
    </View>
  );
}

export default StoreReportsView;