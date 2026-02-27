
import { useState } from 'react';
import IconButton from '../../Components/Buttons/IconButton';
import PrimaryButton from '../../Components/Buttons/PrimaryButton';
import FlexColumn from '../../Components/FlexComponents/FlexColumn';
import FlexRow from '../../Components/FlexComponents/FlexRow';
import ViewHeading from '../../Components/Headings/ViewHeading';
import ScrollView from '../../Components/ScrollView/ScrollView';
import CloseIcon from '../../Components/WEModal/components/icons/CloseIcon';
import useGlobalDate from '../../hooks/useGlobalDate';
import View from '../Templates/View/View';
import ReportTypeStep from './Components/ReportTypeStep';
import ProgressBar from './Components/ProgressBar';
import styles from './reportBuilder.module.css';
import Show from '../../Components/Show/Show';
import DateRangeStep from './Components/DateRangeStep';
import ReportSummary from './Components/ReportSummary';
import SelectMetricsStep from './Components/SelectMetricsStep';
import TextField from '../../Components/Inputs/TextField';
import SecondaryButton from '../../Components/Buttons/SecondaryButton';
import { useQueries } from '@tanstack/react-query';
import useAppContext from '../../hooks/useAppContext';
import { useApiClient } from '../../Api/Api';
import { getReportQueries } from '../../Api/Queries/apiQueries';
import Format from '../../Utils/Format';
import { createSalesReport, createSalesTenderReport } from '../../Services/ReportPDFServices';
import Filter from '../../Utils/Filter';
import { useAuth } from '../../hooks/useAuth';



