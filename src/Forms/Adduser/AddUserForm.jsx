
import { useState } from 'react';
import PlainUserIcon from '../../assets/icons/PlainUserIcon';
import FlexRow from '../../Components/FlexComponents/FlexRow';
import TextField from '../../Components/Inputs/TextField';
import WECheckbox from '../../Components/Inputs/WECheckbox/WECheckbox';
import InputLabel from '../../Components/Labels/InputLabel';
import useAppContext from '../../hooks/useAppContext';
import useWEForm from '../../hooks/useWEForm';
import User from '../../Models/User';
import ManageUserStoreList from '../Components/ManageUserStoreList/ManageUserStoreList';
import styles from './addUserForm.module.css';
import Button from '../../Components/Buttons/Button';
import IconButton from '../../Components/Buttons/IconButton';
import XIcon from '../../assets/icons/XIcon';
import { useAuth } from '../../hooks/useAuth';
import { useApiClient } from '../../Api/Api';
import { loader } from '../../Components/Loader/LoaderModal';
import Heading from '../../Components/Labels/Heading';
import BGImageAddUser from './Components/BGImageAddUser';
import PrimaryButton from '../../Components/Buttons/PrimaryButton';
import KpiGrid from '../../Components/Grids/KpiGrid';
import SectionTitle from '../../Views/Templates/View/Components/SectionTitle';
import Card from '../../Views/Templates/Components/Cards/Card';
import FlexColumn from '../../Components/FlexComponents/FlexColumn';
import TabView from '../../Components/TabView/TabView';
import AddUserConfirmPanel from './Components/AddUserConfirmPanel';

const initialFormData = {
  email: "",
  name: "",
  isAdmin: false
}

const NewUserInformationForm = ({registerFormInput}) => {
  return (
  
      <FlexColumn g='2rem' p='1rem'>
        <TextField  label={"Email"} size={'sm'} {...registerFormInput("email",{required:true})} />   
        <TextField  label={"Name"} size={'sm'} {...registerFormInput("name")} />   
        <FlexRow vAlign='center' hAlign='center' g='1rem'>
          <InputLabel text={"Make Admin"}/>
          <WECheckbox size="lg" {...registerFormInput("isAdmin")} />
        </FlexRow>   
      </FlexColumn>

  )
}

const AddUserFormTabView = ({registerFormInput,onRowClick,currentUser}) => {
  const getTab = (tab) => {
    return tab[0].toUpperCase() + tab.slice(1);
  }

  const renderTabView = (tab) => {
    switch (tab) {
      case "information":        
        return (<NewUserInformationForm registerFormInput={registerFormInput}/>);        
      case "store access":
        return (<ManageUserStoreList currentUser={currentUser} onClick={onRowClick}/>);
      default:
        return (<div style={{color:"snow"}}>Information tab view</div>);
    }
  }
  return (
    <TabView 
      tabs={["information","store access"]}
      getTab={getTab}
      renderTabView={renderTabView}
    />
  )
}


const AddUserForm = ({ handleSubmit }) => {
  const {state} = useAppContext();
  const [newAccessCode,setNewAccessCode] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const auth = useAuth();
  const api = useApiClient();
  const {formData,registerFormInput,resetForm,onSubmit} = useWEForm(initialFormData);
  const [currentUser,setCurrentUser] = useState(new User());


  const onStoreRowClick = (e,storeId) => {    
    if (currentUser.stores.filter(authStore => authStore === storeId).length > 0){
      setCurrentUser({...currentUser,stores:currentUser.stores.filter(authStore => authStore !== storeId)});
      return;
    }
    setCurrentUser({...currentUser,stores:[...currentUser.stores,storeId]})
  }

  const onSaveUserChanges = async ({data,isValid}) => {
    // loader.loading();
    
    let temp = currentUser;
    if (!isValid){
      loader.loaded();
      return;
    }
    
    const fd = {
      token: auth.token,
      userId: auth.getAuthUser().id,
      orgId: state.organization,
      email: data.email,
      isAdmin: data.isAdmin === "true" ? true : false,
      storeIds: currentUser.stores
    }
    console.log(fd);
    resetForm()
    setShowSuccessModal(true)
    // const createUserResponse = await api.post("users",fd,api.headers.applicationJson);

    // if (createUserResponse.success){      
    //   setShowSuccessModal(true);
    //   setNewAccessCode(createUserResponse.data);
    //   loader.loaded();
    //   return;
    // }
    loader.loaded();

  }

  const closeDropdown = () => {
    setShowSuccessModal(false);
  }

  const onCloseButtonClick = (e) => {
    handleSubmit && handleSubmit();
  }

  const renderButton = () => {
    if (formData?.email !== ""){
      return (
        <PrimaryButton action={"next"} size='lg' color='black' onClick={(e) => onSubmit(e,onSaveUserChanges)}>Create User</PrimaryButton>
      )
    }
    return (
      <PrimaryButton action={"cancel"} size='lg' color='black' onClick={onCloseButtonClick}>Close</PrimaryButton>
    )
  }

  return (
    <>
      <AddUserConfirmPanel when={showSuccessModal} close={closeDropdown} accessCode={"afs0-3e-1sg"} email={formData.email}/>

      <AddUserFormTabView registerFormInput={registerFormInput} onRowClick={onStoreRowClick} currentUser={currentUser} />

      <FlexColumn flex='1'></FlexColumn>

      {/* <ManageUserStoreList stores={state.stores} currentUser={currentUser} onClick={onStoreRowClick} /> */}

      <FlexRow g='1rem'>
        {renderButton()}
      </FlexRow>
    </>
  );
}

export default AddUserForm;