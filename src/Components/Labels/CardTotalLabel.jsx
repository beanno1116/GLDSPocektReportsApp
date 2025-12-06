import siteStyles from '../../site.module.css';
import PlainUserIcon from '../../assets/icons/PlainUserIcon';
import SolidEmailIcon from '../../assets/icons/SolidEmailIcon';
import SolidCalendarIcon from '../../assets/icons/SolidCalendarIcon';
import DollarSignIcon from '../../assets/icons/DollarSignIcon';
import styles from './label.module.css';

const labelIcons = {
  user: <PlainUserIcon size={35} />,
  email: <SolidEmailIcon size={35} />,
  date: <SolidCalendarIcon size={35} />,
  usDollar: <DollarSignIcon size={30} />
}


const CardTotalLabel = ({ icon="",onClick,borderRadius="1rem 1rem 1rem 1rem",children }) => {
  return (
  <div className={`${siteStyles.panel_bg} ${styles.display_label}`} style={{borderRadius}} onClick={onClick}>
    <span className={`${styles.display_label_span} ${styles.label}`}>{labelIcons[icon]}</span>
    {children}
  </div>
  );
}

export default CardTotalLabel;