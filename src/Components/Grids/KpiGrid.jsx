import styles from './grids.module.css';

const KpiGridItem = ({title,value,subValue}) => {
  return (
    <div className={styles.kpi_card}>
      <div className={styles.kpi_label}>{title}</div>
      <div className={styles.kpi_value}>{value}</div>
      {subValue && <div className={`${styles.kpi_change} ${styles.positive}`}>{subValue}</div>}
    </div>
  )
}

const SummaryGridItem = ({icon,label,value,change}) => {
  return (
    <div className={styles.summary_card} onclick="viewDetails('revenue')">
      <div className={styles.summary_icon}>{icon}</div>
      <div className={styles.summary_label}>{label}</div>
      <div className={styles.summary_value}>{value}</div>
      <div className={`${styles.summary_change} ${styles.positive}`}>↑ 12.3%</div>
    </div>
  )
}

const ActionGridItem = ({icon,label,onClick}) => {

  const onGritItemClick = (e) => {
    onClick && onClick(e);
  }

  return (
    <div className={styles.action_card} onclick={onGritItemClick}>
      <div className={styles.action_icon}>{icon}</div>
      <div className={styles.action_label}>{label}</div>
    </div>
  )
}

const KpiGrid = ({ children }) => {
  return (
    <div className={styles.kpi_grid}>
      {children}
    </div>
  );
}

KpiGrid.Item = KpiGridItem
KpiGrid.SummaryItem = SummaryGridItem;
KpiGrid.ActionItem = ActionGridItem;

export default KpiGrid;