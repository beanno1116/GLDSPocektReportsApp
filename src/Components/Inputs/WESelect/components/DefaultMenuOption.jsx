import styles from '../weSelect.module.css';




/**
 * 
 * @param {Object} option 
 * @param {Function} isSelected 
 * @param {Function} onClick 
 * @returns component that is a menu option
 */
const DefaultMenuOption = ({ value, name, isSelected, onClick }) => {

  const handleOnClickEvent = (e) => {
    let name = e.target.getAttribute('name');
    onClick && onClick({ target: { value: name } });
  }

  return (
    <div name={name} value={value} className={`${styles.select_item} ${isSelected && styles.selected}`} onClick={(e) => handleOnClickEvent(e)}>
      {value}
    </div>
  );
}

export default DefaultMenuOption;