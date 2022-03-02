import styles from './Spinner.module.css';

const Spinner = () => {
  return (
    <div className={styles.container}>
      <div className={styles.cycle}></div>
    </div>
  );
};

export default Spinner;
