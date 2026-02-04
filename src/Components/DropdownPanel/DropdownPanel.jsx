
import styles from './dropdownPanel.module.css';
import siteStyles from '../../site.module.css';

const Header = ({title}) => {
  return (
    <div className={styles.header}>
      <div className={styles.header_title}>
        <span>{title}</span>
        <span className={styles.header_indicator}></span>
      </div>
    </div>
  )
}

const SectionTitle = ({ children }) => {
  return (
    <div className={styles.section_title}>
       {children}
    </div>
  );
}

const DropdownPanel = ({ when,p="0",children }) => {
  return (
    <div className={`${styles.dropdown_panel} ${when ? styles.showing : ""}`}>
      <div className={`${styles.panel_container}`} style={{padding:p}}>
        {children}
      </div>
    </div>
  );
}

DropdownPanel.Header = Header;
DropdownPanel.SectionTitle = SectionTitle;

export default DropdownPanel;