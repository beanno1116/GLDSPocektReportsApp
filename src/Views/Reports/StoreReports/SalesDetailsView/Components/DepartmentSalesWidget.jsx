
import Show from '../../../../../Components/Show/Show';
import View from '../../../../Templates/View/View';
import DepartmentRadarChart from '../../Components/Charts/Department/DepartmentRadarChart';


const DepartmentSalesWidget = ({ departmentData=[],...props }) => {
  return (
    <>
      <View.SectionTitle id="department" m='.5rem 0'>Department Sales</View.SectionTitle>
      <Show when={departmentData.length > 0} fallback={<div>No data found!</div>}>
        <DepartmentRadarChart chartData={departmentData} />
      </Show>
    </>
  );
}

export default DepartmentSalesWidget;