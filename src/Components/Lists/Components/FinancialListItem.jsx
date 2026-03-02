
import Format from '../../../Utils/Format';
import styles from '../list.module.css';

const Value = ({label,value,format}) => {

  const renderValue = (renderVal) => {
    if (value === 0) {
      return Format.string(parseFloat(renderVal).toFixed(2),format);
    }
    return Format.string(renderVal,format);
  }

  return (
    <div className={styles.compact_value}>
      <span className={styles.compact_label}>{label}</span>
      <span className={styles.compact_amount}>{renderValue(value)}</span>
    </div>
  )
}

const Title = ({text,overShort}) => {
  return (
    <div className={styles.compact_title}>
      {text}
      <span style={{display:"flex",gap:".25rem",alignItems:"center"}}>
        {overShort != 0 && (
          <>
            <span className={styles.compact_title_label}>S/O</span>
            <span className={styles.compact_amount}>{overShort}</span>
          </>
        )}
      </span>
    </div>
  )
}

const FinancialListItem = ({ header,type,children }) => {

    const getStatusStyle = (status) => {
    switch (status) {
      case 'over':
        return styles.status_over;
      case 'short':
        return styles.status_short;
      case 'balanced':
        return styles.status_balanced;
      default:
        return styles.status_normal;
    }
  };

  return (
    <div className={`${styles.compact_item} ${styles[type]}`}>
      {header}
      <div className={styles.compact_values}>
        {children}
      </div>
    </div>
  );
}

FinancialListItem.Value = Value;
FinancialListItem.Title = Title;

export default FinancialListItem;