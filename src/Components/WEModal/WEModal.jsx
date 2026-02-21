import { useCallback, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';


import styles from './weModal.module.css';


import WEPortal from './WEPortal';
import CloseButton from './components/buttons/CloseButton';


const defaultConfig = {
  portalWrapperId: "modal_portal",
  transition: {
    timeout: {entry:0,exit:500},
    unmountOnExit: true,
    classNames: "we-modal__container-scale-in-left"
  },
  showCloseButton: true

}

const WEModal = ({ children, isOpen, toggle,config, ...props }) => {
  

  const modalConfig = {...defaultConfig,...config};

  const modalRef = useRef(null);

  const onKeyDownEvent = useCallback((e) => {
    // e.key === "Escape" ? toggle() : ()=>{};
  },[toggle])

  const onClose = useCallback((e) => {
    toggle();
  },[toggle])



  useEffect(() => {
    document.addEventListener("closemodal",onClose);
    document.addEventListener("keydown", onKeyDownEvent);
    return () => {
      document.removeEventListener("keydown", onKeyDownEvent);
      document.addEventListener("closemodal",onClose)
    }
  });


  return (
    <WEPortal portalWrapperId={modalConfig.portalWrapperId}>   
      <CSSTransition
        nodeRef={modalRef}
        in={isOpen}
        timeout={{ entry: 0, exit: 500 }}
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

        <div className={`${styles.modal_container} ${styles.scale_in} ${styles.center}`} style={{...props.style}} ref={modalRef}>  

          {modalConfig.showCloseButton && <CloseButton className={`${styles.close_btn}`} onClick={(e) => toggle()} width={50} height={50} />}

          <div className={`${styles.content}`}>{children}</div>

        </div>

      </CSSTransition>

    </WEPortal>
  );
}



export default WEModal;