
import { forwardRef } from 'react';
import styles from './inputs.module.css';

const TextField = forwardRef(({ label,name,value,onChange,placeholder },ref) => {
  return (
    <div className={styles.text_field}>
      <label className={styles.label} for={name}>{label}</label>
      <input ref={ref} type="text" name={name} onChange={onChange} value={value} id={name} className={styles.text_field_input} placeholder={placeholder} autoComplete='off' />
      {/* <p class="helper helper1">email@domain.com</p> */}
      {/* <p class="helper helper2">email@domain.com</p> */}
	</div>
  );
})

export default TextField;