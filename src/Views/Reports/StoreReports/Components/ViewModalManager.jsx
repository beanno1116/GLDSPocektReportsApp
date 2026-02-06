import PrimaryButton from "../../../../Components/Buttons/PrimaryButton"
import FlexColumn from "../../../../Components/FlexComponents/FlexColumn"
import FlexRow from "../../../../Components/FlexComponents/FlexRow"
import StoreSelector from "../../../../Modals/StoreSelector"
import Card from "../../../Templates/Components/Cards/Card"
import View from "../../../Templates/View/View"
import knowledgeIcon from "../../../../assets/images/knowledgeIcon.png";
import SettingsModalView from "../ModalViews/SettingsModalView"

const SummaryView = ({close}) => {
  return (
    <div>Store summary view <button onClick={() => close()}>Close</button></div>
  )
}
const TargetsView = ({close}) => {
  return (
    <div>Store targets view <button onClick={() => close()}>Close</button></div>
  )
}
const AlertsView = ({close}) => {
  return (
    <div>Store alerts view <button onClick={() => close()}>Close</button></div>
  )
}
const SaveReportView = ({close}) => {
  return (
    <div>Save Store report view <button onClick={() => close()}>Close</button></div>
  )
}


const subViews = {
  stores: StoreSelector,
  summary: SummaryView,
  targets: TargetsView,
  alerts: AlertsView,
  saveReport: SaveReportView,
  settings: SettingsModalView
}

const ViewModalManager = ({ views=subViews,view,viewData,close }) => {

  const renderModal = (view) => {

    const View = views[view];

    if (View) {
      return <View data={viewData} close={close} />
    }

    return <div>View {view} not found!<br></br> <button onClick={() => close()}>Close</button></div>
  }

  return (    
    <>
      {renderModal(view)}
    </>
  );
}

export default ViewModalManager;