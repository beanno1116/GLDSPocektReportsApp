
import OutlineButton from '../../../Components/Buttons/OutlineButton';
import PrimaryButton from '../../../Components/Buttons/PrimaryButton';
import FlexRow from '../../../Components/FlexComponents/FlexRow';
import Show from '../../../Components/Show/Show';
import ErrorCard from '../Components/Cards/ErrorCard';
import View from './View';
import styles from './view.module.css';

const ErrorView = ({ title,message,code,type }) => {
  return (
    <FlexRow height='100%' width='100%' p='1rem' vAlign='center' hAlign='center'>
      <ErrorCard title={title} message={message} code={code} type={type} />
    </FlexRow>
  );
}

export default ErrorView;