import { useNavigate } from "react-router";
import Button from "../../../Components/Buttons/Button";
import PrimaryButton from "../../../Components/Buttons/PrimaryButton";
import FlexColumn from "../../../Components/FlexComponents/FlexColumn";
import FlexRow from "../../../Components/FlexComponents/FlexRow";
import { useAuth, useAuthActions } from "../../../hooks/useAuth";
import Card from "../../Templates/Components/Cards/Card";
import UserIcon from "../../../assets/icons/UserIcon";
import EditAuthUserPanel from "./EditAuthUserPanel";
import { useState } from "react";


const useCurrentUserDetails = () => {
  const auth = useAuth();
  const authUser = auth.getAuthUser();
  const authActions = useAuthActions();
  const navigate = useNavigate();
  const [showFormPanel,setShowFormPanel] = useState(false);

  const closePanel = () => {
    
    setShowFormPanel(false);
  }

  const onManageButtonClick = (e) => {
    setShowFormPanel(true);
  }

  const onLogoutButtonClick = (e) => {
    const button = e.target;
    if (authActions.logout()){
      navigate("/login",{viewTransition:true});
    }
  }

  return {
    authUser,
    closePanel,
    onLogoutButtonClick,
    onManageButtonClick,
    showFormPanel
  }
}


const CurrentUserDetails = ({ ...props }) => {
  const {authUser,onLogoutButtonClick,onManageButtonClick,showFormPanel,closePanel} = useCurrentUserDetails();

  return (
    <>
      <EditAuthUserPanel when={showFormPanel} close={closePanel}/>
      <Card>
        <FlexColumn g="1rem">
          <FlexRow>
            <FlexColumn g=".5rem">
              <FlexRow>
                <Card.Label size="lg" text={authUser.isAdmin ? "Administrator" : "User"}/>
              </FlexRow>
              <FlexRow>
                <Card.Label text={authUser.username} />                        
              </FlexRow>
            </FlexColumn>
            <FlexRow hAlign="flex-end">
              <UserIcon size={60} />
            </FlexRow>
          </FlexRow>
          <FlexRow g='1rem'>
            <PrimaryButton onClick={onManageButtonClick}>Manage</PrimaryButton>
            <PrimaryButton onClick={onLogoutButtonClick}>Logout</PrimaryButton>
          </FlexRow>
        </FlexColumn>
      </Card>
    </>
  );
}

export default CurrentUserDetails;