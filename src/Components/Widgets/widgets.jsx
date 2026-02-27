import CouponTotals from "../../Views/Reports/StoreReports/Components/Widgets/CouponTotals";
import ExceptionTotals from "../../Views/Reports/StoreReports/Components/Widgets/ExceptionTotals";
import LoyaltyTotals from "../../Views/Reports/StoreReports/Components/Widgets/LoyaltyTotals";
import MarkdownTotals from "../../Views/Reports/StoreReports/Components/Widgets/MarkdownTotals";
import ReportToolsButtonGrid from "../../Views/Reports/StoreReports/Components/Widgets/ReportTools";
import SafeDrawerButtonGrid from "../../Views/Reports/StoreReports/Components/Widgets/SafeDrawerButtonGrid";
import SalesKpiGrid from "../../Views/Reports/StoreReports/Components/Widgets/SalesKpiGrid";
import SaleTotalsBarChart from "../../Views/Reports/StoreReports/Components/Widgets/SaleTotalsBarChart";
import TaxTotals from "../../Views/Reports/StoreReports/Components/Widgets/TaxTotals";
import ToolGrid from "../../Views/Reports/StoreReports/Components/Widgets/ToolGrid";
import TopDepartment from "../../Views/Reports/StoreReports/Components/Widgets/TopDepartment";
import TransactionTotals from "../../Views/Reports/StoreReports/Components/Widgets/TransactionTotals";

export const reportWidgets = [
  {
    id: 1,
    order: 1,
    title: "This Week",
    source: "weekData",
    link: "SalesTotalsBarChart",
    name: 'SalesTotalsBarChart',
    Component: SaleTotalsBarChart,
  },
  {
    id: 2,
    order: 2,
    title: "Sales",
    source: "salesData",
    link: "SalesTotals",
    name: 'SalesKpiGrid',
    Component: SalesKpiGrid,
  },
  {
    id: 3,
    order: 3,
    title: "Markdowns",
    source: "markdownData",
    link: "MarkdownTotals",
    name: 'MarkdownTotals',
    Component: MarkdownTotals,
  },
  {
    id: 4,
    order: 4,
    title: "Safe & Drawer",
    link: "SafeDrawer",
    name: 'ButtonGrid',
    Component: SafeDrawerButtonGrid,
  },
  {
    id: 12,
    order: 5,
    source: "departmentData",
    title: "Departments",
    link: "TopDepartment",
    name: 'TopDepartment',
    Component: TopDepartment,
  },
  {
    id: 5,
    order: 6,
    title: "Loyalty",
    source: "loyaltyData",
    link: "LoyaltyTotals",
    name: 'LoyaltyTotals',
    Component: LoyaltyTotals,
  },
  {
    id: 6,
    order: 7,
    title: "Coupons",
    source: "couponData",
    link: "CouponTotals",
    name: 'CouponTotals',
    Component: CouponTotals,
  },
  {
    id: 8,
    order: 8,
    title: "Exceptions",
    source: "exceptionData",
    link: "ExceptionTotals",
    name: 'ExceptionTotals',
    Component: ExceptionTotals,
  },
  {
    id: 10,
    order: 9,
    title: "Report Tools",
    link: "ReportTools",
    name: 'ReportToolsButtonGrid',
    Component: ReportToolsButtonGrid,
  },
  {
    id: 7,
    order: 10,
    title: "Taxes",
    source: "taxData",
    link: "TaxTotals",
    name: 'TaxTotals',
    Component: TaxTotals,
  },
  {
    id: 9,
    order: 11,
    title: "Transactions",
    source: "transactionData",
    link: "TransactionTotals",
    name: 'TransactionTotals',
    Component: TransactionTotals,
  },
  {
    id: 11,
    order: 12,
    title: "Tools",
    link: "ReportTools",
    name: 'ToolGrid',
    Component: ToolGrid,
  }
]

export const widgetComponenets = {
  SalesTotalsBarChart: SaleTotalsBarChart,
  SalesKpiGrid: SalesKpiGrid,
  MarkdownTotals: MarkdownTotals,
  ButtonGrid: SafeDrawerButtonGrid,
  TopDepartment: TopDepartment,
  LoyaltyTotals: LoyaltyTotals,
  CouponTotals: CouponTotals,
  ExceptionTotals: ExceptionTotals,
  ReportToolsButtonGrid: ReportToolsButtonGrid,
  TaxTotals: TaxTotals,
  TransactionTotals: TransactionTotals,
  ToolGrid: ToolGrid
}