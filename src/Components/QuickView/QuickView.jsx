
import { useRef, useState } from 'react';
import ThisWeekVsLast from './Components/ThisWeekVsLast/ThisWeekVsLast';
import TopSubDepartments from './Components/TopSubDepartments/TopSubDepartments';
import styles from './quickView.module.css';
import AverageBasketDetails from './Components/AverageBasketDetails/AverageBasketDetails';
import FraudDetails from './Components/FraudDetails/FraudDetails';
import PageDot from './Components/PageDot';



const pages = [
  <ThisWeekVsLast title={"This Week vs Last Week"} />,
  <TopSubDepartments title={"Top Sub Departments"}/>,
  <AverageBasketDetails title={"Avg Basket Details"} />,
  <FraudDetails title={"Fraud Watch"} />
]


const QuickView = ({ views=pages }) => {

  const [currentPage,setCurrentPage] = useState(0);


  const touchCoordsRef = useRef({
    startX: 0,
    startY: 0,
  })

  let currentPageDotRef = useRef();


  const pageDotRefCallback = (ele) => {
    if (ele) {
      pageDotsRefs = [...pageDotsRefs,ele];
    }    
  }

  const onPageDotClick = (dot,pageNumber) => {    
    debugger;
    if (currentPageDotRef.current){
      currentPageDotRef.current.classList.remove(styles.active);
    }
    dot.classList.add(styles.active);
    currentPageDotRef.current = dot;
        
    setCurrentPage(pageNumber);
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

       <div style={{display:"flex",gap:".5rem"}}>
        {views.map((_,index) => {
          if (index === 0){            
            return (
              <PageDot page={index} onClick={onPageDotClick} />
              // <span key={index} ref={pageDotRefCallback} data-page={index} className={`${styles.page_dot} ${styles.active}`}></span>
            )
          }
          return (
            <PageDot page={index} onClick={onPageDotClick} />
            // <span key={index} ref={pageDotRefCallback} data-page={index} className={styles.page_dot}></span>
          )
        })}
      </div>
    </div>
  );
}

export default QuickView;