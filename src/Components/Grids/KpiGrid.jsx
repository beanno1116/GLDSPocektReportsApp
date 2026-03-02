import Format from '../../Utils/Format';
import MetricCard from '../../Views/Templates/Components/Cards/MetricCard';
import compareIcon from '../../assets/images/compareIcon.png';
import dateRange from '../../assets/images/dateRange.png';
import calendarDay from '../../assets/images/calendarDay.png';
import styles from './grids.module.css';
import { useCallback, useState } from 'react';

const pngIcons = {
  compare: <img className={styles.action_img} src={compareIcon} />,
  day: <img className={styles.action_img} src={calendarDay} />,
  range: <img className={styles.action_img} src={dateRange} />
}

const KpiGridItem = ({title,value,type,format,subValue=0,expandable=false,opposite=false,onClick}) => {
  const isValueNegative = parseFloat(value) < 0 ? true : false;
  const isSubValueNegative = parseFloat(subValue) < 0 ? true : false;
  const [expanded,setExpanded] = useState(false);

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

  const onGridItemClick = (e) => {
    
    if (expandable){
      setExpanded(!expanded);
    }
    onClick && onClick(e);
  }
  
  return (
    <div className={`${styles.kpi_card} ${type ? styles[type] : ""}`} onClick={onGridItemClick}>
      <div className={styles.kpi_label}>{title}</div>
      <div className={`${styles.kpi_value} ${isValueNegative ? styles.negative : styles.positive}`}>{`${Format.string(value,format)}`}</div>
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
    <div className={styles.summary_card} onClick={()=>{}}>
      <div className={styles.summary_icon}>{icon}</div>
      <div className={styles.summary_label}>{label}</div>
      <div className={`${styles.summary_value} ${isValueNegative ? styles.negative : styles.positive}`}>{`${Format.string(value,type)}`}</div>
      <div className={`${styles.summary_change} ${renderClassName(isSubValueNegative)}`}>{`${renderArrow(isSubValueNegative)} ${parseInt(subValue)}`}%</div>
    </div>
  )
}

const ActionGridItem = ({action,icon,label,onClick}) => {

  const onGridItemClick = (e,action) => {
    onClick && onClick(e,action);
  }

  return (
    <div data-action={action} className={styles.action_card} onClick={(e) => onGridItemClick(e,action)}>
      <div className={styles.action_icon}>{icon}</div>
      <div className={styles.action_label}>{label}</div>
    </div>
  )
}

const ButtonGridItem = ({icon,label,onClick}) => {
    const onGritItemClick = (e) => {
      onClick && onClick(e);
    }
  return (
    <div className={styles.action_card} onClick={onGritItemClick}>
      {pngIcons[icon]}
      {/* <img className={styles.action_img} src={compareIcon} /> */}
      <div className={styles.action_label}>{label}</div>
    </div>
  )
}

const KpiGrid = ({ m="0 0 1.5rem 0",p="0",g="1rem",children }) => {
  return (
    <div className={styles.kpi_grid} style={{margin:m,padding:p,gap:g}}>
      {children}
    </div>
  );
}

KpiGrid.Item = KpiGridItem
KpiGrid.ButtonItem = ButtonGridItem;
KpiGrid.SummaryItem = SummaryGridItem;
KpiGrid.ActionItem = ActionGridItem;
KpiGrid.MetricItem = MetricCard;

export default KpiGrid;