
import { useState } from 'react';
import styles from '../reportBuilder.module.css';

const Step = ({number,step}) => {
  return (
    <div key={number} className={styles.step_container}>
      <div className={`${styles.step_circle} ${step >= number && styles.step_active}`}>
        {number}
      </div>
      <div className={styles.step_label}>
        {number === 1 && 'Type'}
        {number === 2 && 'Date'}
        {number === 3 && 'Metrics'}
      </div>
      {number < 3 && (
        <div className={`${styles.step_line} ${step > number && styles.step_line_active}`} />
      )}
    </div>
  )
}


const ProgressBar = ({ step }) => {

  return (
    <div className={styles.progress_bar}>
      <div className={styles.progress_steps}>
        {[1, 2, 3].map((num) => (
          <Step number={num} step={step} />
        ))}
      </div>
    </div>
  );
}

export default ProgressBar;