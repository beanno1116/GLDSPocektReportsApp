
import PrimaryButton from '../../../Components/Buttons/PrimaryButton';
import FlexRow from '../../../Components/FlexComponents/FlexRow';
import DateInput from '../../../Components/Inputs/DateInput';
import styles from '../reportBuilder.module.css';


const subtitles = {
  day: "Choose a specific day",
  range: "Choose start and end dates",
  comparison: "Choose two periods to compare",
  weekly: "Last 7 days will be used",
  monthly: "Choose a month",
  quarterly: "Choose a quarter"
}

const Header = ({title,reportConfig}) => {
  return (
    <div className={styles.step_header}>
      <div className={styles.step_title}>{title}</div>
      <div className={styles.step_subtitle}>
        {subtitles[reportConfig.reportType]}
      </div>
    </div>
  )
}


const DateRangeStep = ({ reportConfig,nextStep,onChange,updateReportConfig }) => {


  return (
    <div className={styles.step_content}>


      <div className={styles.date_section} style={{margin:"1.5rem 0 0 0"}}>
        {reportConfig.reportType === 'day' && (
          <DateInput  label="Select Date" value={reportConfig.startDate} onChange={(e) => onChange({ startDate: e.target.value,endDate:e.target.value })} />
        )}

        {reportConfig.reportType === 'range' && (
          <>
            <div className={styles.form_group}>
              <label className={styles.label}>Start Date</label>
              <DateInput value={reportConfig.startDate} onChange={(e) => onChange({ startDate: e.target.value })} />
            </div>
            <div className={styles.form_group} style={{margin:"1rem 0 0 0"}}>
              <label className={styles.label}>End Date</label>
              <DateInput value={reportConfig.endDate} onChange={(e) => onChange({ endDate: e.target.value })} />
            </div>
          </>
        )}

        {reportConfig.reportType === 'comparison' && (
          <>
            <div className={styles.period_section}>
              <div className={styles.period_label}>Period 1</div>
              <div className={styles.form_group}>
                <label className={styles.label}>Start Date</label>
                <DateInput value={reportConfig.startDate} onChange={(e) => onChange({ ...reportConfig, startDate: e.target.value })} />
              </div>
              <div className={styles.form_group}>
                <label className={styles.label}>End Date</label>
                <DateInput value={reportConfig.endDate} onChange={(e) => onChange({ ...reportConfig, endDate: e.target.value })} />
              </div>
            </div>

            <div className={styles.divider}>
              <span className={styles.divider_text}>vs</span>
            </div>

            <div className={styles.period_section}>
              <div className={styles.period_label}>Period 2</div>
              <div className={styles.form_group}>
                <label className={styles.label}>Start Date</label>
                <DateInput value={reportConfig.compareStartDate} onChange={(e) => onChange({ ...reportConfig, compareStartDate: e.target.value })} />
              </div>
              <div className={styles.form_group}>
                <label className={styles.label}>End Date</label>
                <DateInput value={reportConfig.compareEndDate} onChange={(e) => onChange({ ...reportConfig, compareEndDate: e.target.value })} />
              </div>
            </div>
          </>
        )}

        {reportConfig.reportType === 'weekly' && (
          <div className={styles.info_card}>
            <div className={styles.info_icon}>📅</div>
            <div className={styles.info_text}>
              This report will include data from the <strong>last 7 days</strong> ending today.
            </div>
          </div>
        )}

        {reportConfig.reportType === 'monthly' && (
          <div className={styles.form_group}>
            <label className={styles.label}>Select Month</label>
            <input
              type="month"
              className={styles.date_input}
              value={reportConfig.startDate}
              onChange={(e) => onChange({ startDate: e.target.value })}
            />
          </div>
        )}

        {reportConfig.reportType === 'quarterly' && (
          <div className={styles.form_group}>
            <label className={styles.label}>Select Quarter</label>
            <select
              className={styles.select}
              value={reportConfig.startDate}
              onChange={(e) => onChange({ startDate: e.target.value })}
            >
              <option value="">Choose quarter...</option>
              <option value="2024-Q1">Q1 2024 (Jan - Mar)</option>
              <option value="2024-Q2">Q2 2024 (Apr - Jun)</option>
              <option value="2024-Q3">Q3 2024 (Jul - Sep)</option>
              <option value="2024-Q4">Q4 2024 (Oct - Dec)</option>
            </select>
          </div>
        )}

        {/* <FlexRow m='1rem 0 0 0'>
          <PrimaryButton onClick={() => nextStep(3)}>Continue to Metrics</PrimaryButton>
        </FlexRow> */}

        {/* <button
          style={styles.continueBtn}
          onClick={() => setStep(3)}
          disabled={
            (reportConfig.reportType === 'day' && !reportConfig.startDate) ||
            (reportConfig.reportType === 'range' && (!reportConfig.startDate || !reportConfig.endDate)) ||
            (reportConfig.reportType === 'comparison' && (!reportConfig.startDate || !reportConfig.endDate || !reportConfig.compareStartDate || !reportConfig.compareEndDate)) ||
            (reportConfig.reportType === 'monthly' && !reportConfig.startDate) ||
            (reportConfig.reportType === 'quarterly' && !reportConfig.startDate)
          }
        >
          Continue to Metrics
        </button> */}
      </div>
    </div>
  );
}

DateRangeStep.Header = Header;

export default DateRangeStep;