
import { useNavigate } from 'react-router';
import SettingsIcon from '../../../assets/icons/SettingsIcon';
import ScrollSelector from '../../../Components/ScrollSelector/ScrollSelector';
import View from '../../Templates/View/View';
import ScrollView from '../../../Components/ScrollView/ScrollView';
import KpiGrid from '../../../Components/Grids/KpiGrid';
import TopCategorySection from '../../Templates/Components/Sections/TopCategorySection';
import SolidSafeIcon from '../../../assets/icons/SolidSafeIcon';
import DrawerIcon from '../../../assets/icons/DrawerIcon';
import LocDataAdapter from '../../../Models/LocReportAdapter';
import Format from '../../../Utils/Format';
import DateUtility from '../../../Utils/DateUtils';
import { useApiClient } from '../../../Api/Api';
import { useQueries, useQueryClient } from '@tanstack/react-query';
import FullScreenLoader from '../../../Components/Loader/FullScreenLoader';
import { calculatePercentChange } from '../../../Utils/Utils';
import SolidReportIcon from '../../../assets/icons/SolidReportIcon';
import DollarSignIcon from '../../../assets/icons/DollarSignIcon';
import ChartTabView from './Components/ChartTabView';
import { useRef, useState } from 'react';
import { div } from 'motion/react-client';
import RefreshIndicator from '../../../Components/Loader/RefreshIndicator';

const scrollSelectorOptions = [
  {
    id: 6,
    text: "Custom",
    action: "custom",
    active: false
  },
  {
    id: 1,
    text: "Today",
    action: "today",
    active: true
  },
  {
    id: 2,
    text: "Yesterday",
    action: "prevDay",
    active: false
  },
  {
    id: 3,
    text: "Last Week",
    action: "prevWeek",
    active: false
  },
  {
    id: 4,
    text: "Last Month",
    action: "prevMonth",
    active: false
  },
  {
    id: 5,
    text: "Last Year",
    action: "prevYear",
    active: false
  }
]

const viewQueries = [
  {
    action: "Stats",
    key: "current",
    adapter(data) {      
      const adaptedData = LocDataAdapter.parseStoreStatsData(data);
      return adaptedData;
    }
  },
  {
    action: "Stats",
    key: "past",
    adapter(data) {      
      const adaptedData = LocDataAdapter.parseStoreStatsData(data);
      return adaptedData;
    }
  },
]

