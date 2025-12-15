
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

const Card = ({children,flex="unset" }) => {


  return (
  <div className={styles.card} style={{flex:flex}}>
    {children}
  </div>
  );
}

Card.Title = Title;
Card.Content = Body;
Card.FlexContent = FlexBody;
Card.Table = CardTable;

export default Card;