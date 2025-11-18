import styles from './mainView.module.css';

const sectionMap = new Map();

const MainView = () => {

  const registerSection = (ele) => {
    if (ele){
      sectionMap.set("1",ele);
    }
  }

  const goToPage = () => {

  }

  return (
    <div className={styles.main_view}>

      <div className={styles.title}>
        <h2 className={styles.title_h2}>Pocket Reports</h2>
      </div>

      <div className={`${styles.sections_wrapper} ${styles.menu_open}`}>

        <section className={`${styles.menu_panel} ${styles.one}`}>
          <h1 className={styles.section_h1}>Customers</h1>
          <div className={styles.section_view}></div>
        </section>

        <section className={`${styles.menu_panel} ${styles.two}`} onClick={(e) => goToPage(0,e)}>
          <h1 className={styles.section_h1}>Items</h1>
          <div className={styles.section_view}></div>
        </section>

        <section className={`${styles.menu_panel} ${styles.three}`}>
          <h1 className={styles.section_h1}>Store</h1>
          <div className={styles.section_view}></div>
        </section>

        <section className={`${styles.menu_panel} ${styles.four}`}>
          <h1 className={styles.section_h1}>Vendors</h1>
          <div className={styles.section_view}></div>
        </section>

        <section className={`${styles.menu_panel} ${styles.five}`}>
          <h1 className={styles.section_h1}>At A Glance</h1>
          <div className={styles.section_view}></div>
        </section>
        


        <h1 className={styles.section_h1}>Reports Dashboard</h1>

        

      </div>

    </div>
  );
}

export default MainView;