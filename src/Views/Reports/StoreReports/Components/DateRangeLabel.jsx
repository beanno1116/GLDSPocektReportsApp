
import DateUtility from '../../../../Utils/DateUtils';
import Format from '../../../../Utils/Format';
import styles from '../storeReportsView.module.css';

const DateRangeLabel = ({ start,end,flex=true,m="0",p="0" }) => {

  const renderDateRangeSpans = (sd,ed) => {
    if (DateUtility.isEqual(sd,ed)){
      return (
        <span className={styles.dateRangeLabel}>{Format.asLongDate(sd)}</span>
      )
    }
    return (
      <>
        <span className={styles.dateRangeLabel}>{Format.asLongDate(sd)}</span>
        <span className={styles.dateRangeLableSeperator}> - </span>
        <span className={styles.dateRangeLabel}>{Format.asLongDate(ed)}</span>
      </>
    )
  }

  if (flex === false){
    return (
      <div className={styles.dateRangeLabelWrapper}>
        {renderDateRangeSpans(start,end)}
      </div>
    )
  }
  return (
      <div className={styles.dateRangeLabelWrapper} style={{margin:m,padding:p}}>
        {renderDateRangeSpans(start,end)}
      </div>
  );
}

export default DateRangeLabel;