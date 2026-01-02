
import styles from '../view.module.css';

const SectionHeader = ({ m="0 0 1rem 0",title,onClick }) => {

  const onViewAllButtonClick = (e) => {
    onClick && onClick(e);
  }

  return (
    <div className={styles.section_header} style={{margin:m}}>
      <div className={styles.section_header_title}>{title}</div>
      <div className={styles.view_all_btn} onclick={onViewAllButtonClick}>
          View All →
      </div>
    </div>
  );
}

export default SectionHeader;