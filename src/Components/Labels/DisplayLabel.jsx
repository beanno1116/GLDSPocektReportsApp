
import styles from './label.module.css';
import siteStyles from '../../site.module.css';
import PlainUserIcon from '../../assets/icons/PlainUserIcon';

const DisplayLabel = ({label,value }) => {
  return (
    <div className={`${siteStyles.panel_bg} ${styles.display_label}`}>
       <span className={`${styles.display_label_span} ${styles.label}`}><PlainUserIcon size={32} />{}</span>
       <span className={styles.display_label_span}>{value}</span>
    </div>
  );
}

export default DisplayLabel;