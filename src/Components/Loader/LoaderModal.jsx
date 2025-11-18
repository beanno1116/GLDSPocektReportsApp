import { CSSTransition } from "react-transition-group";
// import WEPortal from "../WEModal/WEPortal";
import {  useEffect, useRef, useState } from "react";

import styles from './loader.module.css';

import { publish, subscribe, unsubscribe } from "../../events";
import WEPortal from "./WEPortal";



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
              <div id={styles.loader}></div>
            </div>

        {/* <div className={`${styles.modal_container} ${styles.scale_in} ${styles.center}`} style={{...props.style}} ref={modalRef}>  

          

        </div> */}

      </CSSTransition>

    </WEPortal>
  );
}

export { LoaderModal, loader };