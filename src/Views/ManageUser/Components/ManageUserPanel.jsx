
import XIcon from '../../../assets/icons/XIcon';
import Button from '../../../Components/Buttons/Button';
import IconButton from '../../../Components/Buttons/IconButton';
import NavButton from '../../../Components/Buttons/NavButton';
import DropdownPanel from '../../../Components/DropdownPanel/DropdownPanel';
import FlexColumn from '../../../Components/FlexComponents/FlexColumn';
import FlexRow from '../../../Components/FlexComponents/FlexRow';
import DisplayLabel from '../../../Components/Labels/DisplayLabel';
import Heading from '../../../Components/Labels/Heading';
import styles from '../manageUserView.module.css';
import siteStyles from '../../../site.module.css';
import StoreRow from './StoreRow';
import WECheckbox from '../../../Components/Inputs/WECheckbox/WECheckbox';
import InputLabel from '../../../Components/Labels/InputLabel';
import { useEffect, useState } from 'react';
import Filter from '../../../Utils/Filter';

const ManageUserPanel = ({ stores,user,when,onChange }) => {
  const [makeAdmin,setMakeAdmin] = useState(user ? user.isAdmin : false);
  const [currentUser,setCurrentUser] = useState(user);
  

  useEffect(() => {
    if (user){
      setMakeAdmin(user.isAdmin);
      setCurrentUser(user);
    }
  },[user])

  const onStoreRowClick = (e,storeId) => {

    // if (currentUser.isAdmin) return;

    let currentUserCopy = [...currentUser.stores];
    let isAuthorizedForStore = currentUserCopy.includes(storeId);
    if (isAuthorizedForStore){
      currentUserCopy = [...currentUserCopy.filter(us => us !== storeId)];
      setCurrentUser({...currentUser,stores:currentUserCopy});
      return;
    }

    currentUserCopy = [...currentUserCopy,storeId];

    setCurrentUser({...currentUser,stores:currentUserCopy});

    console.log();
  }

  const onCheckboxChangeEvent = (e) => {    
    setMakeAdmin(e.target.value);
    setCurrentUser({...currentUser,isAdmin:!currentUser.isAdmin});    
  }

  const onSaveUserChanges = (e) => {
    let tmpUser = currentUser;
    debugger;
    onChange && onChange(e);
  }

  return (
    <DropdownPanel when={when}>
      

      <FlexColumn flex='1' g='1rem' width='100%'>

        <Heading size='lg' mode='lite'>Manage User</Heading>

        <DisplayLabel label={"User"} value={user?.username} />

        <div className={`${styles.admin_checkbox}`}>
          <InputLabel text={"Make Admin"} size='md'/>
          <WECheckbox size="md" value={makeAdmin} onChange={onCheckboxChangeEvent} />
        </div>

        <div className={`${siteStyles.panel_bg} ${styles.user_list_panel}`}>
          <FlexColumn width='100%' g='1rem'>
            <div className={`${siteStyles.panel_bg} ${styles.user_list_panel_title}`}>
              Manage Store Access
            </div>
            <FlexColumn width='100%' g='1rem' p='.75rem 1rem'>
              {stores.map(store => {                
                if (!currentUser){
                  return (
                    <StoreRow key={store.id} name={store.name} city={store.city} state={store.state} onClick={(e) => onStoreRowClick(e,store.id)}/>    
                  )
                }
                // if (user.stores.filter(ustore => ustore === store.orgId).length > 0){
                if (currentUser.stores.includes(store.id)){
                  return <StoreRow key={store.id} active={true} name={store.name} city={store.city} state={store.state} onClick={(e) => onStoreRowClick(e,store.id)}/>
                }
                return (
                  <StoreRow key={store.id} name={store.name} city={store.city} state={store.state} onClick={(e) => onStoreRowClick(e,store.id)}/>            
                )
              })}
            </FlexColumn>
          </FlexColumn>
        </div>

      </FlexColumn>

      <FlexRow g='1rem'>
        <Button action={"save"} onClick={onSaveUserChanges}>Save</Button>
        <IconButton action="close" onClick={onSaveUserChanges}>
          <XIcon size={20} />
        </IconButton> 
      </FlexRow>

    
    </DropdownPanel>
  );
}

export default ManageUserPanel;