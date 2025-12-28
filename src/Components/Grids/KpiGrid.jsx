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

const KpiGrid = ({ children }) => {
  return (
    <div className={styles.kpi_grid}>
      {children}
    </div>
  );
}

KpiGrid.Item = KpiGridItem

export default KpiGrid;