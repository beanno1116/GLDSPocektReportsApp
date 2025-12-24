
import Format from '../../../Utils/Format';
import Button from '../../Buttons/Button';
import FlexColumn from '../../FlexComponents/FlexColumn';
import FlexRow from '../../FlexComponents/FlexRow';
import WEAccordion from '../../WEAccordion/WEAccordion';
import styles from '../cards.module.css';

const handleZeroValue = (value) => {
  
  if (value === undefined || value === null) return "";
  if (value === "") return "0.00";

  if (parseFloat(value) === 0.00 || parseFloat(value) === 0) return Format.stringAsMoney(parseFloat(value));
  
  return Format.stringAsMoney(value);
}

const HeaderLabel = ({text}) => {
  return (
    <label className={styles.detail_row_header_label}>{text}</label>
  )
}

const SubLabel = ({text}) => {
  return (
    <span className={styles.detail_row_header_sublabel}>{text}</span>
  )
}

const LabelRow = ({label,value}) => {
  return (
    <div className={styles.details_row_label_row}>
      <label className={styles.details_row_label_row_label}>{label}</label>                  
      <span className={styles.details_row_label_row_value}>{value}</span>
    </div>
  )
}


const DetailRow = ({ title,subtitle,details=[] }) => {
  return (
    <div className={styles.display_row}>
      <WEAccordion>
        <WEAccordion.Panel>
          <WEAccordion.Panel.Header>
            <HeaderLabel text={title} />
            <SubLabel text={`Ending: $${handleZeroValue(subtitle)}`} />
          </WEAccordion.Panel.Header>
          <WEAccordion.Panel.Content>
            
            <FlexColumn width='100%' p='0 .5rem .5rem .5rem'>

              {details.filter(d => parseFloat(d.value) !== 0.00).map(detail => {
                return (
                  <LabelRow label={detail.title} value={`$${handleZeroValue(detail.value)}`} />
                )
              })}
              

              {/* <LabelRow label={"Pick Ups"} value={"$25.45"} /> */}

            </FlexColumn>
            
            <Button color="black">View Details</Button>


          </WEAccordion.Panel.Content>
        </WEAccordion.Panel>
      </WEAccordion>
    </div>
  );
}

DetailRow.HeaderLabel = HeaderLabel;
DetailRow.HeaderSubLabel = SubLabel;

export default DetailRow;