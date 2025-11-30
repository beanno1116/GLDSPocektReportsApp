import styles from './loader.module.css';

const Loader = ({text=""}) => {
  return (
    <div className={styles.loaderPanel} >
             
        <div className={styles.spinner}></div>
      
      {text !== "" && <span>{text}</span>}
    </div>
  );
}

export default Loader;