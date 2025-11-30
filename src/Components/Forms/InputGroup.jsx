
import styles from './form.module.css';

const InputGroup = ({ flex,p,m,g,vAlign,hAlign,height,width,children }) => {

  const componentStyles = () => {    
    return {
      flex: flex || "unset",
      padding: p || 0,
      margin: m || 0,
      gap: g || 0,
      alignItems: vAlign || "unset",
      justifyContent: hAlign || "unset",
      height: height || "auto",
      width: width || "100%"
    }
  }

  return (
    <div className={styles.input_group} style={{...componentStyles()}}>
       {children}
    </div>
  );
}

export default InputGroup;