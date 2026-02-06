
import FlexRow from '../../../../Components/FlexComponents/FlexRow';
import DateUtility from '../../../../Utils/DateUtils';
import Format from '../../../../Utils/Format';
import styles from '../storeReportsView.module.css';

const DateRangeLabel = ({ start,end,flex=true }) => {

  const renderDateRangeSpans = () => {
    if (DateUtility.isEqual(start,end)){
      return (
        <span className={styles.dateRangeLabel}>{Format.asLongDate(start)}</span>
      )
    }
    return (
      <>
        <span className={styles.dateRangeLabel}>{Format.asLongDate(start)}</span>
        <span className={styles.dateRangeLableSeperator}> - </span>
        <span className={styles.dateRangeLabel}>{Format.asLongDate(end)}</span>
      </>
    )
  }

  if (flex === false){
    return (
      <div className={styles.dateRangeLabelWrapper}>
        {renderDateRangeSpans()}
      </div>
    )
  }
  return (
    <FlexRow hAlign='center' m='1rem 0 0 0'>
      <div className={styles.dateRangeLabelWrapper}>
        {renderDateRangeSpans()}
      </div>
    </FlexRow>
  );
}

export default DateRangeLabel;