
import styles from './button.module.css';

const PeriodSelectorButton = ({ onClick,...props }) => {

  const onPeriodButtonClick = (e) => {
    onClick && onClick(e);
  }

  return (
  <div className={styles.period_selector_toolbar} onClick={onPeriodButtonClick}>
    <span data-period="d" className={styles.active} style={{textAlign:"center"}}>D</span>
    <span data-period="w" style={{textAlign:"center"}}>W</span>
    <span data-period="m" style={{textAlign:"center"}}>M</span>
    <span data-period="y" style={{textAlign:"center"}}>Y</span>
  </div>
  );
}

export default PeriodSelectorButton;