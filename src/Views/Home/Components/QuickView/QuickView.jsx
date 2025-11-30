
import { useRef, useState } from 'react';
import ThisWeekVsLast from './Components/ThisWeekVsLast/ThisWeekVsLast';
import TopSubDepartments from './Components/TopSubDepartments/TopSubDepartments';
import styles from './quickView.module.css';
import AverageBasketDetails from './Components/AverageBasketDetails/AverageBasketDetails';
import FraudDetails from './Components/FraudDetails/FraudDetails';
import { useQuery } from '@tanstack/react-query';
import { useApiClient } from '../../../../Api/Api';
import { useAuth } from '../../../../hooks/useAuth';

const pages = [
  <ThisWeekVsLast title={"This Week vs Last Week"} />,
  <TopSubDepartments title={"Top Sub Departments"}/>,
  <AverageBasketDetails title={"Avg Basket Details"} />,
  <FraudDetails title={"Fraud Watch"} />
]


const QuickView = ({ ...props }) => {
  const api = useApiClient();
  const auth = useAuth();

  const [currentPage,setCurrentPage] = useState(0);


  const touchCoordsRef = useRef({
    startX: 0,
    startY: 0,
  })

  let pageDotsRefs = [];


  const pageDotRefCallback = (ele) => {
    if (ele) {
      pageDotsRefs = [...pageDotsRefs,ele];
    }    
  }

  const onPageDotClick = (e) => {    
    const span = e.target.closest("span");
    if (!span) return;
    pageDotsRefs.forEach(pageDot => {
      pageDot.classList.remove(styles.active);
    })
    span.classList.add(styles.active);
    const page = parseInt(span.dataset.page);
    setCurrentPage(page);
  }

  const onTouchStartEvent = (e) => {

    touchCoordsRef.current.startX = e.touches[0].clientX;
  }

  const onTouchEndEvent = (e) => {    

    const endX = e.changedTouches[0].clientX;
    const distanceTraveledX = touchCoordsRef.current.startX - endX;
    const minSwipeDistance = 50;

    if (distanceTraveledX > minSwipeDistance){
      console.log("Swiped Left");
      if (currentPage === 0) return;
      pageDotsRefs.forEach(pageDot => {
        pageDot.classList.remove(styles.active);
      })
      pageDotsRefs[currentPage - 1].classList.add(styles.active);
      setCurrentPage(old => old - 1);
    } else if (distanceTraveledX < -minSwipeDistance){
      console.log("Swiped Right")
      if (currentPage === pageDotsRefs.length -1) return;
      pageDotsRefs.forEach(pageDot => {
        pageDot.classList.remove(styles.active);
      })
      pageDotsRefs[currentPage + 1].classList.add(styles.active);
      setCurrentPage(old => old + 1);
    }
  }

  return (
    <div className={styles.quick_view} onTouchStart={onTouchStartEvent} onTouchEnd={onTouchEndEvent}>

      {pages[currentPage]}

       <div style={{display:"flex",gap:".5rem"}} onClick={onPageDotClick}>
        {pages.map((_,index) => {
          if (index === 0){
            return (
              <span key={index} ref={pageDotRefCallback} data-page={index} className={`${styles.page_dot} ${styles.active}`}></span>
            )
          }
          return (
            <span key={index} ref={pageDotRefCallback} data-page={index} className={styles.page_dot}></span>
          )
        })}
      </div>
    </div>
  );
}

export default QuickView;