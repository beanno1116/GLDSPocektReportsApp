
import styles from '../view.module.css';

const SectionTitle = ({id="", m="0 0 1rem 0",children }) => {
  return (
    <div id={id} className={styles.section_title} style={{margin:m}}>
       {children}
    </div>
  );
}

export default SectionTitle;