
import { useNavigate } from 'react-router';
import SettingsIcon from '../../../assets/icons/SettingsIcon';
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
import SolidReportIcon from '../../../assets/icons/SolidReportIcon';
import DollarSignIcon from '../../../assets/icons/DollarSignIcon';
import ChartTabView from './Components/ChartTabView';
import { useCallback, useRef, useState } from 'react';
import RefreshIndicator from '../../../Components/Loader/RefreshIndicator';
import Calculate from '../../../Utils/Caclulate';
import WEModal from '../../../Components/WEModal/WEModal';
import useModal from '../../../Components/WEModal/hooks/useModal';
import DatePickerModal from '../../../Modals/DatePickerModal';
import PeriodSelector from '../../../Components/PeriodSelector/PeriodSelector';
import PerentSignIcon from '../../../assets/icons/PercentSignIcon';
import ViewModalManager from './Components/ViewModalManager';


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
  debugger;

  const parseSales = (salesData,compareData) => {
    const salesFilter = {
      totalSales: {
        title: "Revenue",
        format: "shortCurrency",
        property: "total"
      },
      costOfGoodsSold: {
        title: "COG Sold",
        format: "shortCurrency",
        property: "total"
      },
      margin: {
        title:"Margin",
        format: "percentage",    
      },
      avgBasket: {
        title: "Avg Basket",
        format: "currency"
      }
    }
    const salesStatArray = [];
    
    let totalSalesStat = {};
    let totalCostOfGoodsSoldStat = {};

    salesData.forEach(data => {
      if (data.lookup === "totalSales") {
        totalSalesStat = data;
      }
      if (data.lookup === "costOfGoodsSold") {
        totalCostOfGoodsSoldStat = data;
      }
      const statMeta = salesFilter[data.lookup];
      if (statMeta){
        const previousStat = compareData.filter(cd => cd.lookup === data.lookup)[0];
        const value = data[statMeta.property];
        salesStatArray.push({
          title: statMeta.title,
          format: statMeta.format,
          value: value,
          delta: Calculate.percentChange(previousStat[statMeta.property],value)
        })
      }
    })
    
    const prevTotalSalesStat = compareData.filter(cd => cd.lookup === totalSalesStat.lookup)[0];
    const prevTotalCostOfGoodsSoldStat = compareData.filter(cd => cd.lookup === totalCostOfGoodsSoldStat.lookup)[0];
    const marginStatMeta = salesFilter.margin;
    const avgBasketStatMeta = salesFilter.avgBasket;
    salesStatArray.push({
      title: avgBasketStatMeta.title,
      format: avgBasketStatMeta.format,
      value: totalSalesStat.total / totalSalesStat.quantity,
      delta: Calculate.percentChange(prevTotalSalesStat.total / prevTotalSalesStat.quantity,totalSalesStat.total / totalSalesStat.quantity)
    })
    salesStatArray.push({
      title: marginStatMeta.title,
      format: marginStatMeta.format,
      value: Calculate.margin(totalSalesStat.total,totalCostOfGoodsSoldStat.total),
      delta: Calculate.percentChange(Calculate.margin(prevTotalSalesStat.total,prevTotalCostOfGoodsSoldStat.total),Calculate.margin(totalSalesStat.total,totalSalesStat.total))
    })
    return salesStatArray;
  }

  const parseLoyalty = (loyaltyData,compareData) => {
    const salesFilter = {
      customers: {
        title: "Customers",
        format: "shortCurrency",
        property: "total"
      },
      items: {
        title: "Items",
        format: "shortNumber",
        property: "quantity"
      },
      pointsGiven: {
        title:"Points Given",
        format: "shortNumber",
        property: "quantity"    
      },
      pointsRedeemed: {
        title: "Points Redeemed",
        format: "shortNumber",
        property: "quantity"
      }
    }

    const loyaltyStatArray = [];
    loyaltyData.forEach(data => {
      const statMeta = salesFilter[data.lookup];
      if (statMeta){
        loyaltyStatArray.push({
          title: statMeta.title,
          format: statMeta.format,
          value: data[statMeta.property],
          delta: data[statMeta.property]
        })
      }
    })

    return loyaltyStatArray;
  }

  const parseCoupons = (couponData,compareData) => {
    const couponFilter = {
      storeCoupon: {
        title: "Store Coupons",
        format: "shortCurrency",
        property: "total"
      },
      eStoreCoupon: {
        title: "E Store Coupon",
        format: "currency",
        property: "total"
      },
      venderCoupon: {
        title:"Vendor Coupons",
        format: "currency",
        property: "total"    
      },
      eVendorCoupon: {
        title: "E Vendor Coupon",
        format: "currency",
        property: "total"
      }
    }

    const couponStatsArray = [];

    couponData.forEach(coupon => {
      const statMeta = couponFilter[coupon.lookup];
      couponStatsArray.push({
        title: statMeta.title,
        format: statMeta.format,
        value: coupon[statMeta.property],
        quantity: coupon.quantity,
        delta: coupon[statMeta.propterty]
      })
    })

    return couponStatsArray;
  }

  const parseTaxes = (taxData,compareData) => {
    const taxFilter = {
      tax: {
        title: "Tax",
        format: "currency",
        property: "total"
      },
      taxable: {
        title: "Taxable",
        format: "shortCurrency",
        property: "total"
      }
    }

    const taxStatsArray = [];

    taxData.forEach(tax => {
      const statMeta = taxFilter[tax.lookup];
      taxStatsArray.push({
        title: statMeta.title,
        format: statMeta.format,
        value: tax[statMeta.property],
        quantity: parseInt(tax.quantity),
        delta: Calculate.percentChange(compareData[statMeta.property],tax[statMeta.property]),
      })
    })

    return taxStatsArray;
  }

  const parseTransaction = (transData,compareData) => {
    const transFilter = {
      customers: {
        title: "Customers",
        format: "shortNumber",
        property: "quantity"
      },
      items: {
        title: "Items",
        format: "shortNumber",
        property: "quantity"
      },
      itemsScanned: {
        title:"Items Scanned",
        format: "shortNumber",
        property: "quantity"    
      },
      salesKeyed: {
        title: "Sales Keyed",
        format: "shortNumber",
        property: "quantity"
      }
    }

    const transStatsArray = [];

    transData.forEach(data => {
      const statMeta = transFilter[data.lookup];
      if (statMeta){
        transStatsArray.push({
          title: statMeta.title,
          format: statMeta.format,
          value: data[statMeta.property],
          quantity: data.quantity,
          delta: data.quantity
        })
      }
    })
    return transStatsArray;
  }

  const parseExceptions = (exceptionData,compareData) => {
     const exceptionFilter = {
      cancelPrevItem: {
        title: "Cancel Prev Item",
        format: "shortNumber",
        property: "quantity"
      },
      refunds: {
        title: "Refunds",
        format: "shortNumber",
        property: "quantity"
      },
      noSales: {
        title:"No Sales",
        format: "shortNumber",
        property: "quantity"    
      },
      cancelOrder: {
        title: "Canceled Orders",
        format: "shortNumber",
        property: "quantity"
      }
    }

    const exceptionStatsArray = [];
    exceptionData.forEach(data => {
      const statMeta = exceptionFilter[data.lookup];
      exceptionStatsArray.push({
        title: statMeta.title,
        format: statMeta.format,
        value: data[statMeta.property],
        quantity: data.quantity,
        delta: data.quantity
      })
    })
    return exceptionStatsArray;
  }

  const viewData = {
    sales: parseSales(todayStats.sales,prevStats.sales),
    exceptions: parseExceptions(todayStats.exception,prevStats.exception),
    loyalty: parseLoyalty(todayStats.loyalty,prevStats.loyalty),
    coupon: parseCoupons(todayStats.coupon,prevStats.coupon),
    tax: parseTaxes(todayStats.tax,prevStats.tax),
    transaction: parseTransaction(todayStats.transaction,prevStats.transaction)
  }
  return viewData;
}

