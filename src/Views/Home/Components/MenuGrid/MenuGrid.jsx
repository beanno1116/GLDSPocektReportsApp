
import { useNavigate } from 'react-router';
import CashierReportIcon from '../../../../assets/icons/CashierReportIcon';
import FavoriteReportsIcon from '../../../../assets/icons/FavoriteReportsIcon';
import ItemReportIcons from '../../../../assets/icons/ItemReportIcons';
import ReportBuilderIcon from '../../../../assets/icons/ReportBuilderIcon';
import ReportsIcons from '../../../../assets/icons/ReportsIcons';
import StoreIcon from '../../../../assets/icons/StoreIcon';
import StoreReportIcon from '../../../../assets/icons/StoreReportIcon';
import IconButton from '../../../../Components/Buttons/IconButton';
import FlexRow from '../../../../Components/FlexComponents/FlexRow';
import styles from './menuGrid.module.css';
import PlainUserIcon from '../../../../assets/icons/PlainUserIcon';

const MenuGrid = ({ ...props }) => {
  const navigate = useNavigate();

  const onGridButtonClick = (e) => {
    navigate("/reports/item",{ viewTransition: true });
  }

  return (
    <div className={styles.menu_grid}>
      <FlexRow hAlign='space-evenly' g='.75rem'>
        <IconButton>
          <PlainUserIcon size={45} />
          <span style={{color:"snow"}}>Customer</span>
        </IconButton>
        <IconButton>
          <StoreIcon size={45} />
          <span style={{color:"snow"}}>Store</span>
        </IconButton>
        <IconButton onClick={onGridButtonClick}>
          <ItemReportIcons size={45} />
          <span style={{color:"snow"}}>Item</span>
        </IconButton>
      </FlexRow>
      <FlexRow hAlign='space-evenly' g='.75rem'>
        <IconButton>
          <CashierReportIcon size={45} />
          <span style={{color:"snow"}}>Cashier</span>
        </IconButton>
        <IconButton>
          <FavoriteReportsIcon size={45} />
          <span style={{color:"snow"}}>Favorites</span>
        </IconButton>
        <IconButton>
          <ReportBuilderIcon size={45} />
          <span style={{color:"snow"}}>Builder</span>
        </IconButton>
      </FlexRow>
    </div>
  );
}

export default MenuGrid;