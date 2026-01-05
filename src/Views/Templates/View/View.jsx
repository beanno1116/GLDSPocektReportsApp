
import BottomNav from './Components/BottomNav';
import DropdownHeader from './Components/DropdownHeader';
import Header from './Components/Header';
import HeaderNav from './Components/HeaderNav';
import SectionHeader from './Components/SectionHeader';
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
View.HeaderNav = HeaderNav;
View.DropdownHeader = DropdownHeader;
View.SectionHeader = SectionHeader;
View.SectionTitle = SectionTitle;
View.BottomNav = BottomNav;

export default View;