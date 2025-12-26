

import styles from '../weAccordion.module.css';
import ChevronIcon from './icons/ChevronIcon';

const Header = ({ showIcon="true",children }) => {
  return (
    <span className={styles.accordion_header}>
      <button className={styles.trigger} aria-expanded="false">
        {children}
      </button>
      {showIcon && <span className={styles.header_icon}><ChevronIcon width={48} height={48} /></span>}
    </span>
  )
}

const Content = ({ children }) => {
  return (
    <div className={styles.content} role="region" aria-hidden='true'>
      <div>
        {children}
      </div>
    </div>
  )
}

const AccordionPanel = ({ children }) => {
  return (
    <div className={styles.panel}>
      {children}
    </div>
  );
}

AccordionPanel.Header = Header;
AccordionPanel.Content = Content;

export default AccordionPanel;