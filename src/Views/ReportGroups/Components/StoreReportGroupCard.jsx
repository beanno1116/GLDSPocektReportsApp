import { useFetchReportData } from "../../../Api/ApiRoutes";
import SolidGoIcon from "../../../assets/icons/SolidGoIcon";
import StoreIcon from "../../../assets/icons/StoreIcon";
import ReportGroupCard from "../../Templates/Components/Cards/ReportGroupCard";
import * as routes from '../../viewRoutes';



const StoreReportGroupCard = ({ onClick }) => {
  const {status,data} = useFetchReportData()
  return (
    <ReportGroupCard onClick={onClick(routes.REPORT_GROUP)}>
      <ReportGroupCard.Header title={"Store Reports"} count={8} icon={<StoreIcon size={36} />} buttonIcon={<SolidGoIcon size={28} />} />
      <ReportGroupCard.Preview>
        <ReportGroupCard.Stat value={"$28K"} label={"Revenue"} />
        <ReportGroupCard.Stat value={"2884"} label={"Transactions"} />
        <ReportGroupCard.Stat value={"$28K"} label={"Sales"} />
      </ReportGroupCard.Preview>
    </ReportGroupCard>
  );
}

export default StoreReportGroupCard;