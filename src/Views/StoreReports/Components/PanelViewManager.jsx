
import styles from '../storeReportsView.module.css';
import ReportDisplayView from './ReportDisplayView/ReportDisplayView';

const views = {
  store: {
    summary: ReportDisplayView
  }
}

const PanelViewManager = ({ when,report,view,close,children }) => {
  return (
    <div className={`${styles.panel_view_container} ${when ? styles.visible : ""}`}>
       <ReportDisplayView report={report} close={close}/>
    </div>
  );
}

export default PanelViewManager;