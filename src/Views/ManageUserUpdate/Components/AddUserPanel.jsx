
import DropdownPanel from '../../../Components/DropdownPanel/DropdownPanel';
import KpiGrid from '../../../Components/Grids/KpiGrid';
import AddUserForm from '../../../Forms/Adduser/AddUserForm';


const AddUserPanel = ({ when,close }) => {
  return (
    <DropdownPanel when={when} p='1rem'>
      <DropdownPanel.SectionTitle m='0'>User Availability</DropdownPanel.SectionTitle>
      <KpiGrid>
        <KpiGrid.Item title="Total" value={"10"} />
        <KpiGrid.Item title="Available" value={"6"} />
      </KpiGrid> 
      <AddUserForm handleSubmit={close}/>
    </DropdownPanel>
  );
}

export default AddUserPanel;