import FlexRow from "../../../../Components/FlexComponents/FlexRow";
import KpiGrid from "../../../../Components/Grids/KpiGrid";
import ScrollSelector from "../../../../Components/ScrollSelector/ScrollSelector";
import HorizontalScrollView from "../../../../Components/ScrollView/HorizontalScrollView";
import Format from "../../../../Utils/Format";
import View from "../../../Templates/View/View";



const ActivityGrid = ({ gridData }) => {
  
  return (
    <>
      <View.SectionTitle m='0rem 0 .5rem 0'>Activity</View.SectionTitle>
      <HorizontalScrollView>
        {gridData.loanTotal !== 0 &&<KpiGrid.Item key={`safe_loan`} title={"Loans"} expandable={true} value={gridData.loanTotal} subValue={`${0}`} format={Format.SHORT_CURRENCY_FORMAT} />}
        {gridData.depositTotal !== 0 && <KpiGrid.Item key={`safe_deposits`} title={"Deposits"} value={gridData.depositTotal} subValue={`${0}`} format={Format.SHORT_CURRENCY_FORMAT} />}
        {gridData.pickupTotal !== 0 && <KpiGrid.Item key={`safe_pickups`} title={"Pickups"} value={gridData.pickupTotal} subValue={`${0}`} format={Format.SHORT_CURRENCY_FORMAT} />}
        {gridData.receivedTotal !== 0 && <KpiGrid.Item key={`safe_received`} title={"Received"} value={gridData.receivedTotal} subValue={`${0}`} format={Format.SHORT_CURRENCY_FORMAT} />}
      </HorizontalScrollView>
    </>

  );
}

export default ActivityGrid;