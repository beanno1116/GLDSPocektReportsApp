
import { useRef } from 'react';
import styles from '../quickView.module.css';

const PageDot = ({ page,active,onClick }) => {

  const pageDotElementRef = useRef();

  const pageDotRefCallback = (ele) => {
    if (ele){
      pageDotElementRef.current = ele;
    }
  }

  const handleDotClick = (e) => {
    const span = e.target.closest("span");
    if (!span) return;
    const pageAsInt = parseInt(span.dataset.page);
    onClick && onClick(span,pageAsInt);
  }

  return (
    <span onClick={handleDotClick}  ref={pageDotRefCallback} data-page={page} className={`${styles.page_dot} ${active ? styles.active : ""}`}></span>
  );
}

export default PageDot;