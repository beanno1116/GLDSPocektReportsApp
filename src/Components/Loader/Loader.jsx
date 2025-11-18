import styles from './loader.module.css';

const Loader = () => {
  return (
    <div id={styles.loader} className={styles.loader}>
      {/* <div className={styles.spinner}></div> */}
    </div>
  );
}

export default Loader;