
import FlexColumn from '../FlexComponents/FlexColumn';
import FlexRow from '../FlexComponents/FlexRow';
import styles from './loader.module.css';

const Placeholder = ({ ...props }) => {
  return (
<div className={styles.placeholder}>
  <FlexRow g='.5rem'>
    <div style={{flex:"1",background:"grey",width:"5rem",height:"5rem",borderRadius:".5rem"}}></div>
    <FlexColumn width='100%' flex='2' g='.5rem'>
      <div style={{background:"grey",flex:"1",width:"100%",borderRadius:".5rem"}}></div>
      <div style={{background:"grey",flex:"1",width:"100%",borderRadius:".5rem"}}></div>
      <div style={{background:"grey",flex:"1",width:"100%",borderRadius:".5rem"}}></div>

    </FlexColumn>
  </FlexRow>
  <div className={styles.activity}>
  </div>
</div>
  );
}

export default Placeholder;