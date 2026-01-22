
import { useNavigate } from 'react-router';
import StoreIcon from '../../../assets/icons/StoreIcon';
import DataTable from '../../../Components/DataTable/DataTable';
import KpiGrid from '../../../Components/Grids/KpiGrid';
import PeriodSelector from '../../../Components/PeriodSelector/PeriodSelector';
import ScrollView from '../../../Components/ScrollView/ScrollView';
import HeaderNav from '../../Templates/View/Components/HeaderNav';
import View from '../../Templates/View/View';
import styles from './storeReportsView.module.css';
import ExportIcon from '../../../assets/icons/ExportIcon';
import SolidDownloadIcon from '../../../assets/icons/SolidDownloadIcon';
import LocDataAdapter from '../../../Models/LocReportAdapter';
import BackIcon from '../../../assets/icons/BackIcon';
import FlexRow from '../../../Components/FlexComponents/FlexRow';
import PrimaryButton from '../../../Components/Buttons/PrimaryButton';
import SettingsIcon from '../../../assets/icons/SettingsIcon';
import ReportHero from '../Components/ReportHero/ReportHero';
import FlexColumn from '../../../Components/FlexComponents/FlexColumn';


const viewQueries = [
  {
    action: "Stats",
    key: "current",
    adapter(data) {      
      const adaptedData = LocDataAdapter.parseStoreStatsData(data);
      return adaptedData;
    }
  },
  {
    action: "Stats",
    key: "past",
    adapter(data) {      
      const adaptedData = LocDataAdapter.parseStoreStatsData(data);
      return adaptedData;
    }
  },
]


const StoreLoyaltyDetails = ({ ...props }) => {
  const navigate = useNavigate();

  const onBottomNavClick = (e,action) => {
    navigate(action,{viewTransition:true});
  }


  return (
    <View>

      <FlexColumn height='100%'>
          <ReportHero title={"Store Loyalty Report"} badge={"Loyalty Program"} period={"Jan 2026"} description={"Comprehensive analysis of your loyalty program's performance at a store level and engagement metrics"} />

          <FlexRow flex='1'>
        <ScrollView type='absolute'>



          <KpiGrid>
            <KpiGrid.MetricItem title={"Active Members"} value={"12,458"} delta={"↑ 248 this month"} icon={"👥"} />
            <KpiGrid.MetricItem title={"Avg Points"} value={"2,847"} delta={"↑ 12.3%"} icon={"💎"} />
            <KpiGrid.MetricItem title={"Redemptioins"} value={"3,492"} delta={"↑ 18.7%"} icon={"🎁"} />
            <KpiGrid.MetricItem title={"Engagement"} value={"68%"} delta={"↑ 5.2%"} icon={"📈"} />
          </KpiGrid>

          <View.SectionTitle>Top Redeemers</View.SectionTitle>
          <DataTable title="Most Active">
            <DataTable.Row rank={1} name={"Ben Klimo"} points={"1,242"} value={243.23} change={9} />
            <DataTable.Row rank={2} name={"Steve Moore"} points={"1,024"} value={221.53} change={2} />
            <DataTable.Row rank={3} name={"Ricky Ricardo"} points={"989"} value={212.67} change={5} />
          </DataTable>

          <FlexRow>
            <PrimaryButton size='md'>Go to Customer Reports</PrimaryButton>
          </FlexRow>
          
          <div style={{height:"75px",width:"100%"}}></div>
        </ScrollView>

          </FlexRow>
          

      </FlexColumn>
         
           

      


      <View.BottomNav>
        <View.BottomNav.Button action="/report/stores" onClick={onBottomNavClick} icon={<BackIcon size={36} />}>Back</View.BottomNav.Button>
        <View.BottomNav.Button action="/report/stores" onClick={onBottomNavClick} icon={<ExportIcon size={36} />}>Export</View.BottomNav.Button>
        <View.BottomNav.Button action="/report/stores" onClick={onBottomNavClick} icon={<SolidDownloadIcon size={40} />}>Download</View.BottomNav.Button>
        <View.BottomNav.Button action="/report/stores" onClick={onBottomNavClick} icon={<SettingsIcon size={40} />}>Settings</View.BottomNav.Button>
      </View.BottomNav>


    </View>
  );
}

export default StoreLoyaltyDetails;