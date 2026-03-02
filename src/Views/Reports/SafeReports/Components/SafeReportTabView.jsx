
import SearchField from '../../../../Components/Inputs/SearchField';
import TabView from '../../../../Components/TabView/TabView';
import SafeMediaTabView from './SafeMediaTabView';

const SafeReportTabView = ({ safeData }) => {
  const getTab = (tab) => {
    return tab[0].toUpperCase() + tab.slice(1);
  }

  const renderTabView = (tab) => {
    switch (tab) {
      case "summary":        
        // return (<div><div>Safe Media summary tab</div><div><SearchField placeholder="Search for safe media" /></div></div>)
        return (<SafeMediaTabView safeData={safeData} />)
      case "media":
        return (<div>Safe Media tab</div>)
      case "top":
        return (<div>Top Safe Media tab</div>)
      default:
        return (<div>Safe Media summary tab</div>);
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

export default SafeReportTabView;