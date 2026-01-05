
import styles from './dataTable.module.css';

const DataTableItem = ({rank,name,points,value,change}) => {
  return (
    <div className={styles.table_row}>
      <div className={styles.table_rank}>{rank}</div>
      <div className={styles.table_content}>
          <div className={styles.table_name}>{name}</div>
          <div className={styles.table_meta}>{points} pts</div>
      </div>
      <div className={styles.table_value}>
          <div className={styles.table_amount}>{value}</div>
          <div className={styles.table_change}>+{change}%</div>
      </div>
  </div>
  )
}


const DataTable = ({ children }) => {
  return (
    <div className={styles.data_table}>
       <div className={styles.table_header}>
          <div className={styles.table_title}>Most Active</div>
          <div className={styles.table_filter}>This Month</div>
      </div>
      {children}
    </div>
  );
}

DataTable.Row = DataTableItem;

export default DataTable;