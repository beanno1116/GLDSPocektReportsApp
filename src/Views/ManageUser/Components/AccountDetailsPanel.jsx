
import FlexRow from '../../../Components/FlexComponents/FlexRow';
import siteStyles from '../../../site.module.css';
import Card from '../../../Components/Cards/Card';
import useAppContext from '../../../hooks/useAppContext';
import { useGetOrgUsers } from '../../../Api/ApiRoutes';

const AccountDetailsPanel = () => {
    const {state} = useAppContext();
    const {status,users} = useGetOrgUsers(state.organization);

    if (status.isLoading){
      return (
        <div>Loading...</div>
      )
    }

  return (
    <Card>
      <Card.Title>Account</Card.Title>
      <Card.Content>
        <FlexRow p='1rem'>
          <FlexRow g='.5rem'>
            <span className={siteStyles.md}>Total:</span>
            <span className={siteStyles.md}>{state.seats}</span>
          </FlexRow>
          <FlexRow g='.5rem' hAlign='flex-end'>
            <span className={siteStyles.md}>Available:</span>
            <span className={siteStyles.md}>{state.seats - users.length}</span>
          </FlexRow>
        </FlexRow>
      </Card.Content>
    </Card>
  );
}

export default AccountDetailsPanel;