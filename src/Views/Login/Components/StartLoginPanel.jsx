
import styles from '../loginView.module.css';
import logo from '../../../assets/images/pocketReportLogo.png';
import buttonStyles from '../../../Components/Buttons/button.module.css';

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
          Store data in your pocket is seconds away!
        </p>

      </div>


      <div className={styles.login_view_button_panel}>
        <button className={buttonStyles.button} type='button' onClick={onShowLoginPanelButtonClick}>Login</button>
        <button className={`${buttonStyles.button} ${buttonStyles.secondary}`} type='button' onClick={onShowRegistrationPanelButtonClick}>Register</button>
      </div>

      <div></div>
      <div></div>
      
    </div>
  );
}

export default StartLoginPanel;