import TabView from "../../../../Components/TabView/TabView";
import LaneDrawerMediaTab from "./LaneDrawerMediaTab";
import LanesReportTab from "./LanesReportTab";



const DrawerReportTabView = ({ ...props }) => {
  const getTab = (tab) => {
    return tab[0].toUpperCase() + tab.slice(1);
  }

  const renderTabView = (tab) => {
    switch (tab) {
      case "summary":        
        return (<LanesReportTab />)
      case "media":
        return (<LaneDrawerMediaTab />)
      case "top":
        return (<LanesReportTab />)
      default:
        return (<LanesReportTab />);
    }
  }

  return (
    <TabView 
      tabs={["summary","media","top"]}
      getTab={getTab}
      renderTabView={renderTabView}
      tabType="icon"
      height="55vh"
      m="0"
    />
  )
}

export default DrawerReportTabView;