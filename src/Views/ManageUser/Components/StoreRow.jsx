
import AdminUserIcon from '../../../assets/icons/AdminUserIcon';
import PlainUserIcon from '../../../assets/icons/PlainUserIcon';
import TrashIcon from '../../../assets/icons/TrashIcon';
import IconButton from '../../../Components/Buttons/IconButton';
import FlexColumn from '../../../Components/FlexComponents/FlexColumn';
import FlexRow from '../../../Components/FlexComponents/FlexRow';
import siteStyles from '../../../site.module.css';
import styles from '../manageUserView.module.css';

const StoreRow = ({id,name,city,state,active=false,onClick}) => {  
  return (
    <li className={`${siteStyles.panel_bg} ${styles.store_row} ${active ? styles.active : ""}`} onClick={(e) => onClick(e,id)}>
      
      <FlexRow flex='.25'><PlainUserIcon size={40} /></FlexRow>
      
      
      <FlexColumn flex='2' g='.25rem'>
        <div className={`${siteStyles.lg} ${siteStyles.lite}`}>{name}</div>
        <div className={`${siteStyles.md} ${siteStyles.lite}`}>{city}, {state}</div>
      </FlexColumn>
      {/* { isLastAdmin ? <FlexRow flex='.45'><IconButton action="delete" onClick={(e) => onClick(e,id)}><TrashIcon size={24} /></IconButton></FlexRow> : <FlexRow flex='.45'></FlexRow>} */}
    </li>
  )
}

export default StoreRow;