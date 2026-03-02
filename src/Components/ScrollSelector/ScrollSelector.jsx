
import { useState } from 'react';
import Format from '../../Utils/Format';
import styles from './scrollSelector.module.css';

const ScrollItem = ({text,active,id,onClick}) => {
  const onScrollItemClick = (e) => {
    onClick && onClick(e);
  }
  return (
    <div data-value={id} className={`${styles.scroll_selector_chip} ${active ? styles.active : ""}`} onClick={onScrollItemClick}>{text}</div>
  )
}

const ScrollBadge = ({text,active=false,link}) => {
  return (
    <a className={`${styles.meta_badge} ${active ? styles.active : ""}`} href={link}>{text}</a>
  )
}

const ScrollButton = ({text,active=false,action,onClick}) => {
  return (
    <button className={`${styles.meta_badge} ${active ? styles.active : ""}`} data-action={action} onClick={onClick}>
      {text}
    </button>
  )
}

const ScrollMetric = ({title,value,type,format,subValue=0,expandable=false,opposite=false,onClick}) => {
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
    <div className={`${styles.scroll_metric} ${type ? styles[type] : ""}`} onClick={onGridItemClick}>
      <div className={styles.scroll_metric_label}>{title}</div>
      <div className={`${styles.scroll_metric_value} ${isValueNegative ? styles.negative : styles.positive}`}>{`${Format.string(value,format)}`}</div>
      {parseInt(subValue) !== 0 && <div className={`${styles.scroll_metric_change} ${renderClassName(isSubValueNegative)}`}>{`${renderArrow(isSubValueNegative)} ${parseInt(subValue)}`}%</div>}
    </div>
  )
}

const ScrollSelector = ({ items,g="1rem",children }) => {
  return (
    <div className={styles.scroll_selector} style={{gap:g}}>
      {children}
    </div>
  );
}

ScrollSelector.Item = ScrollItem;
ScrollSelector.BadgeItem = ScrollBadge;
ScrollSelector.Button = ScrollButton;
ScrollSelector.Metric = ScrollMetric;

export default ScrollSelector;