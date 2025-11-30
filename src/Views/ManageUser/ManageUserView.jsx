
import styles from './manageUserView.module.css';
import siteStyles from '../../site.module.css';
import Heading from '../../Components/Labels/Heading';
import FlexRow from '../../Components/FlexComponents/FlexRow';
import UserIcon from '../../assets/icons/UserIcon';
import FlexColumn from '../../Components/FlexComponents/FlexColumn';
import NavButton from '../../Components/Buttons/NavButton';
import TextField from '../../Components/Inputs/TextField';
import { useContext, useState } from 'react';
import UserRow from './Components/UserRow';
import { loader } from '../../Components/Loader/LoaderModal';
import { useNavigate } from 'react-router';
import StoreRow from './Components/StoreRow';
import ManageUserPanel from './Components/ManageUserPanel';
import { useGetOrgUsers } from '../../Api/ApiRoutes';
import AccountDetailsPanel from './Components/AccountDetailsPanel';
import CurrentUserDetailPanel from './Components/CurrentUserDetailPanel';
import IconButton from '../../Components/Buttons/IconButton';
import TrashIcon from '../../assets/icons/TrashIcon';
import { AppContext } from '../../Contexts/AppContext';
import AddUserFormPanel from './Components/AddUserFormPanel';
import PlainUserIcon from '../../assets/icons/PlainUserIcon';
import EditUserDetailsPanel from './Components/EditUserDetailsPanel';
import AccountUsersPanel from './Components/AccountUsersPanel';
import Filter from '../../Utils/Filter';

const account = {
  numberOfUsers: 3
}

const user =   {
    id: 1,
    userName: "beanno1116@gmail.com",
    activatedDate: "04/20/2025",
    isAdmin: true,
    stores: [
      {
        id: 1,
        name: "Value Center",
        city: "Livonia",
        state: "Mi"
      },
      {
        id: 2,
        name: "Value Center",
        city: "Madison Hghts",
        state: "Mi"
      },
    ]
  }

const userData = [
  {
    id: 1,
    userName: "beanno1116@gmail.com",
    activatedDate: "04/20/2025",
    isAdmin: true,
    stores: [
      {
        id: 1,
        name: "Value Center",
        city: "Livonia",
        state: "Mi"
      },
      {
        id: 2,
        name: "Value Center",
        city: "Madison Hghts",
        state: "Mi"
      },
    ]
  },
  {
    id: 2,
    userName: "avi@glds.net",
    activatedDate: "07/10/2025",
    isAdmin: true,
    stores: [
      {
        id: 1,
        name: "Value Center",
        city: "Livonia",
        state: "Mi"
      },
      {
        id: 2,
        name: "Value Center",
        city: "Madison Hghts",
        state: "Mi"
      },
    ]
  },
  {
    id: 3,
    userName: "stevedoe@gmail.com",
    activatedDate: "07/21/2025",
    isAdmin: false,
    stores: [
      {
        id: 1,
        name: "Value Center",
        city: "Livonia",
        state: "Mi"
      }
    ]
  },
  // {
  //   id: 4,
  //   userName: "billdoe@gmail.com",
  //   activatedDate: "07/21/2025",
  //   isAdmin: false,
  //   stores: []
  // },
  // {
  //   id: 5,
  //   userName: "bendoe@gmail.com",
  //   activatedDate: "07/21/2025",
  //   isAdmin: false,
  //   stores: []
  // },
  // {
  //   id: 6,
  //   userName: "mikedoe@gmail.com",
  //   activatedDate: "07/21/2025",
  //   isAdmin: false,
  //   stores: ""
  // },
]

const isLastAdmin = (users,userId) => {
  try {
    const doesAdminExist = users.filter(user => user.id !== userId).some(user => user.isAdmin === true);
    if (doesAdminExist) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(`[ERROR] [HomeView] [isLastAdmin] - ${error.message}`);
  }
}




const ManageUserView = ({ stores }) => {
  // const [users,setUsers] = useState([]);
  const {state} = useContext(AppContext);
  const {status,users} = useGetOrgUsers(state.organization);
  const [showModal,setShowModal] = useState(false);
  const [isDropdownShowing,setIsDropdownSowing] = useState(false);
  const [isUserSettingsShowing,setIsUserSettingsShowing] = useState(false);
  const [isManageUserShowing,setIsManageUserShowing] = useState(false);
  const [userRegistrationCode,setUserRegistrationCode] = useState("");
  const [userRegistrationEmail,setUserRegistrationEmail] = useState("");
  const [currentUser, setCurrentUser] = useState(0);
  const navigate = useNavigate();


  


  const onLogoutButtonClick = (e) => {
     loader.loading();
    const intv = setTimeout(() => {
      navigate("/login");
      loader.loaded();
      clearTimeout(intv);
    },3000)
  }

  const onAddUserButtonClick = (e) => {
    if (isDropdownShowing){
      setIsDropdownSowing(false);
      return;
    }
    setIsDropdownSowing(true);
  }



  const onUserRowClick = (action) => {
     console.log(`User ${action} row clicked`);
    setIsManageUserShowing(true);
    setCurrentUser(action);
  }

  const onUserEditIconClick = (e) => {
    setIsUserSettingsShowing(true);
  }


  const onGrantStoreButtonClick = (e) => {

  }

  if (status.isLoading){
    return <div>Loading...</div>
  }

  return (
    <div className={styles.manage_user}>


      {/* Panel auxillary views */}
      <EditUserDetailsPanel when={isUserSettingsShowing} close={setIsUserSettingsShowing} />
      
      <AddUserFormPanel when={isDropdownShowing} close={setIsDropdownSowing} />

      <ManageUserPanel 
        when={isManageUserShowing} 
        onChange={(e) => setIsManageUserShowing(false)} 
        user={Filter.userById(users,currentUser)} 
        stores={stores} />

      <Heading size='lg' mode='lite'>Manage Users</Heading>

      {/* Account user count details */}
      <AccountDetailsPanel userCount={users.length} seatCount={state.seats} />      

      {/* Logged in user details, logout, and reset password buttons */}
      <CurrentUserDetailPanel onToggleUserPanel={onUserEditIconClick} />
      

      {/* Users for the current account */}
      <AccountUsersPanel users={users} onClick={onUserRowClick} toggle={onAddUserButtonClick} />

    </div>
  );
}

export default ManageUserView;