
import styles from './view.module.css';

const NoDataView = ({ dataName,...props }) => {
  return (
    <div className={styles.no_data_view}>
       No {dataName} found!
    </div>
  );
}

export default NoDataView;