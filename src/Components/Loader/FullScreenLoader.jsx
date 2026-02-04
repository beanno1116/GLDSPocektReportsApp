import pocketReportLogo from '../../assets/images/pocketReportLogo.png';
import styles from './loader.module.css';

const FullScreenLoader = ({ text,subText="Please wait..." }) => {
  return (
    <div className={styles.loading_screen} id="fullScreenLoading">
      <div className={styles.loading_logo}><img src={pocketReportLogo} style={{width:"100%",aspectRatio:"1/1",opacity:".8"}}/></div>
      <div className={styles.spinner_dual}></div>
      <div className={styles.loading_text}>{text}</div>
      <div className={styles.loading_percentage}>{subText}</div>
    </div>
  );
}

export default FullScreenLoader;