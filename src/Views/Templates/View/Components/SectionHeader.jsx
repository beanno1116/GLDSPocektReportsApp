
import { useCallback } from 'react';
import styles from '../view.module.css';

const SectionHeader = ({ id,m="0 0 1rem 0",title,viewAll,action="" }) => {

  const onViewAllButtonClick = useCallback((action) => (e) => {
    viewAll && viewAll(e,action);
  },[viewAll])

  return (
    <div id={id} className={styles.section_header} style={{margin:m}}>
      <div className={styles.section_header_title}>{title}</div>
      <div className={styles.view_all_btn} data-action={action} onClick={onViewAllButtonClick(action)}>
          View All →
      </div>
    </div>
  );
}

export default SectionHeader;