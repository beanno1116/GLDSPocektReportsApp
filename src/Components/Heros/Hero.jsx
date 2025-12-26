
import styles from './heros.module.css';

const Title = ({children}) => {
  return (
    <div className={styles.detail_panel_heading}>{children}</div>
  )
}

const ValueLabel = ({children}) => {
  return (
    <div className={styles.detail_panel_value_label}>{children}</div>
  )
}

const FlexContent = ({children}) => {
  return (
    <div className={styles.hero_flex_content}>
      {children}
    </div>
  )
}

const customizableStyles = {
  unset: "unset",
  square: "1 / 1",
  between: "space-between",
  evenly: "space-evenly"
}

const Hero = ({ display="block",direction="column",spacing="evenly",flex="1",gap="1rem",aspectRatio="unset",theme="",children }) => {

  const calculateStyles = () => {
    const styleObj = {
      display,
      flex,
      aspectRatio: customizableStyles[aspectRatio]
    }
    if (display === "flex"){
      styleObj.flexDirection = direction;
      styleObj.justifyContent = customizableStyles[spacing];
      styleObj.gap = gap;
    }
    return styleObj;
  }

  return (
  <div className={`${styles.detail_panel} ${theme === "" ? "" : styles[theme]}`} style={{...calculateStyles()}}>
    {children}
  </div>
  );
}

Hero.Title = Title;
Hero.Value = ValueLabel;
Hero.FlexContent = FlexContent;

export default Hero;