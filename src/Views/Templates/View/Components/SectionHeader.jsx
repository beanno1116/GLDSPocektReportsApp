
import styles from '../view.module.css';

const SectionHeader = ({ m="0 0 1rem 0",title,viewAll,action="" }) => {

  const onViewAllButtonClick = (e,action) => {
    viewAll && viewAll(e,action);
  }

  return (
    <div className={styles.section_header} style={{margin:m}}>
      <div className={styles.section_header_title}>{title}</div>
      <div className={styles.view_all_btn} data-action={action} onClick={(e) => onViewAllButtonClick(e,action)}>
          View All →
      </div>
    </div>
  );
}

export default SectionHeader;