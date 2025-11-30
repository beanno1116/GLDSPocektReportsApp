
import { forwardRef } from 'react';
import styles from './inputs.module.css';

const TextArea = forwardRef(({label,name,value,onChange,placeholder,size="sm"},ref) => {
  return (
  <div className={styles.text_area}>
    {label && <label className={`${styles.label} ${styles[size]}`} for={name}>{label}</label>}
    <textarea ref={ref} type="text" name={name} onChange={onChange} value={value} id={name} className={`${styles.text_area_input} ${styles[size]}`} placeholder={placeholder} autoComplete='off' />      
	</div>
  );
})

export default TextArea;