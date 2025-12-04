import CheckmarkIcon from '../../../assets/icons/CheckmarkIcon';
import LockIcon from '../../../assets/icons/LockIcon';


import FlexColumn from '../../../Components/FlexComponents/FlexColumn';
import FlexRow from '../../../Components/FlexComponents/FlexRow';
import siteStyles from '../../../site.module.css';
import styles from '../manageUserForm.module.css';

const StoreRow = ({id,name,city,state,active=false,onClick}) => {
  ;
  return (
    <li className={`${siteStyles.panel_bg} ${styles.store_row} `} onClick={(e) => onClick(e,id)}>
      
      <FlexColumn flex='2' g='.25rem'>
        <div className={`${siteStyles.lg} ${siteStyles.lite}`} style={{fontWeight:"800"}}>{name}</div>
        <div className={`${siteStyles.md} ${siteStyles.lite}`} style={{fontWeight:"600"}}>{city}, {state}</div>
      </FlexColumn>
      
      
      <FlexRow flex='.25'>        
        {active ? <CheckmarkIcon size={68} color="#05504698" /> : <LockIcon size={68} color="#9b0d0d7a" />}        
      </FlexRow>
      {/* { isLastAdmin ? <FlexRow flex='.45'><IconButton action="delete" onClick={(e) => onClick(e,id)}><TrashIcon size={24} /></IconButton></FlexRow> : <FlexRow flex='.45'></FlexRow>} */}
    </li>
  )
}

export default StoreRow;