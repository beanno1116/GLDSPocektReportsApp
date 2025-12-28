
import styles from './scrollSelector.module.css';

const ScrollItem = ({text,active,id,onClick}) => {
  const onScrollItemClick = (e) => {
    onClick && onClick(e);
  }
  return (
    <div data-value={id} className={`${styles.scroll_selector_chip} ${active ? styles.active : ""}`} onClick={onScrollItemClick}>{text}</div>
  )
}

const ScrollSelector = ({ items,children }) => {
  return (
    <div className={styles.scroll_selector}>
      {children}
    </div>
  );
}

ScrollSelector.Item = ScrollItem;

export default ScrollSelector;