
import styles from '../view.module.css';

const SectionTitle = ({ m="0 0 1rem 0",children }) => {
  return (
    <div className={styles.section_title} style={{margin:m}}>
       {children}
    </div>
  );
}

export default SectionTitle;