import styles from './label.module.css';

const Heading = ({ size="md",mode="dark",textAlign="center",children }) => {
  return (
    <div className={`${styles.heading_label} ${styles[mode]} ${styles[size]}`} style={{textAlign:textAlign}}>
       {children}
    </div>
  );
}

export default Heading;