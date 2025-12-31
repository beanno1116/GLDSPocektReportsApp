import { CSSTransition } from "react-transition-group";
// import WEPortal from "../WEModal/WEPortal";
import {  useEffect, useRef, useState } from "react";

import styles from './loader.module.css';

import { publish, subscribe, unsubscribe } from "../../events";
import WEPortal from "./WEPortal";
import pocketReportLog from '../../assets/images/pocketReportLogo.png';



const defaultConfig = {
  portalWrapperId: "loader_portal",
  transition: {
    timeout: {entry:0,exit:500},
    unmountOnExit: true,
    classNames: "we-modal__container-scale-in-left"
  },
  showCloseButton: true

}


const loader = {
  loading(){
    publish('startloading')
  },
  loaded(){
    publish('endloading');
  }
}



const LoaderModal = ({  config }) => {
  const [showLoading,setShowLoading] = useState(false);
  

  const modalConfig = {...defaultConfig,...config};

  const modalRef = useRef(null);

  


  useEffect(() => {

    const startLoader = (e) => {
      setShowLoading(true);
    }
    const stopLoader = (e) => {
      setShowLoading(false);
    }

    subscribe('startloading',startLoader);
    subscribe('endloading',stopLoader);
    return () => {
      unsubscribe('startloading',startLoader)
      unsubscribe('endloading',stopLoader)
    }
  })

  


  return (
    <WEPortal portalWrapperId={modalConfig.portalWrapperId}>   
      <CSSTransition
        nodeRef={modalRef}
        in={showLoading}
        timeout={{ entry: 5000, exit: 5000 }}
        // mountOnEnter
        unmountOnExit
        classNames={{
          enter: styles.myEnter,
          enterActive: styles.myEnterActive,
          enterDone: styles.myEnterDone,
          exit: styles.myExit,
          exitActive: styles.myExitActive,
          exitDone: styles.myExitDone
        }}
      >
        <div className={styles.loader} ref={modalRef}>
              {/* <div id={styles.loader}></div> */}
            <div className={styles.loading_screen} id="fullScreenLoading">
              <div className={styles.loading_logo}><img src={pocketReportLog} style={{width:"100%",aspectRatio:"1/1",opacity:".8"}}/></div>
              <div className={styles.spinner_dual}></div>
              <div className={styles.loading_text}>Loading Store Data</div>
              <div className={styles.loading_percentage}>Please wait...</div>
          </div>

        </div>

        {/* <div className={`${styles.modal_container} ${styles.scale_in} ${styles.center}`} style={{...props.style}} ref={modalRef}>  

          

        </div> */}

      </CSSTransition>

    </WEPortal>
  );
}

export { LoaderModal, loader };