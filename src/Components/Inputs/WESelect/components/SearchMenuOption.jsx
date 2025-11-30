import { useEffect, useRef } from 'react';

import styles from '../weSelect.module.css';
import SearchIcon from './icons/SearchIcon';


/**
 * 
 * @param {Function} onChange 
 * @param {String} value 
 * @param {String} placeholder 
 * @returns component that contains a search box for searching menu items options
 */
const SearchMenuOption = ({ onChange, value, placeholder, shouldShow }) => {

  useEffect(() => {

    inputRef.current.focus();

  }, [shouldShow])

  const inputRef = useRef(null)

  return (
    <div className={styles.search_box}>
      <input type="search" name="searchTxt" ref={inputRef} onChange={onChange} value={value} /*ref={searchRef}*/ placeholder={placeholder} spellCheck={false} />
      <div className={styles.search_box_icon}>
        <SearchIcon width={20} height={20} />
      </div>
    </div>
  );
}

export default SearchMenuOption;