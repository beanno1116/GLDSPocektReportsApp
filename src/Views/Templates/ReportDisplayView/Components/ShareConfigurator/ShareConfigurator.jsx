
import OutlineEmailIcon from '../../../../../../assets/icons/OutlineEmailIcon';
import OutlineMessageIcon from '../../../../../../assets/icons/OutlineMessageIcon';
import Button from '../../../../../../Components/Buttons/Button';
import FlexRow from '../../../../../../Components/FlexComponents/FlexRow';
import TextField from '../../../../../../Components/Inputs/TextField';
import Heading from '../../../../../../Components/Labels/Heading';
import Toolbar from '../../../../../../Components/Toolbar/Toolbar';
import styles from './shareConfigurator.module.css';

const reportToolbarButtons = [
  {
    id: 1,
    name: "",
    icon: <OutlineEmailIcon size={35} color='snow' />,
    action: "Email"
  },
  {
    id: 2,
    name: "",
    icon: <OutlineMessageIcon size={35} color='snow' />,
    action: "Message"
  },
  {
    id: 3,
    name: "",
    icon: <OutlineEmailIcon size={35} color='snow' />,
    action: "Teams"
  },
  {
    id: 4,
    name: "",
    icon: <OutlineEmailIcon size={35} color='snow' />,
    action: "IM"
  },
]



const ShareConfigurator = ({ submitHandler }) => {
  return (
    <div className={styles.share_config_view}>
      <div className={styles.share_config_panel}>
        <Heading mode='lite' size='lg'>Share</Heading>
        <Toolbar buttons={reportToolbarButtons}></Toolbar>
        <FlexRow p='.5rem 1rem'>
            <Button onClick={submitHandler}>Share</Button>
        </FlexRow>
      </div>
    </div>
  );
}

export default ShareConfigurator;