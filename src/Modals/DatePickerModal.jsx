
import PrimaryButton from '../Components/Buttons/PrimaryButton';
import SecondaryButton from '../Components/Buttons/SecondaryButton';
import PickerModal from '../Components/WEDatePicker/components/PickerModal';

import styles from './modals.module.css';

const DatePickerModal = ({ onClose,onSave }) => {
  return (
    <div className={styles.datepicker_modal}>
        <div className={styles.modal_body}>
            <PickerModal date={new Date()} handleSelect={()=>{}} handleClose={()=>{}} show={true} />
        </div>
        <div className={styles.modal_footer}>
          <SecondaryButton size='md' onClick={onClose}>Cancel</SecondaryButton>
          <PrimaryButton size='md' onClick={onSave}>Select</PrimaryButton>
        </div>
    </div>    
  );
}

export default DatePickerModal;