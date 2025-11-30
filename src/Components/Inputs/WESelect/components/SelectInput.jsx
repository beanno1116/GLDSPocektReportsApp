import styles from '../weSelect.module.css';

const SelectInput = ({ value,placeholder }) => {  
  return (
    <div className={styles.selected_value}>
      {value !== placeholder ? (<span className={styles.placeholder}>{placeholder}</span>) : null}
      <span>{value}</span>      
    </div>
  );
}

export default SelectInput;