import { useState, useEffect, useRef } from 'react';
import DefaultMenuOption from './DefaultMenuOption';
import SearchMenuOption from './SearchMenuOption';
import NavMenuOption from './NavMenuOption';
import AddIcon from './icons/AddIcon';

import styles from '../weSelect.module.css'

const getMenuHeight = (_menu) => {
  let kids = _menu.children;
  let height = 0;
  for (let i = 0; i < kids.length; i++) {
    const child = kids[i];
    height = child.getBoundingClientRect().height + height;
  }
  return height;
}
const setMenuHeight = (_menu) => {
  let height = getMenuHeight(_menu);
  _menu.style.height = height + "px";
}


/**
 * 
 * @param {Boolean} isSearchable 
 * @param {Array} options 
 * @param {Function} onItemClick 
 * @param {Function} isSelected 
 * @param {Boolean} editable 
 * @param {React.children} children 
 * @returns 
 */
const SelectMenu = ({ options, onClick, onUpdate, isEditable = false, ...props }) => {
  const [searchValue, setSearchValue] = useState('');
  const [showMenuPanel, setShowMenuPanel] = useState(false);

  const menuRef = useRef();

  useEffect(() => {
    setSearchValue('');
  }, []);

  useEffect(() => {
    if (menuRef.current) {
      setMenuHeight(menuRef.current);
    }
  }, [searchValue])


  const getOptions = () => {    
    if (!searchValue) {
      return options;
    }
    const retOptions = [{ id: 420, value: "default" }, ...options,];

    const optionFilter = (option, index) => {
      if (option.value.toLowerCase() !== "default") {
        return option.label.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0;
      }
    }
    return retOptions.filter(optionFilter);
  };

  const onSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleClick = (e) => {
    console.log(e);
    e.stopPropagation();
    e.preventDefault();
    onUpdate(e);
    if (showMenuPanel) {
      menuRef.current.style.overflow = "auto";
    } else {
      menuRef.current.style.overflow = "hidden";
    }
    setShowMenuPanel(!showMenuPanel);

  }

  return (
    <div ref={menuRef} className={styles.menu}>

      {props.isSearchable && (
        <SearchMenuOption onChange={onSearch} placeholder='Enter search term' shouldShow={props.showing} />
      )}

      {getOptions().map((option) => {
        return (
          <DefaultMenuOption key={option.id} name={option.value} value={option.label} isSelected={props.isSelected(option)} onClick={e => onClick(e, option.id)} />
        )
      }

      )}

      {isEditable && (
        <NavMenuOption>
          <button className={styles.btn_add_item} onClick={handleClick}>
            <AddIcon width='20' height='20' />
          </button>
          {showMenuPanel && (
            <div className={styles.slide_panel}>
              <div className={styles.input_row}>

                <input />

              </div>
            </div>
          )}
        </NavMenuOption>)}
    </div>
  );
}



SelectMenu.DefaultOption = DefaultMenuOption;
SelectMenu.SearchOption = SearchMenuOption;
SelectMenu.NavRow = NavMenuOption;

export default SelectMenu;