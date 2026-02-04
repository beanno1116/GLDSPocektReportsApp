
import SplitButton from '../../../../Components/Buttons/SplitButton';
import FlexRow from '../../../../Components/FlexComponents/FlexRow';
import Card from './Card';
import styles from './cards.module.css';

const Heading = ({text,items=[]}) => {
  return (
    <FlexRow hAlign="space-between" vAlign="center" p="0 0 1.5rem .5rem">
      <FlexRow flex="1">
        <h2>{text}</h2>
      </FlexRow>
      <FlexRow flex="1" hAlign="flex-end">
        {items.length > 0 && <SplitButton label="Sales" items={["Sales","Items","Transactions","Basket"]} mode="select" /> }
      </FlexRow>
    </FlexRow>
  )
}


const TrendCard = ({ full=false,m="0 0 1.5rem 0",children }) => {
  return (
    <div className={`${styles.trend_card} ${full ? styles.card_full : ""}` } style={{margin:m}}>
      {children}
    </div>
  );
}

TrendCard.Header = Heading;

export default TrendCard;