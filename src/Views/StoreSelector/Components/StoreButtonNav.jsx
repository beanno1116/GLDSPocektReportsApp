
import styles from '../storeSelectorView.module.css';
import siteStyles from '../../../site.module.css';

const StoreButtonNav = ({ store,onClick }) => {
  return (
    <button data-value={store.id} className={`${styles.store_button} ${siteStyles.panel_bg}`} onClick={onClick}>
      <h1>{store.name}</h1>
      <div className={styles.store_button_stat_row}>
        <div className={`${styles.store_stat_widget} ${siteStyles.panel_bg}`} style={{flex:"1"}}>
          <label className={styles.stat_widget_label}>Sales</label>
          <div className={styles.stat_widget_big_dollar}>$200K</div>
        </div>
        <div className={`${styles.store_stat_widget} ${siteStyles.panel_bg}`} style={{flex:"2"}}>
          <label className={styles.stat_widget_label}>Transactions</label>
          <div className={styles.stat_widget_big_dollar}>150</div>
        </div>
        <div className={`${styles.store_stat_widget} ${siteStyles.panel_bg}`} style={{flex:"1"}}>
          <label className={styles.stat_widget_label}>Hourly</label>
          <div className={styles.stat_widget_big_dollar}>$20K</div>
        </div>
      </div>
      <div className={styles.store_widget_location_row}>{store.city}, {store.state}</div>
    </button>
  );
}

export default StoreButtonNav;