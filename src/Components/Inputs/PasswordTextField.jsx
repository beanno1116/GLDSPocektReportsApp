
import { forwardRef } from 'react';
import styles from './inputs.module.css';

const PasswordTextField = forwardRef(({ label,name,value,onChange,placeholder },ref) => {
  return (
    <div className={styles.password_text_field}>
      <label className={styles.label} for={name}>{label}</label>
      <input ref={ref} type="password" name={name} onChange={onChange} value={value} id={name} className={styles.password_text_field_input} placeholder={placeholder} autoComplete='off'/>
      {/* <p class="helper helper1">email@domain.com</p> */}
      {/* <p class="helper helper2">email@domain.com</p> */}
  </div>
  );
})

export default PasswordTextField;