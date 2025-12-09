import CashierReportIcon from "../../../assets/icons/CashierReportIcon";
import FavoriteReportsIcon from "../../../assets/icons/FavoriteReportsIcon";
import ItemReportIcons from "../../../assets/icons/ItemReportIcons";
import PlainUserIcon from "../../../assets/icons/PlainUserIcon";
import ReportBuilderIcon from "../../../assets/icons/ReportBuilderIcon";
import StoreIcon from "../../../assets/icons/StoreIcon";


export const homeMenuGridItems = [
  {
    title: "Customer",
    Icon: PlainUserIcon,
    action: "customer"
  },
  {
    title: "Store",
    Icon: StoreIcon,
    action: "store"
  },
  {
    title: "Item",
    Icon: ItemReportIcons,
    action: "item"
  },
  {
    title: "Cashier",
    Icon: CashierReportIcon,
    action: "cashier"
  },
  {
    title: "Favorites",
    Icon: FavoriteReportsIcon,
    action: "favorites"
  },
  {
    title: "Builder",
    Icon: ReportBuilderIcon,
    action: "builder"
  },
]