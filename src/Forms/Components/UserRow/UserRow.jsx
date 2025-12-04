

import AdminUserIcon from '../../../assets/icons/AdminUserIcon';
import PlainUserIcon from '../../../assets/icons/PlainUserIcon';
import FlexColumn from '../../../Components/FlexComponents/FlexColumn';
import FlexRow from '../../../Components/FlexComponents/FlexRow';
import Format from '../../../Utils/Format';
import siteStyles from '../../../site.module.css';
import styles from './userRow.module.css';

const UserRow = ({user,isLastAdmin,onClick}) => {  
  const {username,isAdmin,registeredDate} = user;
  return (
    <li className={styles.user_row} onClick={(e) => onClick(e,user.id)}>
      {
        !isAdmin ? (<FlexRow flex='.25'><PlainUserIcon size={40} /></FlexRow>) : (<FlexRow flex='.25'><AdminUserIcon size={60}/></FlexRow>)
      }
      
      <FlexColumn flex='2' g='.25rem'>
        <div className={siteStyles.md}>{username}</div>
        <div className={siteStyles.sm}>Activated: {Format.shortDateTime(registeredDate) }</div>
      </FlexColumn>
      { isLastAdmin ? <FlexRow flex='.45'><IconButton action="delete" onClick={(e) => onClick(e,user.id)}><TrashIcon size={24} /></IconButton></FlexRow> : <FlexRow flex='.45'></FlexRow>}
    </li>
  )
}

export default UserRow;