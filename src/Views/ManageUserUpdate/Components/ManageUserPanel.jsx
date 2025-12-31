
import { useParams } from 'react-router';
import OutlineButton from '../../../Components/Buttons/OutlineButton';
import DropdownPanel from '../../../Components/DropdownPanel/DropdownPanel';
import FlexRow from '../../../Components/FlexComponents/FlexRow';
import useAppContext from '../../../hooks/useAppContext';
import Filter from '../../../Utils/Filter';
import UserCard from '../../Templates/Components/Cards/UserCard';
import styles from '../manageUserView.module.css';
import ManageUserStoreList from '../../../Forms/Components/ManageUserStoreList/ManageUserStoreList';
import { useEffect, useRef, useState } from 'react';
import OutlineEmailIcon from '../../../assets/icons/OutlineEmailIcon';
import SolidEmailIcon from '../../../assets/icons/SolidEmailIcon';
import PlainUserIcon from '../../../assets/icons/PlainUserIcon';
import AdminUserIcon from '../../../assets/icons/AdminUserIcon';
import User from '../../../Models/User';
import SolidCalendarIcon from '../../../assets/icons/SolidCalendarIcon';

const ManageUserPanel = ({ currentUser,onClick,when,close }) => {
  const [user,setUser] = useState();

  const editHistory = useRef();

  useEffect(() => {
    setUser(currentUser);
  },[currentUser])
  
  
  
  const onDoneButtonClick = (e) => {
    close && close();
  }

  const onStoreRowClick = (e,storeId) => {
    const currentStoreCount = user.stores.length;
    const filteredStores = user.stores.filter(store => store !== storeId);
    if (filteredStores.length < currentStoreCount){
      setUser({...user,stores:[...filteredStores]});
      return;
    }
    setUser({...user,stores:[...user.stores,storeId]});
  }



  return (
    <DropdownPanel p='1rem' when={when}>

      <UserCard m='0'>
        <UserCard.Header name={`${user?.firstName} ${user?.lastName}`} username={user?.username} role={user?.isAdmin ? "Administrator" : "User"} />
        <UserCard.Body>
          <UserCard.Details>
            <UserCard.DetailRow icon={user?.isAdmin ?  <AdminUserIcon size={38} /> : <PlainUserIcon size={32} />} label={"Level"} value={user?.isAdmin ? "Administrator" : "User"} /> 
            <UserCard.DetailRow icon={<SolidEmailIcon size={32} />} label={"Email"} value={user?.email} /> 
            <UserCard.DetailRow icon={<SolidCalendarIcon size={32} />} label={"Activated on"} value={user?.registeredDate} /> 
          </UserCard.Details>
          <ManageUserStoreList currentUser={user} onClick={onStoreRowClick} p='0' />
        </UserCard.Body>
      </UserCard>

      <div style={{flex:"1"}}></div>
      
      <FlexRow m='0 0 calc(env(safe-area-inset-bottom)) 0'>
        <OutlineButton action={"/manage/users"} size='lg' onClick={onDoneButtonClick}>Done</OutlineButton>
      </FlexRow>
      
    </DropdownPanel>
  );
}

export default ManageUserPanel;