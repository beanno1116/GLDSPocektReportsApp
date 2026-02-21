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
import { useAuth } from '../../hooks/useAuth';
import Show from '../../Components/Show/Show';
import useAppContext from '../../hooks/useAppContext';

const ManageUserView = ({ ...props }) => {
  const navigate = useNavigate();
  const { state } = useAppContext();
  const auth = useAuth();
  const authUser = auth.getAuthUser();
  const [showFormPanel,setShowFormPanel] = useState(false);

  const onBottomNavClick = (action) => (e) => {
    if (action === "add"){
      setShowFormPanel(true);
      return;
    }
    navigate(action,{ viewTransition: true });
  }

  const closeFormPanel = (e) => {
    setShowFormPanel(false)
  }

  return (
    <View>
      <AddUserPanel when={showFormPanel} close={closeFormPanel} />
      <View.Header title={"Manage Users"} />

      <Show when={authUser.isAdmin}>
        <AccountUserDetails total={state.seats} used={state.users.length} />
      </Show>
      
      

      
      <CurrentUserDetails />

      <Show when={authUser.isAdmin}>
        <View.SectionTitle>Users</View.SectionTitle>
        <UsersDetail />
      </Show>


      <View.BottomNav>
        <BottomNav.Button onClick={onBottomNavClick} action={"/"} icon={<HomeIcon size={32} />} label="Home" />
        <BottomNav.Button onClick={onBottomNavClick} action={"add"} icon={<AddNewUserIcon size={32} />} label="Add" />
      </View.BottomNav>

    </View>
  );
}

export default ManageUserView;