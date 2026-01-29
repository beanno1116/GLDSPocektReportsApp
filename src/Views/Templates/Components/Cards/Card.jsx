

import styles from './cards.module.css';
import CardAccessCodeLabel from './Components/CardAccessCodeLabel';
import CardListItem from './Components/CardListItem';
import CompactLabel from './Components/CompactLabel';
import CompactValue from './Components/CompactValue';

const Label = ({text,size="md"}) => {
  return (
    <span className={`${styles.label} ${styles[size]}`}>{text}</span>
  )
}

const Card = ({ full=false,m="0 0 1.5rem 0",width="100%",children  }) => {
  return (
    <div className={`${styles.card} ${full ? styles.card_full : ""}` } style={{margin:m,width}}>
      {children}
    </div>
  );
}

Card.Label = Label;
Card.CompactLabel = CompactLabel;
Card.CompactValue = CompactValue;
Card.ListItem = CardListItem;
Card.CodeLabel = CardAccessCodeLabel;

export default Card;