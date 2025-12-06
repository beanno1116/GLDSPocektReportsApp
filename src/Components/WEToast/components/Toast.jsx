import styles from '../weToastPortal.module.css';
import SuccessIcon from './icons/SuccessIcon';
import CloseIcon from './icons/CloseIcon';
import ErrorIcon from './icons/ErrorIcon';
import InfoIcon from './icons/InfoIcon';
import WarningIcon from './icons/WarningIcon';



const Message = ({ msg }) => <p>{msg}</p>
const Title = ({text}) => <h3>{text}!</h3>
const CloseButton = () => <label className={styles.close}></label>
const ToastContainer = ({type,children}) => <div className={`${styles.toast} ${styles[type]}`}>{children}</div>

const Toast = ({ msg, title, type, position, onClick }) => {
  


  return (
    <div className={`${styles.toast_item} ${styles[type]}`}>
      <ToastContainer type={type}>
        <CloseButton />
        <Title text={title} />
        <Message msg={msg} />
      </ToastContainer>      
    </div>
  );
}

export default Toast;