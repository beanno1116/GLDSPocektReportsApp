
import styles from './cards.module.css';


const ReportGroupCardHeader = ({title,count,buttonIcon,icon}) => {
  return (
    <div className={styles.report_group_header}>
      <div className={styles.report_group_icon}>{icon}</div>
      <div className={styles.report_group_info}>
          <div className={styles.report_group_title}>{title}</div>
          <div className={styles.report_group_count}>{count} reports available</div>
      </div>
      <div className={styles.report_group_arrow}>{buttonIcon}</div>
  </div>
  )
}

const ReportGroupCardPreview = ({children}) => {
  return (
    <div className={styles.report_group_preview}>{children}</div>
  )
}

const ReportGroupCardStat = ({value,label}) => {
  return (
    <div className={styles.preview_stat}>
        <div className={styles.preview_value}>{value}</div>
        <div className={styles.preview_label}>{label}</div>
    </div>
  )
}


const ReportGroupCard = ({ group,onClick,m="0",children }) => {

  const onCardClick = (e,group) => {
    onClick && onClick(group);
  }

  return ( 
    <div className={styles.report_group_card} onClick={e => onCardClick(e,group)} style={{margin:m}}>
      {children}
    </div>
  );
}

ReportGroupCard.Header = ReportGroupCardHeader;
ReportGroupCard.Preview = ReportGroupCardPreview;
ReportGroupCard.Stat = ReportGroupCardStat;

export default ReportGroupCard;