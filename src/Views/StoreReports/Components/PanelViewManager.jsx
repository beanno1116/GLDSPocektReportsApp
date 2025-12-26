
import SummaryReportView from '../../Reports/SummaryReportView/SummaryReportView';
import styles from '../storeReportsView.module.css';
import ReportDisplayView from './ReportDisplayView/ReportDisplayView';

const TempComponent = ({report}) => {
  return (
    <div style={{color:"snow"}}>{report.title}</div>
  )
}

const views = {
  store: {
    financial: {
      summary: SummaryReportView,
      balance: TempComponent,
      multi: TempComponent,
      single: TempComponent
    }
  }
}


const PanelViewManager = ({ when,report,close }) => {


  const renderPanelView = (report) => {
    // 
    if (report.type){
      const viewType = report.type.toLowerCase();
      const viewGroup = report.group.toLowerCase();
      const viewName = report.name.toLowerCase();
  
      const PanelView = views[viewType][viewGroup][viewName];
      
      return <PanelView report={report} closeView={close} />;
    }
  
  }

  return (
    <div className={`${styles.panel_view_container} ${when ? styles.visible : ""}`}>
      {renderPanelView(report)}
       {/* <ReportDisplayView report={report} close={close}/> */}
    </div>
  );
}

export default PanelViewManager;