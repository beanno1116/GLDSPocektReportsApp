
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



const useReportBuilder = () => {
  const {dateRanges,setDateRanges} = useGlobalDate();
  const [step,setStep] = useState(1);
  const [reportConfig, setReportConfig] = useState({
    reportType: null,
    dateType: null,
    startDate: '',
    endDate: '',
    compareStartDate: '',
    compareEndDate: '',
    selectedMetrics: [],
    reportName: ''
  });

  const onReportDateChange = (dates) => {

    if (dates.length === 2){
      const dateRanges = {
        base: {
          startDate: dates[0],
          endDate: dates[1]
        },
        current: {
          startDate: dates[0],
          endDate: dates[1]
        }
      }
      setDateRanges(dateRanges);
      return;
    }
    if (dates.length > 2 && dates.length <= 7){
      const dateRanges = {
        base: {
          startDate: DateUtility.setWeekBack(dates[0],1),
          endDate: DateUtility.setWeekBack(dates[dates.length - 1],1)
        },
        current: {
          startDate: dates[0],
          endDate: dates[dates.length - 1]
        }
      }
      setDateRanges(dateRanges);
      return;
    }
    const dateRanges = {
      base: {
        startDate: DateUtility.setDateBack(dates[0],1),
        endDate: DateUtility.setDateBack(dates[0],1)
      },
      current: {
        startDate: dates[0],
        endDate: dates[0]
      }
    }
    setDateRanges(dateRanges);
  }

  const onReportTypeSelect = (reportType) => {
    setReportConfig({ ...reportConfig, reportType: reportType });
    setStep(2);
  }

  const handleDateSelection = (dates) => {
    setReportConfig({ ...reportConfig, ...dates });
    if (reportConfig.reportType === "range" || reportConfig.reportType === "comparison"){
      return;
    }
    setStep(3);
  }

  const toggleMetric = (metricId) => {
    setReportConfig(prev => ({
      ...prev,
      selectedMetrics: prev.selectedMetrics.includes(metricId)
        ? prev.selectedMetrics.filter(id => id !== metricId)
        : [...prev.selectedMetrics, metricId]
    }));
  }


  const selectPopularMetrics = () => {}

  const stepBack = () => {
    setStep(step - 1);
  }
  const nextStep = () => {
    setStep(step + 1);
  }
  
  return {
    step,
    reportConfig,
    stepBack,
    nextStep,
    setReportConfig,
    handleDateSelection,
    onReportTypeSelect,
    onReportDateChange,
    selectPopularMetrics,
    toggleMetric
  }
}

const ReportBuilder = ({ close }) => {
  const {onReportDateChange,onReportTypeSelect,step,stepBack,nextStep,setReportConfig,handleDateSelection,selectPopularMetrics,toggleMetric,reportConfig} = useReportBuilder();
  return (
    <View solid={true}>

       <ViewHeading showDatePicker={false} title={"Sales Report Builder"} onClick={onReportDateChange} />

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

        <Show when={step === 3}>
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

            <SelectMetricsStep reportConfig={reportConfig} onSelect={toggleMetric} />
            <div className={styles.category_title} style={{margin:"1rem 0 .5rem 0",color:"rgb(255, 255, 255)",fontSize:"1rem"}}>Report Name (Optional)</div>
            <TextField placeholder="e.g. Weekly Sales Analysis" />
            <ReportSummary step={step} reportConfig={reportConfig} />
              <FlexRow m='1.25rem 0 .5rem 0'>
                <PrimaryButton size='lg'>Generate</PrimaryButton>
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