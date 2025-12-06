import { useRef } from 'react';
import siteStyles from '../../../../site.module.css';
import Heading from '../../../Labels/Heading';
import Loader from '../../../Loader/Loader';
import styles from '../../quickView.module.css';
import { publish } from '../../../../events';

const QVReportTitle = ({text,mode="lite"}) => {
  return (
    <Heading size='sm' mode={mode}>{text}</Heading>
  )
}

const QVReport = ({ status,children }) => {

  const touchCoordsRef = useRef({
    startX: 0,
    startY: 0,
  });

  const onTouchStartEvent = (e) => {
    touchCoordsRef.current.startX = e.touches[0].clientX;
    touchCoordsRef.current.startY = e.touches[0].clientY;
  }

  const onTouchEndEvent = (e) => {
    const endY = e.changedTouches[0].clientY;
    const distanceTraveledY = touchCoordsRef.current.startY - endY;
    const minSwipeDistance = 50;    
    if (distanceTraveledY < -minSwipeDistance){
      console.log("swiped down");
      publish("onqvrefresh",{event:e});
    }

  }

  return (
  <div className={`${siteStyles.panel_bg} ${styles.quick_view_report}`}  onTouchStart={onTouchStartEvent} onTouchEnd={onTouchEndEvent}>
    {status.isLoading && <Loader text="Loading Report..."></Loader>}
    {children}
  </div>
  );
}

QVReport.Title = QVReportTitle;

export default QVReport;