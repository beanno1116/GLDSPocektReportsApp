import styles from './flexComponents.module.css';

const FlexColumn = ({ children,flex="unset",p="0",m="0",g="0",vAlign="flex-start",hAlign="flex-start",name,height="",width="",...props }) => {

  const componentStyles = () => {    
    return {
      flex: flex,
      padding: p,
      margin: m,
      gap: g,
      alignItems: vAlign,
      justifyContent: hAlign,
      height: height === "" ? "unset" : height,
      width: width === "" ? "unset" : width
    }
  }

  return (
    <div data-name={name} className={`${styles.flex_column}`} style={{...componentStyles()}} {...props}>
       {children}
    </div>
  );
}

export default FlexColumn;