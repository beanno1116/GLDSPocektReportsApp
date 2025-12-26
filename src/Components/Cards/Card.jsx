
import styles from './cards.module.css';
import CardTable from './Components/CardTable';
import Title from './Components/Title';

const FlexBody = ({children,flex="unset",direction="column"}) => {
  return (
    <div className={`${styles.body} ${styles.flex_body}`} style={{flex:flex,flexDirection:direction}}>
      {children}
    </div>
  )
}

const Body = ({flex="unset",children}) => {
  return (
    <div className={styles.body} style={{flex}}>
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


const Card = ({children,flex="unset" }) => {
  const calculateStyles = () => {
    const styleObj = {
      flex,
    }
    
    return styleObj;
  }

  return (
  <div className={styles.card} style={{...calculateStyles()}}>
    {children}
  </div>
  );
}

Card.Title = Title;
Card.Content = Body;
Card.FlexContent = FlexBody;
Card.Table = CardTable;

export default Card;