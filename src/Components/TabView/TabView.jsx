
import { useState } from 'react';
import styles from './tabView.module.css';

const icons = {
  summary: "🖥️",
  media: "💲",
  top: "🔝"
}


const IconTab = ({icon,active=false,onClick,children}) => {
  return (
    <button className={`${styles.tab_btn_icon} ${active && styles.active}`} onClick={onClick}>
      <span className={styles.btn_icon}>{icons[icon]}</span>
      {children}
    </button>
  )
}

const DefaultTab = ({active=false,icon,onClick,children}) => {
  return (              
    <button className={`${styles.tab_nav_btn} ${active && styles.active}`} onClick={onClick}>
      {children}
    </button>
  )
}

const TabView = ({ tabs=[],defaultTab=0,getTab,renderTabView,tabType="default",height="unset",m="1rem 0", p="0" }) => {
  const [currentIndex,setCurrentIndex] = useState(tabs[defaultTab]);

  const onTabClick = (e,tab) => {
    setCurrentIndex(tab);
    
  }

  const renderTab = (tabType) => {
    switch (tabType) {
      case "icon":
        return IconTab;
      default:
        return DefaultTab;
    }
  }


  return (
    <div className={styles.tab_card} style={{margin:m,padding:p,height:height}}>

       <div className={styles.tab_card_nav}>
        {tabs.map((tab,index) => {
          const Tab = renderTab(tabType,tab);
          
          if (tab === currentIndex){
            return (
              <Tab key={`${tab}_tab_btn_${index}`} icon={tab} active={true} onClick={e => onTabClick(e, tab)}>
                {getTab(tab)}
              </Tab>
            )
          }
          return (
              <Tab key={`${tab}_tab_btn_${index}`} icon={tab} onClick={e => onTabClick(e, tab)}>
                {getTab(tab)}
              </Tab>
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