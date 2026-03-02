
import OutlineButton from '../../../../Components/Buttons/OutlineButton';
import PrimaryButton from '../../../../Components/Buttons/PrimaryButton';
import FlexRow from '../../../../Components/FlexComponents/FlexRow';
import DragableListItem from '../../../../Components/Lists/Components/DragableListItem';
import ScrollView from '../../../../Components/ScrollView/ScrollView';
import Format from '../../../../Utils/Format';
import styles from './cards.module.css';

  const getStatusColor = (status) => {
    switch (status) {
      case 'over':
        return '#00ff88';
      case 'short':
        return '#ff6b35';
      case 'balanced':
        return '#00d4ff';
      default:
        return '#8b9cc5';
    }
  };

const Header = ({name,type}) => {
  return (
    <div className={styles.card_header}>
      <div className={styles.card_title}>{name}</div>
      <div
        className={styles.card_status}
        style={{
          background: `${getStatusColor(type)}33`,
          color: getStatusColor(type)
        }}
      >
        {type === 'over' ? '↑' : type === 'short' ? '↓' : '•'}
      </div>
    </div>
  )
}

const SummaryContent = ({children}) => <div className={styles.card_body}>{children}</div>

const MediaList = ({children}) => {
  return (
    <div className={styles.card_body_list}>
      <ScrollView bottom='0px'>
        {/* <DragableListItem id={"cash"} title={"Cash"} description={""} status={""} /> */}
        {children}
      </ScrollView>
    </div>
  )
}

const MainValue = ({label,value,format=Format.CURRENCY_FORMAT}) => {
  return (
    <div className={styles.card_main_value}>
      <div className={styles.card_main_label}>{label}</div>
      <div className={styles.card_main_amount}>{Format.string(value,format)}</div>
    </div>
  )
}

const ValueList = ({children}) => <div className={styles.card_values}>{children}</div>


const ListItem = ({label,value}) => {
  return (
    <div className={styles.card_value_item}>
      <span className={styles.card_value_label}>{label}</span>
      <span
              className={styles.card_value_amount}
              style={{ color: value >= 0 ? '#00ff88' : '#ff6b35' }}
            >
              {value >= 0 ? '+' : ''}${value}
            </span>
    </div>
  )
}

const MediaItem = ({label,value}) => {
  return (
    <div className={styles.card_value_media_item}>
      <span className={styles.card_value_label}>{label}</span>
      <span className={styles.card_value_amount}>{value}</span>
    </div>
  )
}


const ActionButton = ({title,type,onClick}) => {
  return (
    <FlexRow vAlign='center' m='0rem 0 0 0'>
      <OutlineButton type={type} size='md' onClick={onClick}>{title}</OutlineButton>
    </FlexRow>
  )
}


const FinancialCard = ({ data,type,children }) => {


  return (
    <div className={`${styles.financial_card} ${type && styles[type]}`}>
      {children}      
    </div>
  );
};

FinancialCard.Header = Header;
FinancialCard.Summary = SummaryContent;
FinancialCard.SummaryList = MediaList;
FinancialCard.MainValue = MainValue;
FinancialCard.List = ValueList;
FinancialCard.Value = ListItem;
FinancialCard.MediaValue = MediaItem;
FinancialCard.ActionButton = ActionButton;

export default FinancialCard;