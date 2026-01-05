import { useCallback, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';


import styles from './weModal.module.css';


import WEPortal from './WEPortal';
import CloseButton from './components/buttons/CloseButton';
import OutlineButton from '../Inputs/OutlineButton';
import Button from '../Inputs/Button';


const defaultConfig = {
  portalWrapperId: "confirm_modal_portal",
  transition: {
    timeout: {entry:0,exit:500},
    unmountOnExit: true,
    classNames: "we-modal__container-scale-in-left"
  },
  showCloseButton: true

}

const WEConfirmModal = ({ children, isOpen, toggle,config, ...props }) => {
  

  const modalConfig = {...defaultConfig,...config};

  const modalRef = useRef(null);

  const onKeyDownEvent = useCallback((e) => {
    e.key === "Escape" ? toggle() : ()=>{};
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

          

        <div className={styles.panel}>
        <div className={styles.heading}><Heading.H1 gradient={true} style={{fontSize:"3.5rem"}} content={"Confirm Changes"} /></div>
        <p className={styles.message}>{message}</p>
        <div className={styles.buttons}>
          <Button style={{flex:"1"}} onClick={onConfirm}>Confirm</Button>          
          <OutlineButton style={{flex:"1"}} level="danger" onClick={onCancel}>
            Cancel
          </OutlineButton>
        </div>
      </div>

        </div>

      </CSSTransition>

    </WEPortal>
  );
}



export default WEConfirmModal;