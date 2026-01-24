
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

const ScrollSelector = ({ items,children }) => {
  return (
    <div className={styles.scroll_selector}>
      {children}
    </div>
  );
}

ScrollSelector.Item = ScrollItem;
ScrollSelector.BadgeItem = ScrollBadge;

export default ScrollSelector;