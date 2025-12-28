import { useNavigate } from 'react-router';
import AdminUserIcon from '../../assets/icons/AdminUserIcon';
import PlainUserIcon from '../../assets/icons/PlainUserIcon';
import SolidReportIcon from '../../assets/icons/SolidReportIcon';

import Button from '../../Components/Buttons/Button';
import PrimaryButton from '../../Components/Buttons/PrimaryButton';
import FlexColumn from '../../Components/FlexComponents/FlexColumn';
import FlexRow from '../../Components/FlexComponents/FlexRow';
import UserList from '../../Components/Lists/User/UserList';
import ScrollView from '../../Components/ScrollView/ScrollView';
import UserRow from '../ManageUser/Components/UserRow';
import Card from '../Templates/Components/Cards/Card';
import BottomNav from '../Templates/View/Components/BottomNav';
import View from '../Templates/View/View';
import AccountUserDetails from './Components/AccountUserDetails';
import CurrentUserDetails from './Components/CurrentUserDetails';
import UsersDetail from './Components/UsersDetail';
import styles from './manageUserView.module.css';
import DropdownPanel from '../../Components/DropdownPanel/DropdownPanel';
import EditUserForm from '../../Forms/EditUser/EditUserForm';
import EditAuthUserPanel from './Components/EditAuthUserPanel';
import HomeIcon from '../../assets/icons/HomeIcon';

const ManageUserView = ({ ...props }) => {
  const navigate = useNavigate();

  const onBottomNavClick = (e,action) => {
    navigate("/",{ viewTransition: true });
  }

  return (
    <View>
      
      <View.Header title={"Manage Users"} />

      <View.SectionTitle>Account Details</View.SectionTitle>
      <AccountUserDetails total={10} used={5} />

      <View.SectionTitle>Current User</View.SectionTitle>
      <CurrentUserDetails />

      <View.SectionTitle>Current Users</View.SectionTitle>

      <UsersDetail />

      <View.BottomNav fixed={false}>
        {/* <BottomNav.Button.Icon><SolidReportIcon size={40} /></BottomNav.Button.Icon>
        <BottomNav.Button.Label>Home</BottomNav.Button.Label> */}
        <BottomNav.Button onClick={onBottomNavClick} action={"/"} icon={<HomeIcon size={40} />} label="Home" />
      </View.BottomNav>

    </View>
  );
}

export default ManageUserView;