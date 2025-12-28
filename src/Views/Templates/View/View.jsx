
import BottomNav from './Components/BottomNav';
import Header from './Components/Header';
import SectionTitle from './Components/SectionTitle';
import styles from './view.module.css';

const View = ({ direction="column", children }) => {
  return (
  <div className={styles.view_template} style={{display:"flex",flexDirection:direction}}>
    {children}
  </div>
  );
}

View.Header = Header;
View.SectionTitle = SectionTitle;
View.BottomNav = BottomNav;

export default View;