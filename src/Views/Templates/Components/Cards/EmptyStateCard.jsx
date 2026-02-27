
import PrimaryButton from '../../../../Components/Buttons/PrimaryButton';
import styles from './cards.module.css';

const EmptyStateCard = ({ title,message,action,onClick }) => {
  return (
    <div className={styles.empty_state}>
      <div className={styles.empty_state_icon}>📊</div>
      <div className={styles.empty_state_title}>{title}</div>
      <div className={styles.empty_state_message}>
        {message}
      </div>
      <PrimaryButton action={action} onClick={onClick(action)}>
        <span>Add Widgets</span>
      </PrimaryButton>
      
    </div>
  );
}

export default EmptyStateCard;