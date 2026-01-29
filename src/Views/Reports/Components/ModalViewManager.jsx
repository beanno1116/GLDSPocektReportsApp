
import PrimaryButton from "../../../Components/Buttons/PrimaryButton"
import FlexColumn from "../../../Components/FlexComponents/FlexColumn";
import FlexRow from "../../../Components/FlexComponents/FlexRow"
import DateTimePicker from "../../../Components/Inputs/DateTimePicker/DateTimePicker";
import Card from "../../Templates/Components/Cards/Card"
import View from "../../Templates/View/View"
import { useState } from "react";
import ConfigureReportForm from "./ConfigureReport/ConfigureReportForm";
import SalesReportBuilder from "../Forms/SalesReportBuilder";


const ModalView = ({close,data,...props}) => {
  
  return (
    <ConfigureReportForm data={data}  close={close}/>
  )
}


const style = {
  position: "relative",
  width: "100%",
  height: "100%",
  // background: "red"
}


const ModalViewManager = ({ view,data,close }) => {

  const renderView = (view) => {
    let temp = data;
    // debugger;
    switch (view) {
      case "sales":
        return <SalesReportBuilder data={data.balanceSheet.Sales} close={close}/>
      case "hourly":
        return <div>Create Hourly Report <button onClick={(e) => close()}>Close</button></div>
      case "tender":
        return <div>Create Tender Report <button onClick={(e) => close()}>Close</button></div>
      case "balance":
        return <div>Create Balance Sheet <button onClick={(e) => close()}>Close</button></div>
      case "store":
        return <div>Create Store Report <button onClick={(e) => close()}>Close</button></div>
      default:
        return <SalesReportBuilder data={data.balanceSheet.Sales} close={close}/>
    }
  }

  return (
    <>
    {renderView(view)}
    </>
    // <div style={style}>
    // {renderView(view)}
    // </div>
  );
}

export default ModalViewManager;