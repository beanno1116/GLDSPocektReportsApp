
import { forwardRef } from 'react';
import styles from './inputs.module.css';

const PasswordTextField = forwardRef(({ label,name,value,onChange,id,placeholder,size="sm" },ref) => {
  return (
    <div className={styles.password_text_field}>
      {label && (
        <label className={`${styles.label} ${styles[size]}`} htmlFor={id}>
          {label}
        </label>
      )}
      <input ref={ref} type="password" name={name} onChange={onChange} value={value} id={id} className={`${styles.password_text_field_input} ${styles[size]}`} placeholder={placeholder} autoComplete='off'/>
  </div>
  );
})

export default PasswordTextField;