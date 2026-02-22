import SaveIcon from "../../../../../assets/icons/Gradients/SaveIcon";
import SummaryIcon from "../../../../../assets/icons/Gradients/SummaryIcon";
import KpiGrid from "../../../../../Components/Grids/KpiGrid";

import View from "../../../../Templates/View/View";


const ReportToolsButtonGrid = ({title,onClick }) => {

  return (
    <>
      <View.SectionTitle id="ReportToolsButtonGrid" m='2rem 0 .5rem 0'>{title}</View.SectionTitle>
      <KpiGrid m="0">
        <KpiGrid.ActionItem icon={<SummaryIcon size={60} />} label={"Summary"} action="/report/stores/safe" onClick={onClick}/>
        <KpiGrid.ActionItem icon={<SaveIcon size={32} />} label={"Save Report"} action="save" onClick={onClick}/>
      </KpiGrid>
    </>
  );
}

export default ReportToolsButtonGrid;