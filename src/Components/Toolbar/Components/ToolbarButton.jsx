
import styles from '../toolbar.module.css';

const ToolbarButton = ({ disabled=false,theme="light",active=false,action,onClick,color="",size="md",children }) => {

  const onButtonClick = (e) => {
    const button = e.currentTarget;
    const action = button.dataset.action;
    onClick && onClick(action);
  }

  return (
    <button 
      disabled={disabled} 
      data-button="nav" 
      data-action={action} 
      style={{color:color}} 
      onClick={onButtonClick} 
      className={`${styles.toolbar_button} ${styles[size]} ${active ? styles.active : ""} ${styles[theme]}`}
    >
      
       {children}
    </button>
  );
}

export default ToolbarButton;