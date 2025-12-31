
import { useNavigate } from 'react-router';
import FlexColumn from '../../Components/FlexComponents/FlexColumn';
import FlexRow from '../../Components/FlexComponents/FlexRow';
import ScrollView from '../../Components/ScrollView/ScrollView';
import ReportGroupCard from '../Templates/Components/Cards/ReportGroupCard';
import View from '../Templates/View/View';
import styles from './report.module.css';
import HomeIcon from '../../assets/icons/HomeIcon';
import StoreIcon from '../../assets/icons/StoreIcon';
import SolidGoIcon from '../../assets/icons/SolidGoIcon';

const ReportView = ({ ...props }) => {
  const navigate = useNavigate();

  const onHomeButtonClick = (e) => {
    navigate("/")
  }

  return (
    <View>
      <View.Header showDate={true} title={"Report Groups"} />
      <FlexColumn flex='1' g='1.25rem' width='100%'>
        <div style={{position:"absolute",width:"100%",height:"100%",overflowY:"scroll"}}>
          <ReportGroupCard>
            <ReportGroupCard.Header title={"Store Reports"} count={10} icon={<SolidGoIcon size={36} />} />
            <ReportGroupCard.Preview>
              <ReportGroupCard.Stat value={"$28K"} label={"Sales"} />
              <ReportGroupCard.Stat value={"$28K"} label={"Sales"} />
              <ReportGroupCard.Stat value={"$28K"} label={"Sales"} />
            </ReportGroupCard.Preview>
          </ReportGroupCard>

          <ReportGroupCard>
            <ReportGroupCard.Header title={"Item Reports"} count={10} icon={<SolidGoIcon size={36} />} />
            <ReportGroupCard.Preview>
              <ReportGroupCard.Stat value={"$28K"} label={"Sales"} />
              <ReportGroupCard.Stat value={"$28K"} label={"Sales"} />
              <ReportGroupCard.Stat value={"$28K"} label={"Sales"} />
            </ReportGroupCard.Preview>
          </ReportGroupCard>

          <ReportGroupCard>
            <ReportGroupCard.Header title={"Department Reports"} count={10} icon={<SolidGoIcon size={36} />} />
            <ReportGroupCard.Preview>
              <ReportGroupCard.Stat value={"$28K"} label={"Sales"} />
              <ReportGroupCard.Stat value={"$28K"} label={"Sales"} />
              <ReportGroupCard.Stat value={"$28K"} label={"Sales"} />
            </ReportGroupCard.Preview>
          </ReportGroupCard>

          <ReportGroupCard>
            <ReportGroupCard.Header title={"Customer Reports"} count={10} icon={<SolidGoIcon size={36} />} />
            <ReportGroupCard.Preview>
              <ReportGroupCard.Stat value={"$28K"} label={"Sales"} />
              <ReportGroupCard.Stat value={"$28K"} label={"Sales"} />
              <ReportGroupCard.Stat value={"$28K"} label={"Sales"} />
            </ReportGroupCard.Preview>
          </ReportGroupCard>

          <ReportGroupCard>
            <ReportGroupCard.Header title={"Vendor Reports"} count={10} icon={<SolidGoIcon size={36} />} />
            <ReportGroupCard.Preview>
              <ReportGroupCard.Stat value={"$28K"} label={"Sales"} />
              <ReportGroupCard.Stat value={"$28K"} label={"Sales"} />
              <ReportGroupCard.Stat value={"$28K"} label={"Sales"} />
            </ReportGroupCard.Preview>
          </ReportGroupCard>

          <ReportGroupCard>
            <ReportGroupCard.Header title={"Item Reports"} count={10} icon={<SolidGoIcon size={36} />} />
            <ReportGroupCard.Preview>
              <ReportGroupCard.Stat value={"$28K"} label={"Sales"} />
              <ReportGroupCard.Stat value={"$28K"} label={"Sales"} />
              <ReportGroupCard.Stat value={"$28K"} label={"Sales"} />
            </ReportGroupCard.Preview>
          </ReportGroupCard>
        </div>

      <FlexRow p='1rem'>

        <View.BottomNav>
          <View.BottomNav.Button action="/" onClick={onHomeButtonClick} icon={<HomeIcon size={36} />}>Home</View.BottomNav.Button>
          <View.BottomNav.Button icon={<StoreIcon size={32}/>}>Stores</View.BottomNav.Button>
          <View.BottomNav.Button>Analytics</View.BottomNav.Button>
          <View.BottomNav.Button>Forcasts</View.BottomNav.Button>
        </View.BottomNav>
      </FlexRow>

      </FlexColumn>
    </View>
  );
}

export default ReportView;