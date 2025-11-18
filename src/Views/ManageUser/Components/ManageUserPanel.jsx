
import IconButton from '../../../Components/Buttons/IconButton';
import NavButton from '../../../Components/Buttons/NavButton';
import FlexColumn from '../../../Components/FlexComponents/FlexColumn';
import FlexRow from '../../../Components/FlexComponents/FlexRow';
import Heading from '../../../Components/Labels/Heading';
import styles from '../manageUserView.module.css';
import StoreRow from './StoreRow';

const ManageUserPanel = ({ stores,user,when,onChange }) => {

  const onStoreRowClick = (e,value) => {
    debugger;
    let tmpStores = stores;
    let temp = stores.filter(store => parseInt(store.customer) === parseInt(value));
    e.currentTarget.classList.add(styles.active);
    if (temp.length > 0){
      user.stores = [...user.stores,temp[0].id];
    }    
    console.log();
  }

  const onSaveUserChanges = (e) => {
    onChange && onChange(e);
  }

  return (
    <div className={`${styles.manage_use_settings} ${when ? styles.showing : ""}`}>

      <FlexColumn flex='1' g='1rem' width='100%'>
        <Heading size='lg' mode='lite'>Manage User</Heading>
        <Heading size='sm' mode='lite'>{user?.username}</Heading>
        <FlexRow vAlign='center' hAlign='space-around'>
          <Heading size='md' mode='lite'>
            Make Admin
          </Heading>
          <input type='checkbox'/>
        </FlexRow>
        <FlexRow>
          <Heading mode={"lite"} size='md'>
            Store Access
          </Heading>
        </FlexRow>
        <FlexColumn width='100%'>
          <FlexColumn width='100%' g='1rem'>
            {stores.map(store => {
              debugger;
              if (!user){
                return (
                  <StoreRow key={store.id} name={store.name} city={store.city} state={store.state} onClick={(e) => onStoreRowClick(e,store.id)}/>    
                )
              }
              if (user.stores.filter(ustore => ustore === store.orgId).length > 0){
                return <StoreRow key={store.id} active={true} name={store.name} city={store.city} state={store.state} onClick={(e) => onStoreRowClick(e,store.id)}/>
              }
              return (
                <StoreRow key={store.id} name={store.name} city={store.city} state={store.state} onClick={(e) => onStoreRowClick(e,store.id)}/>            
              )
            })}
          </FlexColumn>
        </FlexColumn>
      </FlexColumn>

      <FlexRow>
        <NavButton active={true} theme='dark' onClick={onSaveUserChanges}>Save</NavButton>
        <IconButton action="close" onClick={onSaveUserChanges}>
          <span style={{color:"red",fontWeight:"800",fontSize:".8rem"}}>X</span>
        </IconButton> 
      </FlexRow>

    </div> 
  );
}

export default ManageUserPanel;