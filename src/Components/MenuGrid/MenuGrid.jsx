
import { useNavigate } from 'react-router';
import CashierReportIcon from '../../assets/icons/CashierReportIcon';
import FavoriteReportsIcon from '../../assets/icons/FavoriteReportsIcon';
import ItemReportIcons from '../../assets/icons/ItemReportIcons';
import ReportBuilderIcon from '../../assets/icons/ReportBuilderIcon';
import StoreIcon from '../../assets/icons/StoreIcon';
import styles from './menuGrid.module.css';
import PlainUserIcon from '../../assets/icons/PlainUserIcon';
import IconButton from '../Buttons/IconButton';
import FlexRow from '../FlexComponents/FlexRow';
import MenuGridRow from './Components/MenuGridRow';
import CustomerIcon from '../../assets/icons/CustomerIcon';
import MenuGridButton from './Components/MenuGridButton';
import MenuGridButtonTitle from './Components/MenuGridButtonTitle';


const SHORT_SCREEN_ICON_SIZE = 35;
const DEFAULT_ICON_SIZE = 45;

const calculateFontSize = () => {
  if (innerWidth <= 700){
    return SHORT_SCREEN_ICON_SIZE;
  }
  return DEFAULT_ICON_SIZE;
}

const MenuGrid = ({ gridItems,children }) => {
  const navigate = useNavigate();

  const onGridButtonClick = (e,view) => {    
    navigate(`/reports/${view}`,{ viewTransition: true });
  }

  return (
    <div className={styles.menu_grid}>
      
      <MenuGridRow>
        
        <MenuGridButton action="customer" onClick={onGridButtonClick}>
          <PlainUserIcon size={calculateFontSize()} />
          <MenuGridButtonTitle>Customer</MenuGridButtonTitle>
          {/* <span style={{color:"snow"}}>Customer</span> */}
        </MenuGridButton>

        <MenuGridButton action="store" onClick={onGridButtonClick}>
          <StoreIcon size={calculateFontSize()} />
          <MenuGridButtonTitle>Store</MenuGridButtonTitle>
        </MenuGridButton>

        <MenuGridButton action="item" onClick={onGridButtonClick}>
          <ItemReportIcons size={calculateFontSize()} />
          <MenuGridButtonTitle>Item</MenuGridButtonTitle>
        </MenuGridButton>

      </MenuGridRow>

      <MenuGridRow>

        <MenuGridButton action="cashier" onClick={onGridButtonClick}>
          <CashierReportIcon size={calculateFontSize()} />
          <MenuGridButtonTitle>Cashier</MenuGridButtonTitle>
        </MenuGridButton>
        
        <MenuGridButton action="favorites" onClick={onGridButtonClick}>
          <FavoriteReportsIcon size={calculateFontSize()} />
          <MenuGridButtonTitle>Favorites</MenuGridButtonTitle>
        </MenuGridButton>

        <MenuGridButton action="builder" onClick={onGridButtonClick}>
          <ReportBuilderIcon size={calculateFontSize()} />
          <MenuGridButtonTitle>Builder</MenuGridButtonTitle>
        </MenuGridButton>

      </MenuGridRow>
    </div>
  );
}

MenuGrid.Row = MenuGridRow;
MenuGrid.Button = MenuGridButton;
MenuGrid.ButtonTitle = MenuGridButtonTitle;

export default MenuGrid;