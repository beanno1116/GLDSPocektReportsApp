import SalesReportBuilder from "../Forms/SalesReportBuilder";





const style = {
  position: "relative",
  width: "100%",
  height: "100%",
  // background: "red"
}


const ModalViewManager = ({ view,views,data,close }) => {

  const renderView = (view) => {
    let temp = data;
    let tempView = view;
    let View = views[view];
    
    // 
    // 
    switch (view) {
      case "sales":
        return <View data={data.balanceSheet.sales} close={close}/>
      case "hourly":
        return <View data={data.hourlyData} close={close} />
      case "tender":
        return <View data={data.balanceSheet.tendered} close={close} />
      case "balance":
        return <div>Create Balance Sheet <button onClick={(e) => close()}>Close</button></div>
      case "store":
        return <div>Create Store Report <button onClick={(e) => close()}>Close</button></div>
      case "stores":
        return <View close={close} />
      default:
        return <SalesReportBuilder data={data.balanceSheet.sales} close={close}/>
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