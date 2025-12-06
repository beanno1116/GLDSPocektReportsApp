
import { useNavigate } from 'react-router';
import styles from './itemReportsView.module.css';
import FlexColumn from '../../Components/FlexComponents/FlexColumn';
import Heading from '../../Components/Labels/Heading';
import FlexRow from '../../Components/FlexComponents/FlexRow';
import View from '../Templates/View/View';
import HomeIcon from '../../assets/icons/HomeIcon';
import ReportView from '../Templates/ReportView/ReportView';
import BottomNav from '../../Components/BottomNav/BottomNav';

const ItemReportsView = ({ ...props }) => {
  const navigate = useNavigate();

  const onHomeButtonClick = (action) => {
    navigate(action,{ viewTransition: true });
  }
  return (
    <View>
      <FlexColumn width='100%' height='100%' g='1rem'>
        {/* <Heading size='lg'>Item reporting</Heading> */}
        {/* <ThisWeekVsLast title={"This Week vs Last Week"} /> */}

        
        <ReportView/>

        <BottomNav onClick={onHomeButtonClick} />

       
       {/* <div className={styles.bottom_nav}>
        <button className={styles.nav_icon} onClick={onHomeButtonClick}>
          <HomeIcon size={40} />
        </button>
        <button className={styles.nav_icon}>
          <HomeIcon size={40} />
        </button>
        <button className={styles.nav_icon}>
          <HomeIcon size={40} />
        </button>
        
       </div> */}
      </FlexColumn>
    </View>
  );
}

export default ItemReportsView;