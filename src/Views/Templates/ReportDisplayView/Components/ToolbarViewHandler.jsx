
import ReportDisplayView from '../ReportDisplayView';
import styles from '../reportDisplayView.module.css';
import DateConfigurator from './DateConfigurator/DateConfigurator';
import ShareConfigurator from './ShareConfigurator/ShareConfigurator';

const subViews = {
  Range: DateConfigurator,
  Share: ShareConfigurator,
  Export: DateConfigurator,  
}

const ToolbarViewHandler = ({ views,when,close,view }) => {

  const submitHandler = (e) => {
    close && close(e);
  }

  const renderHomeView = (view) => {
    const Component = subViews[view];
    if (when){
      return <Component close={submitHandler} submitHandler={submitHandler} />
    }
    return null;
  }

  return (
    <div className={`${styles.modal_panel} ${when ? styles.showing : ""}`}>
      {renderHomeView(view)}
    </div>
  );
}

export default ToolbarViewHandler;