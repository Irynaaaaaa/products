import React from 'react';
import styles from './styles.module.scss';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
  className?: string;
};

const Input = ({ name, label, className = '', ...otherProps }: InputProps) => {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}
      <input className={styles.input} {...otherProps} id={name} name={name} />
    </div>
  );
};

export default Input;
