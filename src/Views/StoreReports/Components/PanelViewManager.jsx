
import styles from '../storeReportsView.module.css';

const PanelViewManager = ({ children }) => {
  return (
    <div className={styles.panel_view_container}>
       {children}
    </div>
  );
}

export default PanelViewManager;