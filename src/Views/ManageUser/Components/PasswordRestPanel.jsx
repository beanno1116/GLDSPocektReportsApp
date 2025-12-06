import DropdownPanel from "../../../Components/DropdownPanel/DropdownPanel";
import PasswordResetForm from "../../../Forms/PasswordReset/PasswordResetForm";
import styles from '../manageUserView.module.css';


const PasswordRestPanel = ({ when,close }) => {
  return (
    <DropdownPanel when={when}>
        <PasswordResetForm submitHandler={close} />
      {/* <div className={styles.panel}>

      </div> */}
    </DropdownPanel>
  );
}

export default PasswordRestPanel;