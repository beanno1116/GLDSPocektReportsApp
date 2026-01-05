import ScrollSelector from '../ScrollSelector/ScrollSelector';


const StoreSelector = ({ stores=[],activeStore,onClick }) => {

  const handleStoreSelction = (e,storeId) => {
    if (activeStore === storeId) return;
    onClick && onClick(e,storeId);
  }

  return (
    <ScrollSelector>
      {stores.map(store => {
        return (
          <ScrollSelector.Item 
            key={store.id} 
            id={store.id} 
            active={activeStore === store.id ? true : false} 
            text={store.name} 
            onClick={(e) => handleStoreSelction(e,store.id)} 
          />
        )
      })}
    </ScrollSelector>
  );
}

export default StoreSelector;