const useReportBuilder = (type,close) => {
  const {state,dispatch} = useAppContext();
  const api = useApiClient();
  const authUser = useAuth().getAuthUser();
  const [step,setStep] = useState(1);
  const [reportConfig, setReportConfig] = useState({
    builderType: type,
    reportType: null,
    dateType: null,
    startDate: Format.toRequestDateFormat(new Date()),
    endDate: Format.toRequestDateFormat(new Date()),
    compareStartDate: null,
    compareEndDate: null,
    selectedMetrics: [],
    reportName: ''
  });

  const results = useQueries({
    queries: getReportQueries(type,reportConfig,[state.agentString]).map(query => ({
      queryKey: query.key,
      queryFn: async () => {   
        
        const paramObj = {
          action: query.action,
          agentString: state.agentString,
          posFields: query.dateRange
        }  
        const response = await api.post("data",paramObj,{...api.headers.applicationJson});
        // 
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
          viewQueries(dateRanges,["dfdd44e8-be22-43ef-8313-95f2d1904566"]).forEach(query => {
            queryClient.invalidateQueries({queryKey:query.key})
          })
        }
      };
    }
  })


  const onReportTypeSelect = (reportType) => {
    setReportConfig({ ...reportConfig, reportType: reportType });
    setStep(2);
  }

  const handleDateSelection = (dates) => {
    setReportConfig({ ...reportConfig, ...dates });
    if (reportConfig.reportType === "range" || reportConfig.reportType === "comparison"){
      return;
    }
    if (!results.isLoading){
      setStep(3);
    }
  }

  const toggleMetric = (metricId) => {
    setReportConfig(prev => ({
      ...prev,
      selectedMetrics: prev.selectedMetrics.includes(metricId)
        ? prev.selectedMetrics.filter(id => id !== metricId)
        : [...prev.selectedMetrics, metricId]
    }));
  }

  const generateReport = () => {
    let tmp = reportConfig.selectedMetrics;
    
    let reportItems = [];
    const handleResponse = (response) => {

      if (type === "tender"){
        reportItems = results.viewData[0].tenders.filter(res => reportConfig.selectedMetrics.includes(res.lookup));
        createSalesTenderReport(`${authUser.firstName} ${authUser.lastName}`,Filter.storeById(state.stores,state.activeStore).name,{startDate:reportConfig.startDate,endDate:reportConfig.endDate},reportItems);
      }else if (type === "sales"){
        reportItems = results.viewData[0].sales.filter(res => reportConfig.selectedMetrics.includes(res.lookup));
        createSalesReport(`${authUser.firstName} ${authUser.lastName}`,Filter.storeById(state.stores,state.activeStore).name,{startDate:reportConfig.startDate,endDate:reportConfig.endDate},reportItems);
      }
      close();
      
    }
    handleResponse();
    console.log("");
  }

  const selectPopularMetrics = () => {}

  const stepBack = () => {
    setStep(step - 1);
  }
  const nextStep = () => {
    if (step === 2){

    }
    setStep(step + 1);
  }
  
  return {
    generateReport,
    handleDateSelection,
    nextStep,
    onReportTypeSelect,
    step,
    reportConfig,
    results,
    selectPopularMetrics,
    setReportConfig,
    stepBack,
    toggleMetric,
  }
}

const ReportBuilder = ({ type,close }) => {
  const {generateReport,onReportTypeSelect,step,stepBack,nextStep,setReportConfig,handleDateSelection,selectPopularMetrics,toggleMetric,reportConfig,results} = useReportBuilder(type,close);
  return (
    <View solid={true}>

       <ViewHeading showDatePicker={false} title={`${type} Report Builder`} />

       <ProgressBar step={step}/>

       <FlexColumn width='100%' height='100%'>

        <Show when={step === 1}>
          <ReportTypeStep.Header title={"Choose Report Type"} subtitle={"Select the type of report you want to generate"} />
          <ScrollView bottom="45px">
            <ReportTypeStep onReportTypeSelect={onReportTypeSelect} reportConfig={reportConfig} />
          </ScrollView>
        </Show>

        <Show when={step === 2}>
          <DateRangeStep.Header title={"Select Date Range"} onChange={setReportConfig} reportConfig={reportConfig} />
          <ScrollView>
            <DateRangeStep reportConfig={reportConfig}  nextStep={nextStep} onChange={handleDateSelection} updateReportConfig={setReportConfig} />
            <ReportSummary step={step} reportConfig={reportConfig}/>
          </ScrollView>
        </Show>

        <Show when={!results.isLoading && step === 3}>
          <div className={styles.step_header}>
            <div className={styles.step_title}>Select Metrics</div>
            <div className={styles.step_subtitle} style={{margin:"0 0 .5rem 0"}}>
              Choose the data points to include in your report
              <span className={styles.selected_count}>
                  ({reportConfig.selectedMetrics.length} selected)
                </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className={styles.quick_actions}>
            <button
              className={styles.quick_action_btn}
              onClick={selectPopularMetrics}
            >
              ⭐ Add Popular Metrics
            </button>
            <button
              className={styles.quick_action_btn}
              onClick={() => setReportConfig({ ...reportConfig, selectedMetrics: [] })}
            >
              🗑️ Clear All
            </button>
          </div>
          
          <ScrollView bottom="25px">

            <SelectMetricsStep data={results.viewData} reportConfig={reportConfig} onSelect={toggleMetric} />
            <div className={styles.category_title} style={{margin:"1rem 0 .5rem 0",color:"rgb(255, 255, 255)",fontSize:"1rem"}}>Report Name (Optional)</div>
            <TextField placeholder="e.g. Weekly Sales Analysis" />
            <ReportSummary step={step} reportConfig={reportConfig} />
              <FlexRow m='1.25rem 0 .5rem 0'>
                <PrimaryButton size='lg' onClick={generateReport}>Generate</PrimaryButton>
              </FlexRow>
          </ScrollView>
        </Show>
        
        <FlexRow p="1rem 0" g='1rem'>
          <Show when={step === 1}>
            <PrimaryButton size='md' action="generate" onClick={() => close()}>Close</PrimaryButton>
          </Show>
          <Show when={step === 2}>
            <SecondaryButton size='md' action="generate" onClick={stepBack}>Back</SecondaryButton>
            <PrimaryButton size='md' action="generate" onClick={nextStep}>Metrics</PrimaryButton>
          </Show>
          <Show when={step === 3}>
            <PrimaryButton size='md' action="generate" onClick={stepBack}>Back</PrimaryButton>
            <SecondaryButton size='md' action="generate" onClick={() => close()}>Cancel</SecondaryButton>
          </Show>
        </FlexRow>

       </FlexColumn>

    </View>
  );
}

export default ReportBuilder;