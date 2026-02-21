import DrawerIcon from "../../../../../assets/icons/DrawerIcon";
import SolidSafeIcon from "../../../../../assets/icons/SolidSafeIcon";
import SecondaryButton from "../../../../../Components/Buttons/SecondaryButton";
import KpiGrid from "../../../../../Components/Grids/KpiGrid";

import View from "../../../../Templates/View/View";



const ToolGrid = ({ title,onClick }) => {

  return (
    <>
      <View.SectionTitle id="ReportTools" m='2rem 0 .5rem 0'>{title}</View.SectionTitle>
      <KpiGrid m="0">
        <SecondaryButton action="summary" onClick={onClick}>Summary</SecondaryButton>
        <SecondaryButton action="targets" onClick={onClick}>Targets</SecondaryButton>
        <SecondaryButton action="alerts" onClick={onClick}>Alerts</SecondaryButton>
        <SecondaryButton action="saveReport" onClick={onClick}>Save Report</SecondaryButton>
      </KpiGrid>
    </>
  );
}

export default ToolGrid;