const useStoreReportsView = () => {
  const api = useApiClient();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {modalState,toggleModal} = useModal();


  const currentPeriod = useRef("today");
  const dateLockRef = useRef(false);

  const getPeriodDateRange = (key) => {
    const isDateLocked = dateLockRef.current;
    let selectedPeriod = currentPeriod.current;

    if (isDateLocked) {
      const lockedDateRange = DateUtility.getDateAtPeriodInterval(selectedPeriod,new Date());
      lockedDateRange.startDate = DateUtility.toRequestDateFormat(lockedDateRange.startDate);
      lockedDateRange.endDate = DateUtility.toRequestDateFormat(lockedDateRange.endDate);
      return lockedDateRange;
    }


    

    if (key === "past"){
      if (selectedPeriod === "prevWeek"){
        selectedPeriod = "week";
      }
      if (selectedPeriod === "today"){
        selectedPeriod = "prevDay";
      }
      if (selectedPeriod === "prevDay"){
        selectedPeriod = "today";
      }
      if (selectedPeriod === "prevMonth"){
        selectedPeriod = "month";
      }
    }
    

    const dateRange = DateUtility.getDateForPeriod(selectedPeriod);
    dateRange.startDate = Format.toRequestDateFormat(dateRange.startDate);
    dateRange.endDate = Format.toRequestDateFormat(dateRange.endDate);
    // 
    return dateRange;
  }
  
  const results = useQueries({
    queries: viewQueries.map(query => ({
      queryKey: [`${query.action}_${query.key}`,currentPeriod.current,"dfdd44e8-be22-43ef-8313-95f2d1904566"],
      queryFn: async () => {   
        
        const paramObj = {
          action: query.action,
          agentString: "dfdd44e8-be22-43ef-8313-95f2d1904566",
          posFields: getPeriodDateRange(query.key)
        }  
        const response = await api.post("data",paramObj,{...api.headers.applicationJson});
        debugger;
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
            queryClient.invalidateQueries({queryKey:[`${query.action}_${query.key}`,currentPeriod.current,"dfdd44e8-be22-43ef-8313-95f2d1904566"]})
          })
        }
      };
    }
  })

  const onNavbarClick = (e) => {
    navigate("/report/groups",{viewTransition:true});
  }

  const onDateLockClick = (e,isLocked) => {
    dateLockRef.current = isLocked;
  }

  const onPeriodChange = useCallback((e,period) => {  
    e.stopPropagation();
    e.preventDefault(); 
    if (period === "custom"){
      toggleModal();
      currentPeriod.current = period;    
      return;
    }
    e.currentTarget.scrollIntoView({
      block: 'start',
      inline: 'center',
      behavior: 'smooth' 
    });    
    results.refetchAll();
    currentPeriod.current = period;    
   },[results,toggleModal])


  return {
    navigate,
    results,
    modalState,
    toggleModal,
    onDateLockClick,
    onNavbarClick,
    onPeriodChange
  }
}



