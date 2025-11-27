
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

  const onCreateUseCodeButtonClick = (e) => {

    if (e.currentTarget.dataset.action === "close"){
      setIsDropdownSowing(false);
      setUserRegistrationCode("");
      return;
    }

    if (e.currentTarget.innerText === "Submit"){
      if (userRegistrationEmail === "") return;
      setIsDropdownSowing(false);
      loader.loading();      
      const intv = setTimeout(() => {
        setUsers([...users,{id:7,userName:userRegistrationCode,activatedDate:"Pending",isAdmin:false}])
        setUserRegistrationCode("");
        loader.loaded();
        clearTimeout(intv);
      },3000)
      return;
    }
    const intTo = setTimeout(() => {
      setUserRegistrationCode("BR19-7R29-X1");
      clearTimeout(intTo);
    },3000)
  }

  const onUserRowClick = (e,action) => {
     console.log(`User ${action} row clicked`);
    setIsManageUserShowing(true);
    setCurrentUser(action);
  }

  const onUserEditIconClick = (e) => {
    setIsUserSettingsShowing(true);
  }

  const onSaveButtonClick = (e) => {
    if (e.currentTarget.dataset.action === "close"){
      setIsUserSettingsShowing(false);
      return;
    }
    setIsUserSettingsShowing(false);
  }

  const onGrantStoreButtonClick = (e) => {

  }

  if (status.isLoading){
    return <div>Loading...</div>
  }

  return (
    <div className={styles.manage_user}>

      <div className={`${styles.user_settings_panel} ${isUserSettingsShowing ? styles.showing : ""}`}>

        <FlexColumn flex='1' g='1rem'>
          <Heading size='lg'>User Settings</Heading>

          <FlexRow hAlign='space-between' p='1rem' >
            <PlainUserIcon size={80} />
            <FlexColumn vAlign='flex-end'>
              <label style={{color:"snow",fontSize:"1.75rem",fontWeight:"800"}}>devuser</label>
              <label style={{color:"snow",fontSize:"1.5rem"}}>Administrator</label>
            </FlexColumn>
          </FlexRow>

          <FlexRow>
            <TextField placeholder="First name"/>
          </FlexRow>
          <FlexRow>
            <TextField placeholder="Last name"/>
          </FlexRow>
          <FlexRow>
            <TextField placeholder="Email address"/>
          </FlexRow>
          <FlexRow>
            <TextField placeholder="Phone"/>
          </FlexRow>
        </FlexColumn>

        <FlexRow g='1rem'>
          <NavButton active={true} size='md' theme='dark' onClick={onSaveButtonClick}>Save</NavButton>
          <IconButton action="close" onClick={onSaveButtonClick}>
            <span style={{color:"red",fontWeight:"800",fontSize:".8rem"}}>X</span>
          </IconButton>
        </FlexRow>


      </div> 
      
      <AddUserFormPanel when={isDropdownShowing} close={setIsDropdownSowing} />

      <ManageUserPanel when={isManageUserShowing} onChange={(e) => setIsManageUserShowing(false)} user={users.filter(user => user.id === currentUser)[0]} stores={stores} />

      <Heading size='lg'>Manage Users</Heading>
      {/* <h1>Manage Users</h1> */}

      {/* Account user count details */}
      <AccountDetailsPanel account={{...account,activeUsers:users}} />      

      {/* Logged in user details, logout, and reset password buttons */}
      <CurrentUserDetailPanel onToggleUserPanel={onUserEditIconClick} />
      

      {/* Users for the current account */}
      <div className={`${styles.manage_user_section} ${siteStyles.flex_4}`}>
        
        <label className={styles.label}>Active users</label>

        <div className={`${styles.panel_section} ${siteStyles.flex_4}`}>

          

          <div style={{position:"relative",flex:"1",width:"100%"}}>

            <div style={{position:"absolute",display:"flex",flexDirection:"column",gap:"1rem",top:"0",left:"0",width:"100%",height:"100%",overflowY:"scroll"}}>
              {users.map(user => {
                  const doesAdminExist = isLastAdmin(users,user.id);
                  return (
                    <UserRow 
                      key={user.id} 
                      id={user.id} 
                      isAdmin={user.isAdmin} 
                      isLastAdmin={doesAdminExist} 
                      userName={user.username} 
                      activationDate={user.activatedDate} 
                      onClick={onUserRowClick} />
                  )
                })}
            </div>

          </div>
          
          <div className={styles.manage_user_button_section}>

            <NavButton disabled={users.length >= 4 ? true : false}  size='md' active={true} onClick={onAddUserButtonClick}>Add</NavButton>   

                

          </div>

        </div>
      </div>          

    </div>
  );
}

export default ManageUserView;