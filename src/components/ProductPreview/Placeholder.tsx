import React from 'react';
import styles from './styles.module.scss';

const Placeholder = ({ title }: { title: string }) => {
  return (
    <div className={styles.preview}>
      <span className={styles.placeholder_text}>{title}</span>
    </div>
  );
};

export default Placeholder;
