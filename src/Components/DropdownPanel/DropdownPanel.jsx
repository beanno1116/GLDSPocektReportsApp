
import styles from './dropdownPanel.module.css';
import siteStyles from '../../site.module.css';

const DropdownPanel = ({ when,children }) => {
  return (
    <div className={`${styles.dropdown_panel} ${when ? styles.showing : ""}`}>
      <div className={`${siteStyles.panel_bg} ${styles.panel_container}`}>
        {children}
      </div>
    </div>
  );
}

export default DropdownPanel;