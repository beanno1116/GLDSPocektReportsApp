
import { useState } from 'react';
import styles from './tabView.module.css';

const TabView = ({ tabs=[],defaultTab=0,getTab,renderTabView }) => {
  const [currentIndex,setCurrentIndex] = useState(tabs[defaultTab]);

  const onTabClick = (e,tab) => {
    let temp = tab;
    setCurrentIndex(tab);
    
  }


  return (
    <div className={styles.tab_card}>

       <div className={styles.tab_card_nav}>
        {tabs.map((tab,index) => {
          
          if (tab === currentIndex){
            return (              
              <button 
                key={`${tab}_tab_btn_${index}`} 
                className={`${styles.tab_nav_btn} ${styles.active}`}
                onClick={e => onTabClick(e, tab)}>
                  {getTab(tab)}              
              </button>
            )
          }
          return (
            <button 
              key={`${tab}_tab_btn_${index}`} 
              className={`${styles.tab_nav_btn}`}
              onClick={e => onTabClick(e, tab)}>
                {getTab(tab)}              
            </button>
          )
        })}        
       </div>

       <div className={styles.tab_content}>
            {renderTabView(currentIndex)}
        
       </div>

    </div>
  );
}

export default TabView;