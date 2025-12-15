
import siteStyles from '../../site.module.css';
import styles from './label.module.css';

const HeaderLabel = ({ children,onClick }) => {

  const onHeaderClick = (e) => {
    onClick && onClick(e);
  }

  return (
  <div className={`${siteStyles.panel_bg} ${styles.glass_label}`} onClick={onHeaderClick}>    
    {children}
  </div>
  );
}

export default HeaderLabel;