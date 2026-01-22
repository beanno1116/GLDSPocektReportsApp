import { useCallback } from 'react';
import ScrollSelector from '../ScrollSelector/ScrollSelector';


const StoreSelector = ({ stores=[],activeStore,onClick }) => {

  const handleSelection = useCallback((storeId) => (e) => {
    if (activeStore === storeId) return;
    onClick && onClick(e,storeId);
  },[activeStore,onClick])

  return (
    <ScrollSelector>
      {stores.map(store => {
        return (
          <ScrollSelector.Item 
            key={store.id} 
            id={store.id} 
            active={activeStore === store.id ? true : false} 
            text={store.name} 
            onClick={handleSelection(store.id)} 
          />
        )
      })}
    </ScrollSelector>
  );
}

export default StoreSelector;