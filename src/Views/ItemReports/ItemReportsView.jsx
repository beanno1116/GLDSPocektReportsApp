
import { useNavigate } from 'react-router';
import styles from './itemReportsView.module.css';
import FlexColumn from '../../Components/FlexComponents/FlexColumn';
import Heading from '../../Components/Labels/Heading';
import FlexRow from '../../Components/FlexComponents/FlexRow';
import View from '../Templates/View/View';
import HomeIcon from '../../assets/icons/HomeIcon';

const ItemReportsView = ({ ...props }) => {
  const navigate = useNavigate();

  const onHomeButtonClick = (e) => {
    navigate("/",{ viewTransition: true });
  }
  return (
    <View>
      <FlexColumn width='100%' height='100%' g='1rem'>
        {/* <Heading size='lg'>Item reporting</Heading> */}
        {/* <ThisWeekVsLast title={"This Week vs Last Week"} /> */}
        <div style={{display:"flex",flexDirection:"column",flex:"2",gap:".75rem",padding:".75rem"}}>
          <div style={{flex:"1",color:"snow"}}>Pinned</div>
          <div style={{flex:"1",color:"snow"}}>Movement</div>
          <div style={{flex:"1",color:"snow"}}>Price</div>
          <div style={{flex:"1",color:"snow"}}>Inventory</div>
        </div>
        
       <button style={{color:"snow",fontSize:"18px"}} onClick={onHomeButtonClick}>Home</button>
       <div className={styles.bottom_nav}>
        <HomeIcon size={35} />
       </div>
      </FlexColumn>
    </View>
  );
}

export default ItemReportsView;