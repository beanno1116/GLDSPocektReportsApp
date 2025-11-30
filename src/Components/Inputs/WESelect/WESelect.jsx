/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef, forwardRef, useCallback } from 'react';



import CloseIcon from './components/icons/CloseIcon';

import SelectButton from './components/SelectButton';
import SelectInput from './components/SelectInput';
import SelectMenu from './components/SelectMenu';
import TagItem from './components/TagItem';

import styles from './weSelect.module.css';
import TagItemManager from './components/TagItemManager';

/**
 * 
 * @param {React.children} children 
 * @returns container component for the select input
 */


const handleMultiSelect = (options, selectedOption) => {
  let retOptions = options.some(o => o.value === selectedOption.value) ?
    options.filter(o => o.value !== selectedOption.value) :
    [...options, selectedOption];
  return retOptions;
}

const WESelect = forwardRef(({ name, value, onChange, options, isMulti, editable = false,disabled = false, placeholder, ...props }, ref) => {
  const [showMenu, setShowMenu] = useState(false);

  const classNames = () => {
    try {
      let classStr = styles.select_input;
      if (disabled){
        classStr = `${classStr} ${styles.disabled}`;
      }
      switch (props?.size) {
        case "sm":
          classStr = `${classStr} ${styles.sm}`;
          break;
        case "lg":
          classStr = `${classStr} ${styles.lg}`;
          break;
      }
      return classStr;
    } catch (error) {
      console.error(`[ERROR] [COMP:WESelect] [FUNC:classNames()] - ${error.message}`);
      return styles.select_input || "";
    }
  }


  const inputRef = useRef();

  const toggleMenu = () => {
    if (disabled) return;
    setShowMenu(!showMenu);
  }


  useEffect(() => {

    const handler = (e) => {
      e.preventDefault();
      if (e.target.localName.toLowerCase() === 'input') {
        return;
      }

      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    window.addEventListener('click', handler);
    return () => {
      window.removeEventListener('click', handler);
    };
  });

  const onTagRemove = useCallback((e, option) => {
    e.stopPropagation();
    let newValue = value.filter(v => v.value !== option.value);
    onChange({ target: { value: [...newValue] } });
  }, [value, onChange]);


  const getDisplay = useCallback(() => {

    if (!value || value.length === 0) {
      if (inputRef.current !== null && inputRef.current !== undefined) {
        
        inputRef.current.style.fontWeight = "400";
        // inputRef.current.style.color = 'rgba(255, 250, 250, 0.233)';        
      }
      return placeholder;
    }

    if (isMulti) {
      return (
        <div className={styles.tags}>
          {/* <TagItemManager> */}
          {value.map((option) => (
            <TagItem key={option.id} value={option.value} onClick={(e) => onTagRemove(e, option)} />
          ))}
          {/* </TagItemManager> */}
        </div>
      );
    }

    if (inputRef.current !== null && inputRef.current !== undefined) {
      inputRef.current.style.fontWeight = "400";    
    }

    return value[0]?.label ? value[0]?.label : placeholder;
  }, [value, isMulti, placeholder, onTagRemove]);




  const onItemClick = useCallback((e, id) => {
    // ;
    let selectedOption = options.filter(x => x.id === id)[0];
    let valueCopy = [...value];
    let newValue = [];

    if (isMulti) {
      newValue = handleMultiSelect(valueCopy, selectedOption);
    } else {
      let isSelected = valueCopy.some(v => v.value === selectedOption.value);
      newValue = isSelected ? [] : [selectedOption];
    }
    onChange({ target: { value: [...newValue] } });
    !isMulti && setShowMenu(false);
    getDisplay();
  }, [getDisplay, isMulti, value, onChange, options]);
  
  const onUpdate = (e) => {

    console.log(e);
  }
  
  const isSelected = useCallback((option) => {

    if (isMulti) {
      return value.filter((o) => o.value === option.value).length > 0;
    }
    if (!value) {
      return false;
    }
    return value[0]?.value === option.value;
  }, [isMulti, value]);

  return (
    <div data-input="select" ref={inputRef} className={styles.container} style={props.style}>
      
      <div ref={ref} tabIndex='0' className={classNames()} onClick={toggleMenu}>
        <SelectInput disabled={disabled} value={getDisplay()} placeholder={placeholder}/>
        <SelectButton disabled={disabled} active={showMenu} />        
      </div>

      {
        showMenu && !disabled && (          
          <SelectMenu isSearchable={props.isSearchable} options={options} onUpdate={onUpdate} onClick={onItemClick} isSelected={isSelected} isEditable={false} />
        )
      }

    </div >
  );
})

export default WESelect;


