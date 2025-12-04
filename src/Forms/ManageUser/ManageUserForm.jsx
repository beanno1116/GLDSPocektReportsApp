
import WECheckbox from '../../Components/Inputs/WECheckbox/WECheckbox';
import InputLabel from '../../Components/Labels/InputLabel';
import styles from './manageUserForm.module.css';
import { useCallback, useEffect, useState } from 'react';
import FlexRow from '../../Components/FlexComponents/FlexRow';
import Button from '../../Components/Buttons/Button';
import IconButton from '../../Components/Buttons/IconButton';
import XIcon from '../../assets/icons/XIcon';
import useAppContext from '../../hooks/useAppContext';
import { AppContext } from '../../Contexts/AppContext';
import ManageUserStoreList from '../Components/ManageUserStoreList/ManageUserStoreList';
import useUpdateUser from '../../Api/Hooks/useUpdateUser';
import { useAuth } from '../../hooks/useAuth';





const ManageUserForm = ({ user,submitHandler }) => {
  const {state} = useAppContext(AppContext);
  const auth = useAuth();
  const [makeAdmin,setMakeAdmin] = useState(user ? user.isAdmin : false);
  const [currentUser,setCurrentUser] = useState();
  // const {mutate,isPending,isError,error,isSuccess} = useUpdateUser();

  


  useEffect(() => {
    if (user){
      ;debugger;
      setMakeAdmin(user.isAdmin);
      setCurrentUser(user);
    }
  },[user])

  const onStoreRowClick = useCallback((e,storeId) => {

    if (!auth.getAuthUser()?.isAdmin) return;

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
  },[currentUser])

  const onCheckboxChangeEvent = (e) => {    
    setMakeAdmin(e.target.value);
    setCurrentUser({...currentUser,isAdmin:!currentUser.isAdmin});    
  }

  const onSaveUserChanges = (e) => {    
    let tmpUser = currentUser;
    ;
    submitHandler && submitHandler(e,{isAdmin:makeAdmin,storeIds:[]});    
  }

  const onCloseButtonClick = (e) => {
    submitHandler(e);
  }

  return (
    <>

      {auth.getAuthUser()?.isAdmin && (        
        <div className={`${styles.admin_checkbox}`}>
          <InputLabel text={"Make Admin"} size='md'/>
          <WECheckbox size="md" value={makeAdmin} onChange={onCheckboxChangeEvent} />
        </div>
      )}

      <ManageUserStoreList stores={state.stores} currentUser={currentUser} onClick={onStoreRowClick} />

      <FlexRow g='1rem'>
        <Button action={"save"} disabled={auth.getAuthUser()?.isAdmin ? false : true} onClick={onSaveUserChanges}>Save</Button>
        <IconButton action="close" onClick={onCloseButtonClick}>
          <XIcon size={20} />
        </IconButton> 
      </FlexRow>
    </>
  );
}

export default ManageUserForm;