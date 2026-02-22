
import { useNavigate } from 'react-router';
import ScrollView from '../../Components/ScrollView/ScrollView';
import ReportGroupCard from '../Templates/Components/Cards/ReportGroupCard';
import View from '../Templates/View/View';
import HomeIcon from '../../assets/icons/HomeIcon';
import StoreIcon from '../../assets/icons/StoreIcon';
import SolidGoIcon from '../../assets/icons/SolidGoIcon';
import SettingsIcon from '../../assets/icons/SettingsIcon';
import ScrollSelector from '../../Components/ScrollSelector/ScrollSelector';
import useAppContext from '../../hooks/useAppContext';
import { useApiClient } from '../../Api/Api';
import { useCallback } from 'react';


const useReportGroupsView = () => {
  const {state,dispatch} = useAppContext();
  const api = useApiClient();
  const navigate = useNavigate();


  const handleStoreSelction = (e) => {
    const selectedStoreId = e.target.dataset.value;
    const activeStoreId = state.activeStore;
    if (selectedStoreId === activeStoreId) return;
    dispatch({type:UPDATE_ACTIVE_STORE,payload:selectedStoreId});    
  }

  const onReportGroupClick = useCallback((path) => (e) => {
    navigate(path,{viewTransition:true});
  },[navigate])

  const renderStoreSelections = () => {
    if (state.stores.length === 0) return <div style={{color:"red"}}>No stores found</div>
    return state.stores.map((store,index) => {
      const activeStoreId = state.activeStore;
      return (
        <ScrollSelector.Item 
          key={store.id} 
          id={store.id} 
          active={activeStoreId === store.id ? true : false} 
          text={store.name} 
          onClick={handleStoreSelction} 
        />
      )
    })
  }

  const onNavButtonClick = useCallback((route) => (e) => {
    navigate(route,{viewTransition:true});
  },[navigate]);

  return {
    onReportGroupClick,
    onNavButtonClick,
    render: {
      storeSelections: renderStoreSelections
    }
  }
}


const ReportGroupsView = ({ ...props }) => {
  const {render,onReportGroupClick,onNavButtonClick} = useReportGroupsView();


  return (
    <View>
      <View.Header showDate={false} title={"Report Groups"} />
      <ScrollSelector>
        {render.storeSelections()}
      </ScrollSelector>
      
      <ScrollView>
        
          <ReportGroupCard m='2rem 0' onClick={onReportGroupClick("/report/stores")}>
            <ReportGroupCard.Header title={"Store Reports"} count={10} icon={<StoreIcon size={36} />} buttonIcon={<SolidGoIcon size={28} />} />
            <ReportGroupCard.Preview>
              <ReportGroupCard.Stat value={"$28K"} label={"Revenue"} />
              <ReportGroupCard.Stat value={"2884"} label={"Transactions"} />
              <ReportGroupCard.Stat value={"$28K"} label={"Sales"} />
            </ReportGroupCard.Preview>
          </ReportGroupCard>

          {/* <ReportGroupCard>
            <ReportGroupCard.Header title={"Item Reports"} count={10} icon={<ItemReportIcons size={36} />} buttonIcon={<SolidGoIcon size={28} />} />
            <ReportGroupCard.Preview>
              <ReportGroupCard.Stat value={"999,999"} label={"Items"} />
              <ReportGroupCard.Stat value={"94%"} label={"In Stock"} />
              <ReportGroupCard.Stat value={"999,999"} label={"low"} />
            </ReportGroupCard.Preview>
          </ReportGroupCard>

          <ReportGroupCard>
            <ReportGroupCard.Header title={"Department Reports"} count={10} icon={<StoreIcon size={36} />} buttonIcon={<SolidGoIcon size={28} />} />
            <ReportGroupCard.Preview>
              <ReportGroupCard.Stat value={"36"} label={"Departments"} />
              <ReportGroupCard.Stat value={"$28K"} label={"top"} />
              <ReportGroupCard.Stat value={"+15%"} label={"growth"} />
            </ReportGroupCard.Preview>
          </ReportGroupCard>

          <ReportGroupCard>
            <ReportGroupCard.Header title={"Customer Reports"} count={10} icon={<CustomerIcon size={36} />} buttonIcon={<SolidGoIcon size={28} />} />
            <ReportGroupCard.Preview>
              <ReportGroupCard.Stat value={"999,999"} label={"total"} />
              <ReportGroupCard.Stat value={"999,999"} label={"active"} />
              <ReportGroupCard.Stat value={"88%"} label={"retention"} />
            </ReportGroupCard.Preview>
          </ReportGroupCard>

          <ReportGroupCard>
            <ReportGroupCard.Header title={"Vendor Reports"} count={10} icon={<CustomerIcon size={36} />} buttonIcon={<SolidGoIcon size={28} />} />
            <ReportGroupCard.Preview>
              <ReportGroupCard.Stat value={"178"} label={"Vendors"} />
              <ReportGroupCard.Stat value={"$28K"} label={"Sales"} />
              <ReportGroupCard.Stat value={"$28K"} label={"Sales"} />
            </ReportGroupCard.Preview>
          </ReportGroupCard>

          <ReportGroupCard>
            <ReportGroupCard.Header title={"Cashier Reports"} count={10} icon={<CustomerIcon size={36} />} buttonIcon={<SolidGoIcon size={28} />} />
            <ReportGroupCard.Preview>
              <ReportGroupCard.Stat value={"26"} label={"Cashiers"} />
              <ReportGroupCard.Stat value={"$5k"} label={"top"} />
              <ReportGroupCard.Stat value={"$28K"} label={"Sales"} />
            </ReportGroupCard.Preview>
          </ReportGroupCard>

          <ReportGroupCard>
            <ReportGroupCard.Header title={"Receiving Reports"} count={10} icon={<ReceivingIcon size={36} />} buttonIcon={<SolidGoIcon size={28} />} />
            <ReportGroupCard.Preview>
              <ReportGroupCard.Stat value={"26"} label={"Cashiers"} />
              <ReportGroupCard.Stat value={"$5k"} label={"top"} />
              <ReportGroupCard.Stat value={"$28K"} label={"Sales"} />
            </ReportGroupCard.Preview>
          </ReportGroupCard>

          <ReportGroupCard>
            <ReportGroupCard.Header title={"Buying Reports"} count={10} icon={<DollarSignIcon size={36} />} buttonIcon={<SolidGoIcon size={28} />} />
            <ReportGroupCard.Preview>
              <ReportGroupCard.Stat value={"26"} label={"Cashiers"} />
              <ReportGroupCard.Stat value={"$5k"} label={"top"} />
              <ReportGroupCard.Stat value={"$28K"} label={"Sales"} />
            </ReportGroupCard.Preview>
          </ReportGroupCard> */}

          <div style={{height:"75px",width:"100%"}}></div>
      </ScrollView>
              

        <View.BottomNav>
          <View.BottomNav.Button action="/" onClick={onNavButtonClick} icon={<HomeIcon size={36} />}>Home</View.BottomNav.Button>
          {/* <View.BottomNav.Button icon={<StoreIcon size={32}/>}>Stores</View.BottomNav.Button> */}
          <View.BottomNav.Button>Analytics</View.BottomNav.Button>
          <View.BottomNav.Button>Forcasts</View.BottomNav.Button>
          <View.BottomNav.Button icon={<SettingsIcon size={32} />}>Settings</View.BottomNav.Button>
        </View.BottomNav>
      
      
    </View>
  );
}

export default ReportGroupsView;