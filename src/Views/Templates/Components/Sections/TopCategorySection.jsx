
import { Children } from 'react';
import styles from './sections.module.css';
import Card from '../Cards/Card';
import { del } from 'motion/react-client';


const CategorySectionItem = ({name,subtitle="",value,delta="",...props}) => {

  const deltaComponentClassName = () => {
    if (delta === "") return "";
    if (parseInt(delta.replace('%','')) === 0) return "";
    if (parseInt(delta.replace('%','')) < 0) return styles.down;
    return styles.up;
  }

  const renderDelta = () => {
    if (delta === "") return delta;
    if (parseInt(delta.replace('%','')) === 0) return delta;
    if (parseInt(delta.replace('%','')) < 0) return `↓ ${delta}`;
    return `↑ ${delta}`
  }

  return (
    <div className={styles.category_item}>
      <div className={styles.category_info}>
          <div className={styles.category_name}>{name}</div>
          {subtitle !== "" && <div className={styles.category_subtitle}>{subtitle}</div>}
      </div>
      <div className={styles.category_metric}>
          <div className={styles.category_value}>${value}</div>
          <div className={`${styles.category_change} ${deltaComponentClassName()}`}>{renderDelta()}</div>
      </div>
    </div>
  )
}


const TopCategorySection = ({ title,children,m="0" }) => {
  const count = Children.count(children);
  
  if (count <= 1){
    return (
      <div className={styles.category_section}>
        <div className={styles.section_title}>{title}</div>
        <Card>
          No data found!
        </Card>
        
      </div>
    )
  }
  return (
    <div className={styles.category_section} style={{margin:m}}>
       <div className={styles.section_title}>{title}</div>
       {children}
    </div>
  );
}

TopCategorySection.Item = CategorySectionItem;

export default TopCategorySection;

// name: dept.description.toLowerCase()
// sub: Format.moneyAbbreviation(parseFloat(dept.quantity))
// value: Format.moneyAbbreviation(parseFloat(dept.total))