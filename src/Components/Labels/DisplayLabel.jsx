
import styles from './label.module.css';
import siteStyles from '../../site.module.css';
import PlainUserIcon from '../../assets/icons/PlainUserIcon';
import SolidEmailIcon from '../../assets/icons/SolidEmailIcon';
import SolidCalendarIcon from '../../assets/icons/SolidCalendarIcon';
import DollarSignIcon from '../../assets/icons/DollarSignIcon';


const labelIcons = {
  user: <PlainUserIcon size={35} />,
  email: <SolidEmailIcon size={35} />,
  date: <SolidCalendarIcon size={35} />,
  usDollar: <DollarSignIcon size={35} />
}


const DisplayLabel = ({icon="",value,onClick,borderRadius="1rem 1rem 1rem 1rem" }) => {
  return (
    <div className={`${siteStyles.panel_bg} ${styles.display_label}`} style={{borderRadius}} onClick={onClick}>
       <span className={`${styles.display_label_span} ${styles.label}`}>{labelIcons[icon]}</span>
       <span className={styles.display_label_span}>{value}</span>
    </div>
  );
}

export default DisplayLabel;