import Format from '../../Utils/Format';
import MetricCard from '../../Views/Templates/Components/Cards/MetricCard';
import styles from './grids.module.css';

const KpiGridItem = ({title,value,type="shortNumber",subValue=0,opposite=false}) => {
  const isValueNegative = parseFloat(value) < 0 ? true : false;
  const isSubValueNegative = parseFloat(subValue) < 0 ? true : false;

  const renderSymbol = () => {
    return type === "shortCurrency" ? "$" : "";
  }

  const renderArrow = (status) => {
    if (opposite){
      return status ? "↑" : "↓";
    }
    return status ? "↓" : "↑";
  }

  const renderClassName = (status) => {
    if (opposite) {
      return status ? styles.positive : styles.negative;
    }
    return status ? styles.negative : styles.positive;
  }
  
  return (
    <div className={styles.kpi_card}>
      <div className={styles.kpi_label}>{title}</div>
      <div className={`${styles.kpi_value} ${isValueNegative ? styles.negative : styles.positive}`}>{`${Format.string(value,type)}`}</div>
      {parseInt(subValue) !== 0 && <div className={`${styles.kpi_change} ${renderClassName(isSubValueNegative)}`}>{`${renderArrow(isSubValueNegative)} ${parseInt(subValue)}`}%</div>}
    </div>
  )
}

const SummaryGridItem = ({icon,label,value,subValue,change,type="shortNumber",opposite=false}) => {
    const isValueNegative = parseFloat(value) < 0 ? true : false;
    const isSubValueNegative = parseFloat(subValue) < 0 ? true : false;

    const renderSymbol = () => {
      return type === "shortCurrency" ? "" : "";
    }

    const renderArrow = (status) => {
      if (opposite){
        return status ? "↑" : "↓";
      }
      return status ? "↓" : "↑";
    }

    const renderClassName = (status) => {
      if (opposite) {
        return status ? styles.positive : styles.negative;
      }
      return status ? styles.negative : styles.positive;
    }
  return (
    <div className={styles.summary_card} onclick="viewDetails('revenue')">
      <div className={styles.summary_icon}>{icon}</div>
      <div className={styles.summary_label}>{label}</div>
      <div className={`${styles.summary_value} ${isValueNegative ? styles.negative : styles.positive}`}>{`${Format.string(value,type)}`}</div>
      <div className={`${styles.summary_change} ${renderClassName(isSubValueNegative)}`}>{`${renderArrow(isSubValueNegative)} ${parseInt(subValue)}`}%</div>
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
KpiGrid.MetricItem = MetricCard;

export default KpiGrid;