
import { useEffect, useRef, useState } from 'react';
import styles from './button.module.css';
import useClickOutside from '../../hooks/useClickOutside';

const SplitButton = ({ label, icon, onButtonClick,onSelection,mode="button", items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const labelRef = useRef(label);
  useClickOutside(dropdownRef,() => setIsOpen(false));

  const onPrimaryButtonClick = (e) => {
    e.stopPropagation();
    if (mode === "select"){
      setIsOpen(!isOpen);
      return;
    }
    onButtonClick && onButtonClick(e,labelRef.current);
  }

  const onItemSelectClick = (e,action) => {
    e.stopPropagation();
    labelRef.current = action
    setIsOpen(false);
    onSelection && onSelection(e,action);
  }



  return (
    <div className={styles.split_button} ref={dropdownRef}>
      <div className={styles.split_button_group}>
        <button className={styles.split_button_main} onClick={onPrimaryButtonClick}>
          {icon && <span className={styles.button_icon}>{icon}</span>}
          <span>{labelRef.current}</span>
        </button>
        <button className={styles.split_button_toggle} onClick={() => setIsOpen(!isOpen)}>
          <span className={`${styles.chevron} ${isOpen ? styles.open : ""}`}>▼</span>
        </button>
      </div>
      
      {isOpen && (
        <div className={styles.split_button_menu}>
          {items.map((item, index) => (
            item.divider ? (
              <div key={index} className={styles.divider} />
            ) : (
              <button key={index} data-action={item} className={styles.split_button_menu_item} onClick={(e) => onItemSelectClick(e,item)}>
                {/* {item.icon && <span style={styles.menuItemIcon}>{item.icon}</span>} */}
                <span>{item}</span>
              </button>
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default SplitButton;