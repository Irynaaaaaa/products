import React from 'react';
import styles from './styles.module.scss';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
  className?: string;
  validationMessage?: string;
};

const Input = ({
  name,
  label,
  className = '',
  validationMessage,
  ...otherProps
}: InputProps) => {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}
      <input className={styles.input} {...otherProps} id={name} name={name} />
      {validationMessage && (
        <span className={styles.validation_message}>{validationMessage}</span>
      )}
    </div>
  );
};

export default Input;
