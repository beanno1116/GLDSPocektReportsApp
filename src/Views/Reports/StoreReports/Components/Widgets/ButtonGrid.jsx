import DrawerIcon from "../../../../../assets/icons/DrawerIcon";
import SolidSafeIcon from "../../../../../assets/icons/SolidSafeIcon";
import KpiGrid from "../../../../../Components/Grids/KpiGrid";

import View from "../../../../Templates/View/View";



const ButtonGrid = ({title,onClick }) => {

  return (
    <>
      <View.SectionTitle id="SafeDrawer" m='2rem 0 .5rem 0'>{title}</View.SectionTitle>
      <KpiGrid m="0">
        <KpiGrid.ActionItem icon={<SolidSafeIcon size={32} />} label={"Safe Report"} action="/report/stores/safe" onClick={onClick}/>
        <KpiGrid.ActionItem icon={<DrawerIcon size={32} />} label={"Drawer Report"} action="drawer" onClick={onClick}/>
      </KpiGrid>
    </>
  );
}

export default ButtonGrid;