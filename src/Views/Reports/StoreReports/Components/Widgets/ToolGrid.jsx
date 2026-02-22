import AlertIcon from "../../../../../assets/icons/Gradients/AlertIcon";
import TargetIcon from "../../../../../assets/icons/Gradients/TargetIcon";
import KpiGrid from "../../../../../Components/Grids/KpiGrid";

import View from "../../../../Templates/View/View";






const ToolGrid = ({ title,onClick }) => {

  return (
    <>
      <View.SectionTitle id="ReportTools" m='2rem 0 .5rem 0'>{title}</View.SectionTitle>
      <KpiGrid m="0">
        <KpiGrid.ActionItem icon={<AlertIcon size={60} />} label={"Alerts"} action="/report/stores/safe" onClick={onClick}/>
        <KpiGrid.ActionItem icon={<TargetIcon size={60} />} label={"Targets"} action="/report/stores/safe" onClick={onClick}/>
      </KpiGrid>
    </>
  );
}

export default ToolGrid;