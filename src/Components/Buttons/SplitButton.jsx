
import { useEffect, useRef, useState } from 'react';
import styles from './button.module.css';

const SplitButton = ({ label, icon, onPrimaryClick, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const labelRef = useRef(label);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const onItemButtonClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    labelRef.current = e.currentTarget.dataset.action;
    setIsOpen(false);
  }

  return (
    <div className={styles.split_button} ref={dropdownRef}>
      <div className={styles.split_button_group}>
        <button className={styles.split_button_main} onClick={onPrimaryClick}>
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
              <button key={index} data-action={item} className={styles.split_button_menu_item} onClick={onItemButtonClick}>
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