const StoreReportsView = ({ ...props }) => {
  const {navigate,results,onNavbarClick,modalState,toggleModal,onPeriodChange,onDateLockClick} = useStoreReportsView();


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

  
  const {coupon,sales,tax,exceptions,loyalty,transaction} = viewAdapter(results.viewData);

  const onViewAllClick = (e,action) => {
    debugger;
    navigate(action,{viewTransition:true});

  }

  return (
    <View>
      <RefreshIndicator when={results.isFetching} />   
      <View.Header showDate={true} title={"Store Report"} onClick={onDateLockClick}/>

        <PeriodSelector onClick={onPeriodChange}/>

        <ScrollView>


          <View.SectionTitle m='.5rem 0'>Store Sales</View.SectionTitle>
          <ChartTabView />

          <View.SectionTitle m='.5rem 0'>General</View.SectionTitle>
          <KpiGrid>
            {sales.length === 0 && <div>No data found</div>}
            {sales.map(stat => {
              return (
                <KpiGrid.SummaryItem 
                  icon={stat.format === "percentage" ? <PerentSignIcon size={20} /> : <DollarSignIcon size={24} />} 
                  label={stat.title} 
                  value={stat.value} 
                  type={stat.format} 
                  subValue={stat.delta}/>
              )
            })}
          </KpiGrid>

          <View.SectionHeader m='.5rem 0' title={"Loyalty"} viewAll={onViewAllClick} action="/report/stores/loyalty"/>
          <KpiGrid>
            {loyalty.length === 0 && <div>No data found!</div>}
            {
              loyalty.map(item => {
                return (
                  <KpiGrid.Item title={item.title} value={item.value} subValue={item.delta} format={item.format} type={item.format} />
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
                  <KpiGrid.Item title={item.title} value={item.value} type={item.format} />
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

      <WEModal config={{showCloseButton:false}} isOpen={modalState} toggle={()=> toggleModal()}>
       <DatePickerModal onClose={() => toggleModal()}/>
       {/* <ViewModalManager modal={"loyalty"} /> */}
      </WEModal>
    </View>
  );
}

export default StoreReportsView;