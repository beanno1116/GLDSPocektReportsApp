import CloseIcon from './icons/CloseIcon';

import styles from '../weSelect.module.css';

const TagItem = ({ value, onClick }) => {
  return (
    <div className={styles.tag_item}>
      {value}
      <span onClick={onClick} className={styles.tag_close}>
        <CloseIcon width={"20"} height={"20"} />
      </span>
    </div>
  );
}

export default TagItem;