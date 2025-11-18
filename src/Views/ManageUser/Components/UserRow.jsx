
import AdminUserIcon from '../../../assets/icons/AdminUserIcon';
import PlainUserIcon from '../../../assets/icons/PlainUserIcon';
import TrashIcon from '../../../assets/icons/TrashIcon';
import IconButton from '../../../Components/Buttons/IconButton';
import FlexColumn from '../../../Components/FlexComponents/FlexColumn';
import FlexRow from '../../../Components/FlexComponents/FlexRow';
import styles from '../manageUserView.module.css';
import siteStyles from '../../../site.module.css';

const UserRow = ({id,userName,activationDate,isAdmin,isLastAdmin,onClick}) => {  
  return (
    <li className={styles.user_row} onClick={(e) => onClick(e,id)}>
      {
        !isAdmin ? (<FlexRow flex='.25'><PlainUserIcon size={40} /></FlexRow>) : (<FlexRow flex='.25'><AdminUserIcon size={60}/></FlexRow>)
      }
      
      <FlexColumn flex='2' g='.25rem'>
        <div className={siteStyles.md}>{userName}</div>
        <div className={siteStyles.sm}>Activated: {activationDate}</div>
      </FlexColumn>
      { isLastAdmin ? <FlexRow flex='.45'><IconButton action="delete" onClick={(e) => onClick(e,id)}><TrashIcon size={24} /></IconButton></FlexRow> : <FlexRow flex='.45'></FlexRow>}
    </li>
  )
}

export default UserRow;