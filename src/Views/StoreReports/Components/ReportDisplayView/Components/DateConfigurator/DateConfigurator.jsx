
import { useState } from 'react';
import Button from '../../../../../../Components/Buttons/Button';
import FlexColumn from '../../../../../../Components/FlexComponents/FlexColumn';
import FlexRow from '../../../../../../Components/FlexComponents/FlexRow';
import Heading from '../../../../../../Components/Labels/Heading';
import styles from './dateConfigurator.module.css';
import IconButton from '../../../../../../Components/Buttons/IconButton';
import XIcon from '../../../../../../assets/icons/XIcon';

const DateConfigurator = ({ submitHandler }) => {
  const [isPeriodOptionsShowing,setIsPeriodOptionsShowing] = useState(false);
  
const onPeriodButtonClick = (e) => {
  const span = e.target;
  if (span && span.localName === "span"){
    const period = span.dataset.period;
    console.log(`Period ${period} has been seleccted`);
    setIsPeriodOptionsShowing(true);
    return;
  }
  debugger;
}


  return (
    <div className={styles.date_config_view}>
      <div className={styles.date_config_panel} >

        <FlexColumn g='1rem' p='1rem 0'>
          <Heading mode='lite' size='lg'>Configure Date</Heading>
          <FlexRow hAlign='center' g='.5rem'>

            <div className={styles.period_selector_toolbar} onClick={onPeriodButtonClick}>
              <span data-period="d" style={{textAlign:"center"}}>D</span>
              <span data-period="w" style={{textAlign:"center"}}>W</span>
              <span data-period="m" style={{textAlign:"center"}}>M</span>
              <span data-period="y" style={{textAlign:"center"}}>Y</span>
            </div>

            

          </FlexRow>

          {isPeriodOptionsShowing && (
              <FlexRow g='.75rem' p='.5rem .75rem'>
                <Button size='sm'>Current</Button>
                <Button size='sm'>Previous</Button>
                <Button size='sm'>Last Year</Button>
              </FlexRow>
            )}

          <FlexColumn g='.5rem' width='100%'>
            <Heading size='sm'>Select Range</Heading>
            <FlexRow hAlign='center'>
              <input type='date' />
            </FlexRow>
            <FlexRow hAlign='center'>
              <input type='date' />
            </FlexRow>
          </FlexColumn>
          <FlexRow p='.5rem 1rem'>
            <Button onClick={submitHandler}>Apply</Button>
            {/* <IconButton>
              <XIcon size={24} />
            </IconButton> */}
          </FlexRow>
        </FlexColumn>
      </div>
    </div>    
  );
}

export default DateConfigurator;