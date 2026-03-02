import ViewHeading from "../../../../Components/Headings/ViewHeading";
import FullScreenLoader from "../../../../Components/Loader/FullScreenLoader";
import RefreshIndicator from "../../../../Components/Loader/RefreshIndicator";
import View from "../../../Templates/View/View";



const LoadingView = ({ text }) => {
  return (
    <View>  
      <ViewHeading title={`${text} Report`} onClick={() => {}} />
      <FullScreenLoader text={`Loading ${text} Report Data`} />
    </View>
  );
}

export default LoadingView;