import { sub } from "motion/react-client";
import SaleTotalsBarChart from "../Views/Reports/StoreReports/Components/Widgets/SaleTotalsBarChart";
import SalesKpiGrid from "../Views/Reports/StoreReports/Components/Widgets/SalesKpiGrid";
import MarkdownTotals from "../Views/Reports/StoreReports/Components/Widgets/MarkdownTotals";
import SafeDrawerButtonGrid from "../Views/Reports/StoreReports/Components/Widgets/SafeDrawerButtonGrid";
import LoyaltyTotals from "../Views/Reports/StoreReports/Components/Widgets/LoyaltyTotals";
import CouponTotals from "../Views/Reports/StoreReports/Components/Widgets/CouponTotals";
import ExceptionTotals from "../Views/Reports/StoreReports/Components/Widgets/ExceptionTotals";
import ReportToolsButtonGrid from "../Views/Reports/StoreReports/Components/Widgets/ReportTools";
import TaxTotals from "../Views/Reports/StoreReports/Components/Widgets/TaxTotals";
import TransactionTotals from "../Views/Reports/StoreReports/Components/Widgets/TransactionTotals";
import ToolGrid from "../Views/Reports/StoreReports/Components/Widgets/ToolGrid";

const widgets = {
  SalesTotalsBarChart: SaleTotalsBarChart,
  SalesKpiGrid: SalesKpiGrid,
  MarkdownTotals: MarkdownTotals,
  ButtonGrid: SafeDrawerButtonGrid,
  LoyaltyTotals: LoyaltyTotals,
  CouponTotals: CouponTotals,
  ExceptionTotals: ExceptionTotals,
  ReportToolsButtonGrid: ReportToolsButtonGrid,
  TaxTotals: TaxTotals,
  TransactionTotals: TransactionTotals,
  ToolGrid: ToolGrid
}

const reportWidgets = [
  {
    id: 1,
    order: 1,
    title: "This Week",
    source: "weekData",
    link: "SalesTotalsBarChart",
    name: 'SalesTotalsBarChart',
    Widget: SaleTotalsBarChart,
  },
  {
    id: 2,
    order: 2,
    title: "Sales",
    source: "salesData",
    link: "SalesTotals",
    name: 'SalesKpiGrid',
    Widget: SalesKpiGrid,
  },
  {
    id: 3,
    order: 3,
    title: "Markdowns",
    source: "markdownData",
    link: "MarkdownTotals",
    name: 'MarkdownTotals',
    Widget: MarkdownTotals,
  },
  {
    id: 4,
    order: 4,
    title: "Safe & Drawer",
    link: "SafeDrawer",
    name: 'ButtonGrid',
    Widget: SafeDrawerButtonGrid,
  },
  {
    id: 5,
    order: 5,
    title: "Loyalty",
    source: "loyaltyData",
    link: "LoyaltyTotals",
    name: 'LoyaltyTotals',
    Widget: LoyaltyTotals,
  },
  {
    id: 6,
    order: 6,
    title: "Coupons",
    source: "couponData",
    link: "CouponTotals",
    name: 'CouponTotals',
    Widget: CouponTotals,
  },
  {
    id: 8,
    order: 8,
    title: "Exceptions",
    source: "exceptionData",
    link: "ExceptionTotals",
    name: 'ExceptionTotals',
    Widget: ExceptionTotals,
  },
  {
    id: 10,
    order: 10,
    title: "Report Tools",
    link: "ReportTools",
    name: 'ReportToolsButtonGrid',
    Widget: ReportToolsButtonGrid,
  },
  {
    id: 7,
    order: 7,
    title: "Taxes",
    source: "taxData",
    link: "TaxTotals",
    name: 'TaxTotals',
    Widget: TaxTotals,
  },
  {
    id: 9,
    order: 9,
    title: "Transactions",
    source: "transactionData",
    link: "TransactionTotals",
    name: 'TransactionTotals',
    Widget: TransactionTotals,
  },
  {
    id: 11,
    order: 10,
    title: "Report Tools",
    link: "ReportTools",
    name: 'ToolGrid',
    Widget: ToolGrid,
  }
]


const appSettings = {
  viewSettings: {
      storeReports: {
        widgets: [
          {
            id: 1,
            order: 1,
            title: "This Week",
            source: "weekData",
            link: "SalesTotalsBarChart",
            name: 'SalesTotalsBarChart',

          },
          {
            id: 2,
            order: 2,
            title: "Sales",
            source: "salesData",
            link: "SalesTotals",
            name: 'SalesKpiGrid',

          },
          {
            id: 3,
            order: 3,
            title: "Markdowns",
            source: "markdownData",
            link: "MarkdownTotals",
            name: 'MarkdownTotals',

          },
          {
            id: 4,
            order: 4,
            title: "Safe & Drawer",
            link: "SafeDrawer",
            name: 'ButtonGrid',

          },
          {
            id: 5,
            order: 5,
            title: "Loyalty",
            source: "loyaltyData",
            link: "LoyaltyTotals",
            name: 'LoyaltyTotals',

          },
          {
            id: 6,
            order: 6,
            title: "Coupons",
            source: "couponData",
            link: "CouponTotals",
            name: 'CouponTotals',

          },
          {
            id: 8,
            order: 8,
            title: "Exceptions",
            source: "exceptionData",
            link: "ExceptionTotals",
            name: 'ExceptionTotals',

          },
          {
            id: 7,
            order: 7,
            title: "Taxes",
            source: "taxData",
            link: "TaxTotals",
            name: 'TaxTotals',

          },
          {
            id: 9,
            order: 9,
            title: "Transactions",
            source: "transactionData",
            link: "TransactionTotals",
            name: 'TransactionTotals',

          },
          {
            id: 10,
            order: 10,
            title: "Report Tools",
            link: "ReportTools",
            name: 'ToolGrid',

          }
        ],
        widgetOrder: [],
        alerts: [],
        faqs: []
      }
    }
}

const settingsStore = {
  init(){
    
  },
  getValue(group,subgroup,key){
    const settings = JSON.parse(localStorage.getItem("acf"));
    if (settings){
      const settingsGroup = settings[group];
      const settingsSubgoup = settingsGroup[subgroup];
      return settingsSubgoup[key];
    }
    return appSettings;
  },
  setValue(group,subgroup,key,value){    
    const settingsGroup = appSettings[group];
    const settingsSubgoup = settingsGroup[subgroup];
    settingsSubgoup[key] = [...value];
    
    debugger;
    localStorage.setItem("acf",JSON.stringify(appSettings));
  }
}

if (!localStorage.getItem("acf")){
  localStorage.setItem("acf",JSON.stringify(appSettings));
}



const useAppSettings = (settingGroup,settingSubgroup) => {
  let temp = appSettings.viewSettings.storeReports;

  return {
    updateSettings: settingsStore.setValue,
    settings: settingsStore.getValue("viewSettings","storeReports","widgets").map(s => ({
      ...s,
      Widget: widgets[s.name]
    }))
  }
}

export default useAppSettings;