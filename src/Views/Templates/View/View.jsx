
import styles from './view.module.css';

const View = ({ direction="column", children }) => {
  return (
  <div className={styles.view_template} style={{display:"flex",flexDirection:direction}}>
    {children}
    
  </div>
  );
}

export default View;