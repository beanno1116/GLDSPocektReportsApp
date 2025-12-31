import { useNavigate } from 'react-router';
import BottomNav from '../Templates/View/Components/BottomNav';
import View from '../Templates/View/View';
import AccountUserDetails from './Components/AccountUserDetails';
import CurrentUserDetails from './Components/CurrentUserDetails';
import UsersDetail from './Components/UsersDetail';
import HomeIcon from '../../assets/icons/HomeIcon';
import AddNewUserIcon from '../../assets/icons/AddNewUserIcon';
import AddUserPanel from './Components/AddUserPanel';
import { useState } from 'react';

const ManageUserView = ({ ...props }) => {
  const navigate = useNavigate();
    const [showFormPanel,setShowFormPanel] = useState(false);

  const onBottomNavClick = (e,action) => {
    if (action === "add"){
      setShowFormPanel(true);
      return;
    }
    navigate("/",{ viewTransition: true });
  }

  const closeFormPanel = (e) => {
    setShowFormPanel(false)
  }

  return (
    <View>
      <AddUserPanel when={showFormPanel} close={closeFormPanel} />
      <View.Header title={"Manage Users"} />

      
      <AccountUserDetails total={10} used={5} />

      
      <CurrentUserDetails />

      <View.SectionTitle>Users</View.SectionTitle>

      <UsersDetail />

      <View.BottomNav fixed={false}>
        <BottomNav.Button onClick={onBottomNavClick} action={"/"} icon={<HomeIcon size={32} />} label="Home" />
        <BottomNav.Button onClick={onBottomNavClick} action={"add"} icon={<AddNewUserIcon size={32} />} label="Add" />
      </View.BottomNav>

    </View>
  );
}

export default ManageUserView;