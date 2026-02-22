
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

const Header = ({title,subtitle}) => {
  return (
    <div className={styles.step_header} style={{margin:".5rem 0 0 0"}}>
      <div className={styles.step_title}>{title}</div>
      <div className={styles.step_subtitle} style={{margin:"0 0 .5rem 0"}}>{subtitle}</div>
    </div>
  )
}

const TypeButton = ({type,onClick,reportConfig}) => {
  const handleReportTypeSelect = (reportType) => {
    onClick && onClick(reportType);
  } 
  return (
    <button key={type.id} className={`${styles.report_type_card} ${reportConfig.reportType === type.id && styles.report_type_card_selected}`} onClick={() => handleReportTypeSelect(type.id)}>
      <div className={`${styles.report_type_icon}`} style={{background: `linear-gradient(135deg, ${type.color}33, ${type.color}22)`}}>
        <span style={{ fontSize: '32px' }}>{type.icon}</span>
      </div>
      <div className={styles.report_type_title}>{type.title}</div>
      <div className={styles.report_type_description}>{type.description}</div>
    </button>
  )
}

const ReportTypeStep = ({ onReportTypeSelect,reportConfig }) => {
  return (
    <div className={styles.step_content}>
      <div className={styles.report_types_grid} style={{margin:"2.5rem 0 0 0"}}>
        {reportTypes.map((type) => (
          <TypeButton key={type.id} type={type} onClick={onReportTypeSelect} reportConfig={reportConfig} />
        ))}
      </div>
    </div>
  );
}

ReportTypeStep.Header = Header;

export default ReportTypeStep;



// style={{
//         ...styles.reportTypeCard,
//         ...(reportConfig.reportType === type.id && styles.reportTypeCardSelected)
//       }}