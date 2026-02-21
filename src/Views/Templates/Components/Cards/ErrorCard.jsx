import ContactIcon from '../../../../assets/icons/Gradients/ContactIcon';
import OutlineButton from '../../../../Components/Buttons/OutlineButton';
import PrimaryButton from '../../../../Components/Buttons/PrimaryButton';
import Show from '../../../../Components/Show/Show';
import styles from './cards.module.css'

const getErrorIcon = (type) => {
  switch (type) {
    case "network":
      return "📡";
    case "page":
      return "🔍";
    default:
      return "❌"
  }
}

const cardTypes = {
  general: "",
  network: "",
  page: ""
}

const ErrorCard = ({ title,message,code,children,type }) => {
  return (
    <div className={styles.error_screen}>
      <div style={{position:"absolute",top:"1rem",right:"1rem"}} title="Contact Support"><ContactIcon size={40} /></div>
      <div className={styles.error_icon}>{getErrorIcon(type)}</div>
      <div className={styles.error_title}>{title}</div>
      <div className={styles.error_message}>
          {message}
      </div>
      <Show when={code}>
        <div className={styles.error_code}>
            <span>Error Code:</span>~
            <span>{code}</span>
        </div>
      </Show>
      <div className={styles.error_actions}>
        {children}
        <PrimaryButton>
          <span></span>
          <span>Try Again</span>
        </PrimaryButton>
        <OutlineButton>
          <span></span>
          <span>Select Store</span>
        </OutlineButton>
      </div>
    </div>
  );
}

export default ErrorCard;