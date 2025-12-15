
import AdminUserIcon from '../../../assets/icons/AdminUserIcon';
import PlainUserIcon from '../../../assets/icons/PlainUserIcon';
import TrashIcon from '../../../assets/icons/TrashIcon';
import IconButton from '../../../Components/Buttons/IconButton';
import FlexColumn from '../../../Components/FlexComponents/FlexColumn';
import FlexRow from '../../../Components/FlexComponents/FlexRow';
import styles from '../manageUserView.module.css';
import siteStyles from '../../../site.module.css';
import Format from '../../../Utils/Format';
import { useAuth } from '../../../hooks/useAuth';

const UserRow = ({user,isLastAdmin,onClick}) => {  
  const {username,isAdmin,registeredDate} = user;  
  const auth = useAuth();

  const renderDeleteButton = (user) => {
    const authUser = auth.getAuthUser();
    if (!user.isAdmin || (authUser.id === user.id)){
      return (
        <FlexRow flex='.45'>
          <IconButton action="delete" onClick={(e) => onClick(e,user.id)}>
            <TrashIcon size={24} />
          </IconButton>
        </FlexRow>
      )
    }

    return (
      <FlexRow flex='.45' />
    )
  }

  return (
    <li className={styles.user_row} onClick={(e) => onClick(e,user.id)}>
      {
        !isAdmin ? (<FlexRow flex='.25'><PlainUserIcon size={40} /></FlexRow>) : (<FlexRow flex='.25'><AdminUserIcon size={60}/></FlexRow>)
      }
      
      <FlexColumn flex='2' g='.25rem'>
        <div className={siteStyles.md}>{user.registeredDate === "" ? "Pending" : username}</div>
        <div className={siteStyles.sm}>Activated: {user.registeredDate === "" ? "" : Format.shortDateTime(registeredDate)}</div>
      </FlexColumn>
      {renderDeleteButton(user)}
    </li>
  )
}

export default UserRow;