
import styles from '../reportBuilder.module.css';

  const reportTypes = [
    {
      id: 'day',
      title: 'Day Report',
      description: 'Single day performance snapshot',
      icon: '📅',
      color: '#00ff88'
    },
    {
      id: 'range',
      title: 'Date Range Report',
      description: 'Performance over a custom period',
      icon: '📊',
      color: '#00d4ff'
    },
    {
      id: 'comparison',
      title: 'Date Comparison',
      description: 'Compare two time periods',
      icon: '⚖️',
      color: '#a855f7'
    },
    {
      id: 'weekly',
      title: 'Weekly Report',
      description: 'Last 7 days performance',
      icon: '📈',
      color: '#ffd700'
    },
    {
      id: 'monthly',
      title: 'Monthly Report',
      description: 'Full month analysis',
      icon: '📆',
      color: '#ff6b35'
    },
    {
      id: 'quarterly',
      title: 'Quarterly Report',
      description: 'Quarter-over-quarter insights',
      icon: '📋',
      color: '#ff00ff'
    }
  ];


const ReportSummary = ({ step,reportConfig}) => {
  return (
    <>
      {step > 1 && (
            <div className={styles.summary_card}>
              <div className={styles.summary_title}>Report Summary</div>
              <div className={styles.summary_items}>
                <div className={styles.summary_item}>
                  <span className={styles.summary_label}>Type:</span>
                  <span className={styles.summary_value}>
                    {reportTypes.find(t => t.id === reportConfig.reportType)?.title || 'Not selected'}
                  </span>
                </div>
                {reportConfig.startDate && (
                  <div className={styles.summary_item}>
                    <span className={styles.summary_label}>Date:</span>
                    <span className={styles.summary_value}>
                      {reportConfig.reportType === 'comparison' 
                        ? `${reportConfig.startDate} to ${reportConfig.endDate} vs ${reportConfig.compareStartDate} to ${reportConfig.compareEndDate}`
                        : reportConfig.reportType === 'range'
                        ? `${reportConfig.startDate} to ${reportConfig.endDate}`
                        : reportConfig.startDate
                      }
                    </span>
                  </div>
                )}
                {step === 3 && (
                  <div className={styles.summary_item}>
                    <span className={styles.summary_label}>Metrics:</span>
                    <span className={styles.summary_value}>
                      {reportConfig.selectedMetrics.length} selected
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
    </>
  );
}

export default ReportSummary;