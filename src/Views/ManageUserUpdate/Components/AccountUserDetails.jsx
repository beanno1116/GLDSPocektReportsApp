import { useGetOrgUsers } from "../../../Api/ApiRoutes";
import FlexRow from "../../../Components/FlexComponents/FlexRow";
import useAppContext from "../../../hooks/useAppContext";
import Card from "../../Templates/Components/Cards/Card";



const AccountUserDetails = ({ total=0,used=0 }) => {
  const {state} = useAppContext();
  const {status,users} = useGetOrgUsers(state.organization);

  if (status.isLoading) {
    return (
      <div>loading...</div>
    )
  }

  return (
    <Card>
      <FlexRow hAlign='space-between' vAlign='center'>
        <FlexRow vAlign='center' g='.5rem'>
          <Card.CompactLabel text={"Total:"} />
          <Card.CompactValue text={state.seats} />
        </FlexRow>
        <FlexRow hAlign='flex-end' vAlign='center' g='.5rem'>
          <Card.CompactLabel text={"Available:"} />
          <Card.CompactValue text={parseInt(state.seats) - parseInt(users.length)} />
        </FlexRow>          
      </FlexRow>
    </Card>
  );
}

export default AccountUserDetails;