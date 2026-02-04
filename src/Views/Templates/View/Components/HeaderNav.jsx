
import styles from '../view.module.css';

const HeaderNav = ({ title,m="0 0 1rem 0"}) => {
  return (
    <div className={styles.section_header} style={{margin:m}}>
      <div className={styles.section_header_title}>{title}</div>
      <div className={styles.header_actions}>
        <div className={styles.header_action} onclick={()=>{}}>📤</div>
        <div className={styles.header_action} onclick={()=>{}}>📥</div>
      </div>
    </div>
  );
}

export default HeaderNav;