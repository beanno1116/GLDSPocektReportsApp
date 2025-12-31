
import { Children } from 'react';
import styles from './sections.module.css';
import Card from '../Cards/Card';


const CategorySectionItem = ({name,subtitle,value,delta="",...props}) => {
  return (
    <div className={styles.category_item}>
      <div className={styles.category_info}>
          <div className={styles.category_name}>{name}</div>
          <div className={styles.category_subtitle}>{subtitle}</div>
      </div>
      <div className={styles.category_metric}>
          <div className={styles.category_value}>${value}</div>
          <div className={`${styles.category_change} ${delta < 0 ? styles.down : styles.up}`}>{delta < 0 ? `↓ ${delta}` : `↑ ${delta}`}</div>
      </div>
    </div>
  )
}


const TopCategorySection = ({ title,children }) => {
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
    <div className={styles.category_section}>
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