

import styles from '../weAccordion.module.css';
import ChevronIcon from './icons/ChevronIcon';

const Header = ({ children }) => {
  return (
    <span className={styles.accordion_header}>
      <button className={styles.trigger} aria-expanded="false">
        {children}
      </button>
      <span className={styles.header_icon}><ChevronIcon width={48} height={48} /></span>
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
      {/* <Header text={text} />
      <Content>
        {children}
      </Content> */}
    </div>
  );
}

AccordionPanel.Header = Header;
AccordionPanel.Content = Content;

export default AccordionPanel;