const viewAdapter = (data) => {
  if (!Array.isArray(data)) throw new TypeError("parameter not of type array");      
  const todayStats = data[0];
  const prevStats = data[1];


  const viewData = {
    stats: [
      {
        title: "Revenue",
        format: "shortCurrency",
        value: todayStats.sales.totalSales.total,
        delta: calculatePercentChange((prevStats.sales.totalSales.total,todayStats.sales.totalSales.total))
      },
      {
        title: "COG Sold",
        format: "shortCurrency",
        value: todayStats.sales.costOfGoodsSold.total,
        delta: calculatePercentChange(prevStats.sales.totalSales.quantity,todayStats.sales.totalSales.quantity)
      },
      {
        title: "Avg Basket",
        format: "currency",
        value: todayStats.sales.totalSales.total / todayStats.sales.totalSales.quantity,
        delta: calculatePercentChange(prevStats.sales.totalSales.total / prevStats.sales.totalSales.quantity,todayStats.sales.totalSales.total / todayStats.sales.totalSales.quantity)
      },
      {
        title: "Margin",
        format: "percentage",
        value: parseInt(calculatePercentChange(todayStats.sales.costOfGoodsSold.total,todayStats.sales.totalSales.total)),
        delta: "↓ 1.2%"
      }
    ],
    exceptions: [
      {
        title: todayStats.exception.cancelOrder.description,
        format: "shortNumber",
        value: todayStats.exception.cancelOrder.quantity,
        delta: "↓ 1.2%"
      },
      {
        title: todayStats.exception.noSales.description,
        format: "shortNumber",
        value: todayStats.exception.noSales.total,
        delta: "↓ 1.2%"
      },
      {
        title: todayStats.exception.cancelPrevItem.description,
        format: "shortNumber",
        value: todayStats.exception.cancelPrevItem.quantity,
        delta: "↓ 1.2%"
      },
      {
        title: todayStats.exception.refunds.description,
        format: "currency",
        value: todayStats.exception.refunds.total,
        delta: "↓ 1.2%"
      },
    ],
    loyalty: [
      {
        title: "Points Given",
        format: "shortNumber",
        value: todayStats.loyalty.pointsGiven.quantity,
        delta: "↓ 1.2%"
      },
      {
        title: "Points Redeemed",
        format: "shortNumber",
        value: todayStats.loyalty.pointsRedeemed.quantity,
        delta: "↓ 1.2%"
      },
      {
        title: "Transactions",
        format: "shortNumber",
        value: todayStats.loyalty.customers.quantity,
        delta: "↓ 1.2%"
      },
      {
        title: "Items",
        format: "shortNumber",
        value: todayStats.loyalty.items.quantity.toFixed(0),
        delta: "↓ 1.2%"
      },
    ],
    coupon: [
      {
        title: todayStats.coupon.storeCoupon.description,        
        value: todayStats.coupon.storeCoupon.total,
        quantity: `${todayStats.coupon.storeCoupon.quantity} redeemed`,
        delta: "↓ 1.2%"
      },
      {
        title: todayStats.coupon.eStoreCoupon.description,        
        value: todayStats.coupon.eStoreCoupon.total,
        quantity: `${todayStats.coupon.eStoreCoupon.quantity} redeemed`,
        delta: "↓ 1.2%"
      }
    ],
    tax: [
      {
        title: todayStats.tax.tax.description,        
        value: todayStats.tax.tax.total,
        quantity: todayStats.tax.tax.quantity,
        delta: "↓ 1.2%"
      },
      {
        title: todayStats.tax.taxable.description,        
        value: todayStats.tax.taxable.total,
        quantity: todayStats.tax.taxable.quantity,
        delta: "↓ 1.2%"
      }
    ],
    transaction: [
      {
        title: todayStats.transaction.itemsScanned.description,
        format: "shortNumber",
        value: todayStats.transaction.itemsScanned.quantity,
        delta: "↓ 1.2%"
      },
      {
        title: todayStats.transaction.items.description,
        format: "shortNumber",
        value: todayStats.transaction.items.quantity,
        delta: "↓ 1.2%"
      },
      {
        title: todayStats.transaction.customers.description,
        format: "shortNumber",
        value: todayStats.transaction.customers.quantity,
        delta: "↓ 1.2%"
      },
      {
        title: todayStats.transaction.salesKeyed.description,
        format: "shortNumber",
        value: todayStats.transaction.salesKeyed.quantity,
        delta: "↓ 1.2%"
      },
    ]
  }
  return viewData;
}

const useStoreReportsView = () => {
  const api = useApiClient();
  const navigate = useNavigate();
  const queryClient = useQueryClient();


  const periodRef = useRef("today");

  const getPeriodDateRange = (key) => {
    const selectedPeriod = periodRef.current;
    const dateRange = DateUtility.getDateForPeriod(selectedPeriod);
    dateRange.startDate = Format.toRequestDateFormat(dateRange.startDate);
    dateRange.endDate = Format.toRequestDateFormat(dateRange.endDate);
    debugger;
    return dateRange;
  }
  
  const results = useQueries({
    queries: viewQueries.map(query => ({
      queryKey: [`${query.action}_${query.key}`,"dfdd44e8-be22-43ef-8313-95f2d1904566"],
      queryFn: async () => {   
        
        const paramObj = {
          action: query.action,
          agentString: "dfdd44e8-be22-43ef-8313-95f2d1904566",
          posFields: getPeriodDateRange(query.key)
        }  
        const response = await api.post("data",paramObj,{...api.headers.applicationJson}); 
        
        // const response = await api.post("data",{action:query.action,agentString:"dfdd44e8-be22-43ef-8313-95f2d1904566"},{...api.headers.applicationJson}); 
        if (response.success){
          const adaptedData = query.adapter(response.data);
          
          return adaptedData;
        }  
        throw new Error("Newtwork response was unsuccessfull");
      }      
    })),
    combine: (results) => {      
      return {
        viewData: results.map(r => r.data),
        isLoading: results.some(r => r.isLoading),
        isPending: results.some((result) => result.isPending),
        isFetching: results.some((result) => result.isFetching),
        isError: results.some(r => r.isError),
        refetchAll: () => {
          viewQueries.forEach(query => {
            queryClient.invalidateQueries({queryKey:[`${query.action}_${query.key}`,"dfdd44e8-be22-43ef-8313-95f2d1904566"]})
          })
        }
      };
    }
  })

  const onNavbarClick = (e) => {
    navigate("/report/groups",{viewTransition:true});
  }

  const onPeriodButtonClick = (e,period) => {    
    e.currentTarget.scrollIntoView({
      block: 'start',
      inline: 'center',
      behavior: 'smooth' 
    });    
    periodRef.current = period;    
    results.refetchAll();
   }

  const renderPeriodOptions = () => {
    return scrollSelectorOptions.map((period,index) => {              
      return (
        <ScrollSelector.Item 
          key={period.id} 
          id={period.action} 
          active={periodRef.current === period.action ? true : false} 
          text={period.text} 
          onClick={(e) => onPeriodButtonClick(e,period.action)} 
        />
      )
    })
  }

  return {
    results,
    onNavbarClick,
    render: {
      periodOptions: renderPeriodOptions
    }
  }
}



