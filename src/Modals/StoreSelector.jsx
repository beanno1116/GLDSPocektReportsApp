
import { useRef, useState } from 'react';
import StoreIcon from '../assets/icons/StoreIcon';
import PrimaryButton from '../Components/Buttons/PrimaryButton';
import FlexRow from '../Components/FlexComponents/FlexRow';
import useAppContext from '../hooks/useAppContext';
import Card from '../Views/Templates/Components/Cards/Card';
import LabelCard from '../Views/Templates/Components/Cards/LabelCard';
import View from '../Views/Templates/View/View';
import styles from './modals.module.css';
import { UPDATE_ACTIVE_STORE, UPDATE_STORE_CHANGE } from '../Contexts/actions';

const StoreSelector = ({ close,multiSelect=false,...props }) => {
  const {state,dispatch} = useAppContext();
  const [selected,setSelected] = useState([state.activeStore]);

  const agentStringRef = useRef(state.agentString);

  const onStoreSelection = (e,id,agentString) => {
    agentStringRef.current = agentString;
    if (!multiSelect){
      setSelected([id]);
      return;
    }
    if (selected.includes(id)){
      setSelected([...selected.filter(s => s !== id)]);
      return;
    }
    setSelected([...selected,id]);
  }

  const onDoneButtonClick = (e) => {
    if (state.activeStore === selected[0]) {
      close();
      return;
    }
    dispatch({type:UPDATE_STORE_CHANGE,payload:{activeStore:selected[0],agentString:agentStringRef.current}});
    close();
  }

  return (
    <div style={{width:"100%",height:"100%",padding:"0 1rem",display:"flex",justifyContent:"center",alignItems:"center"}}>
      <Card>
        <FlexRow hAlign='space-between'>
          <View.Header showDate={false} title={"Store Selector"} />
          {multiSelect && <LabelCard.CountBadge selected={selected.length} total={state.stores.length} />}
        </FlexRow>
        {state.stores.map(store => {
          return (
            <LabelCard key={store.id} active={selected.includes(store.id)} onClick={(e) => onStoreSelection(e,store.id,store.agentString)}>
              <LabelCard.Icon icon={<StoreIcon size={32} />} />
              <LabelCard.Details text={store.name} subText={`${store.city}, ${store.state} `} />
            </LabelCard>
          )
        })}
        <FlexRow p='1rem 0 0 0'>
          <PrimaryButton size='lg' onClick={onDoneButtonClick}>Apply</PrimaryButton>
        </FlexRow>
      </Card>
    </div>
  );
}

export default StoreSelector;