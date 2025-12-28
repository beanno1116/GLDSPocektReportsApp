
import XIcon from '../../../assets/icons/XIcon';
import Format from '../../../Utils/Format';
import { take } from '../../../Utils/Utils';
import Button from '../../Buttons/Button';
import IconButton from '../../Buttons/IconButton';
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


const DetailRow = ({ title,subtitle="",showIcon=true,details=[] }) => {

  

  const close = (e) => {

  }
  
  return (
    <div className={styles.display_row}>
      <WEAccordion>
        <WEAccordion.Panel>
          <WEAccordion.Panel.Header showIcon={showIcon}>
            <HeaderLabel text={title} />
            <SubLabel text={subtitle === "" ? "" : `Ending: $${handleZeroValue(subtitle)}`} />
          </WEAccordion.Panel.Header>
          <WEAccordion.Panel.Content>
            
            <FlexColumn width='100%' p='0 .5rem .5rem .5rem'>

              {[...take(3,details)].filter(d => parseFloat(d.value) !== 0.00).map(detail => {
                return (
                  <LabelRow label={detail.description} value={`$${handleZeroValue(detail.total)}`} />
                )
              })}
              

            </FlexColumn>

            <FlexRow p='1rem' g='1rem'>
              <Button size='lg' theme='dark' color="snow">View Summary</Button>
              <IconButton size='lg' onClick={close}><XIcon size={24}/></IconButton>
            </FlexRow>
            


          </WEAccordion.Panel.Content>
        </WEAccordion.Panel>
      </WEAccordion>
    </div>
  );
}

DetailRow.HeaderLabel = HeaderLabel;
DetailRow.HeaderSubLabel = SubLabel;

export default DetailRow;