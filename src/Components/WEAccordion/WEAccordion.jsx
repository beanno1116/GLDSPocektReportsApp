import { useEffect, useRef, useState } from 'react';



import styles from './weAccordion.module.css';
import AccordionPanel from './components/AccordionPanel';




const WEAccordion = ({ children,...props }) => {
 

  const elementRef = useRef(null);
  const currentPanelRef = useRef(null);


  const accordionClickEvent = (e) => {
    let filterItem = e.target.closest(`[data-filter]`);
    if (filterItem){
      return;
    }
    const activePanel = e.target.closest(`.${styles.panel}`);    
    if (!activePanel) return;
    toggleAccordion(activePanel);
  }

  const toggleAccordion = (panelToActivate) => {        
    if (currentPanelRef.current === null) {
      currentPanelRef.current = panelToActivate;
    }

    const activeButton = panelToActivate.querySelector(`button`);
    const oldActiveButton = currentPanelRef.current.querySelector('button');

    const activePanel = panelToActivate.querySelector(`.${styles.content}`);
    const oldActivePanel = currentPanelRef.current.querySelector(`.${styles.content}`);

    const activePanelIsOpened = activeButton.getAttribute("aria-expanded");
    const oldActivePanelIsOpened = oldActiveButton.getAttribute("aria-expanded");
    

    if (activePanelIsOpened === "true") {
      activeButton.setAttribute("aria-expanded", false);
      activePanel.setAttribute("aria-hidden", true);
    } else {
      activeButton.setAttribute("aria-expanded", true);
      activePanel.setAttribute("aria-hidden", false);
    }

    if (currentPanelRef.current == panelToActivate){
     return;
    }

    if (oldActivePanelIsOpened === true){
      oldActiveButton.setAttribute("aria-expanded", true);
      oldActivePanel.setAttribute("aria-hidden", false);
    }else {
      oldActiveButton.setAttribute("aria-expanded", false);
      oldActivePanel.setAttribute("aria-hidden", true);
    }
    currentPanelRef.current = panelToActivate;
  }

  return (
    <div ref={elementRef} className={styles.accordion} onClick={e => accordionClickEvent(e)}>
      {children}
    </div>
  );
}

WEAccordion.Panel = AccordionPanel;


export default WEAccordion;