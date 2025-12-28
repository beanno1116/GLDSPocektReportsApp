
import FlexRow from '../../../Components/FlexComponents/FlexRow';
import InputLabel from '../../../Components/Labels/InputLabel';
import styles from './reportView.module.css';

const ReportRow = ({type,group,reports=[],onClick}) => {
  return (
    <div className={styles.report_view_row_tmplate}>

      <FlexRow hAlign='flex-start' p='0 .75rem'>
        <InputLabel text={group} />
      </FlexRow>
      

      <div className={styles.report_button_row}>

        <div style={{position:"absolute",width:"100%",height:"100%",overflowX:"scroll",whiteSpace:" nowrap"}}>

          {reports.map(report => {
            return (
              <div data-type={type} data-group={group} data-title={report.title} data-report={report.report} className={`${styles.report_button}`} onClick={onClick}>
                <InputLabel text={report.title} />
                <div style={{zIndex:"-1",scale:"1.2",opacity:".8",transform:"translate(45%,-20%)"}}>
                  <svg id="sw-js-blob-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">                    <defs>                         <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">                            <stop id="stop1" stopColor="rgba(0, 163, 106, 1)" offset="0%"></stop>                            <stop id="stop2" stopColor="rgba(35, 106, 160, 1)" offset="100%"></stop>                        </linearGradient>                    </defs>                <path fill="url(#sw-gradient)" d="M17.8,-24.5C22.6,-21,25.9,-15.2,28.1,-9C30.4,-2.8,31.6,3.9,29.9,10C28.3,16,23.8,21.3,18.3,26.1C12.9,31,6.4,35.5,-0.4,36C-7.2,36.5,-14.4,33.1,-19.3,28C-24.2,23,-26.8,16.3,-29.9,9.1C-33,2,-36.5,-5.5,-36.4,-13.6C-36.2,-21.7,-32.3,-30.3,-25.6,-33.3C-18.9,-36.3,-9.4,-33.6,-1.5,-31.5C6.5,-29.5,12.9,-28.1,17.8,-24.5Z" width="100%" height="100%" transform="translate(50 50)" strokeWidth="0" style={{transition:"0.3s"}} stroke="url(#sw-gradient)"></path>              </svg>                  
                </div>
              </div>
            )
          })}

        </div>

      </div>
    </div>
  )
}

const ReportView = ({ children }) => {
  return (
    <div className={styles.report_view_template}>
      {children}
    </div>
  );
}

ReportView.SelectionRow = ReportRow;

export default ReportView;