
import { forwardRef } from 'react';
import styles from './inputs.module.css';
import TextField from './TextField';

const SearchField = forwardRef(({ label,name,value,id,onChange,placeholder,size="sm",onClick,...props },ref) => {
  return (
    <div className={`${styles.input_icon_wrapper} ${styles.input_search_wrapper}`}>
        <span className={styles.input_icon}>🔍</span>
        <input className={`${styles.search_input} ${styles[size]}`} placeholder={placeholder} />
        <button className={styles.input_search_clear}>×</button>
    </div>
  );
})

export default SearchField;