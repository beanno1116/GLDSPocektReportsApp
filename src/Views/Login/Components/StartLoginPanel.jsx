
import styles from '../loginView.module.css';
import logo from '../../../assets/images/pocketReportLogo.png';
import PrimaryButton from '../../../Components/Buttons/PrimaryButton';
import OutlineButton from '../../../Components/Buttons/OutlineButton';

const StartLoginPanel = ({ when,onPanelButtonClick }) => {

  const onShowLoginPanelButtonClick = (e) => {
    onPanelButtonClick && onPanelButtonClick(e,"login");
  }

  const onShowRegistrationPanelButtonClick = (e) => {
    onPanelButtonClick && onPanelButtonClick(e,"register");
  }

  return (
    <div className={`${styles.login_view_start_panel} ${when ? styles.hidden : ""}`}>

      <div className={styles.login_view_logo_panel}>

        <div className={styles.login_view_header_row}>
          <img src={logo} style={{width:"250px",aspectRatio:"1 / 1",opacity:".75"}}/>
        </div>
        
        <p className={styles.login_view_p}>
          Own Your Store’s Performance from your pocket.
        </p>

      </div>


      <div className={styles.login_view_button_panel}>
        <PrimaryButton onClick={onShowLoginPanelButtonClick} size='lg'>Login</PrimaryButton>
        <OutlineButton action={"/manage/users"} size='lg' onClick={onShowRegistrationPanelButtonClick}>Register</OutlineButton>
      </div>

      <div></div>
      <div></div>
      
    </div>
  );
}

export default StartLoginPanel;