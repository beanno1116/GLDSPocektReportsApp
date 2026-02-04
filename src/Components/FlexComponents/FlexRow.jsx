import styles from './flexComponents.module.css';

const flexValues = {

}


const FlexRow = ({ children,flex="unset",p="0",m="0",g="0",vAlign="flex-start",hAlign="flex-start",name,height="",wrap=false,width="" }) => {

  const componentStyles = () => {    
    return {
      flex: flex,
      padding: p,
      margin: m,
      gap: g,
      alignItems: vAlign,
      justifyContent: hAlign,
      height: height === "" ? "unset" : height,     
      flexWrap: wrap ? "wrap" : "nowrap" 
    }
  }

  return (
    <div data-name={name} className={`${styles.flex_row}`} style={{...componentStyles()}}>
       {children}
    </div>
  );
}

export default FlexRow;