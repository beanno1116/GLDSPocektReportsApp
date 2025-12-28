
import styles from './view.module.css';

const View = ({ direction="column", children }) => {
  return (
  <div className={styles.view_template} style={{display:"flex",flexDirection:direction}}>
    <div className={styles.grain}></div>
    <div className={styles.anamorphic_streak}></div>
    {children}
    
  </div>
  );
}

export default View;