const StoreReportsView = ({ ...props }) => {
  const {results,onNavbarClick,render} = useStoreReportsView();
  
  





  if (results.isLoading){
    return (
      <FullScreenLoader text={"Loading Store Report Data"} />
    )
  }
  


  if (results.isError){
    return (
      <div>ERROR!!</div>
    )
  }

  
  const {coupon,stats,tax,exceptions,loyalty,transaction} = viewAdapter(results.viewData);

  const onDateLockClick = (e,isLocked) => {
    console.log(isLocked);
  }

  return (
    <View>
      <RefreshIndicator when={results.isFetching} />   
      <View.Header showDate={true} title={"Store Report"} onClick={onDateLockClick}/>
        
        <ScrollSelector>
          {
           render.periodOptions()
          }
        </ScrollSelector>
        
        <ScrollView>


          <View.SectionTitle m='.5rem 0'>Store Sales</View.SectionTitle>
          <ChartTabView />

          <View.SectionTitle m='.5rem 0'>General</View.SectionTitle>
          <KpiGrid>
            {stats.map(stat => {
              return (
                <KpiGrid.SummaryItem icon={<DollarSignIcon size={24} />} label={stat.title} value={Format.string(stat.value,stat.format)}/>
              )
            })}
          </KpiGrid>

          <View.SectionHeader m='.5rem 0' title={"Loyalty"} />
          <KpiGrid>
            {
              loyalty.map(item => {
                return (
                  <KpiGrid.Item title={item.title} value={Format.string(item.value,item.format)}/>
                )
              })
            }
          </KpiGrid>

          <View.SectionHeader m='.5rem 0' title={"Coupons"} />
          {
            coupon.map(item => {
              return (
                <TopCategorySection.Item name={item.title} subtitle={`${item.quantity}`} value={item.value} />
              )
            })
          }


          <View.SectionTitle m='1rem 0 .5rem 0'>Safe & Drawer</View.SectionTitle>
          <KpiGrid>
            <KpiGrid.ActionItem icon={<SolidSafeIcon size={32} />} label={"Safe Report"} />
            <KpiGrid.ActionItem icon={<DrawerIcon size={32} />} label={"Drawer Report"} />
          </KpiGrid>

          
          <View.SectionHeader m='.5rem 0' title={"Taxes"} />
          {
            tax.map(item => {
              return (
                <TopCategorySection.Item name={item.title} subtitle={item.quantity === 0 ? "" : `${item.quantity} items`} value={item.value} />
              )
            })
          }


          
          <View.SectionHeader m='.5rem 0' title={"Exceptions"} />
          <KpiGrid>
            {
              exceptions.map(item => {
                return (
                  <KpiGrid.Item title={item.title} value={Format.string(item.value,item.format)}/>
                )
              })
            }            
          </KpiGrid>

          <View.SectionHeader title={"Transactions"} />
          <KpiGrid>
            {
              transaction.map(item => {
                return (
                  <KpiGrid.Item title={item.title} value={Format.string(item.value,item.format)}/>
                )
              })
            }      
          </KpiGrid>

          <View.SectionTitle m='1rem 0 .5rem 0'>Tools</View.SectionTitle>
          <KpiGrid>
            <KpiGrid.ActionItem icon={<SolidSafeIcon size={32} />} label={"Export"} />
            <KpiGrid.ActionItem icon={<DrawerIcon size={32} />} label={"Send"} />
          </KpiGrid>

          <div style={{height:"75px",width:"100%"}}></div>
        </ScrollView>
        
       
       
       <View.BottomNav>
          <View.BottomNav.Button action="/report/groups" onClick={onNavbarClick} icon={<SolidReportIcon size={36} />}>Home</View.BottomNav.Button>
          {/* <View.BottomNav.Button icon={<StoreIcon size={32}/>}>Stores</View.BottomNav.Button> */}
          <View.BottomNav.Button>Analytics</View.BottomNav.Button>
          <View.BottomNav.Button>Forcasts</View.BottomNav.Button>
          <View.BottomNav.Button icon={<SettingsIcon size={32} />}>Settings</View.BottomNav.Button>
        </View.BottomNav>

    </View>
  );
}

export default StoreReportsView;