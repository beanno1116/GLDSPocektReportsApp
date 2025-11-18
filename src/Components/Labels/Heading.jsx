import styles from './label.module.css';

const Heading = ({ size="md",mode="dark",children }) => {
  return (
    <div className={`${styles.heading_label} ${styles[mode]} ${styles[size]}`}>
       {children}
    </div>
  );
}

export default Heading;