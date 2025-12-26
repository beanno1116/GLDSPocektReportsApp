
import styles from './button.module.css';
import siteStyles from '../../site.module.css';

const TileButton = ({ action,circle=false,children,onClick,...props }) => {

  const onButtonClick = (e) => {
    onClick && onClick(e);
  }

  return (
    <button data-action={action} className={`${styles.tile_button} ${circle ? styles.round_button : ""}`} onClick={onButtonClick}>
       {children}
    </button>
  );
}

export default TileButton;