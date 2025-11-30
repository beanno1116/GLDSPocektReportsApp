import React from 'react';

import ChevronIcon from './icons/ChevronIcon';

import styles from '../weSelect.module.css';




const SelectButton = ({ active }) => {
  return (
    <button data-select="button" className={`${styles.select_btn} ${active ? styles.active : ""}`}>
      <ChevronIcon width='20' height='20' />
    </button>
  );
}

export default SelectButton;