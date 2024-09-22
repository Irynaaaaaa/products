import React from 'react';
import styles from './styles.module.scss';

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  name: string;
  label: string;
  className?: string;
  validationMessage?: string;
};

const TextArea = ({
  name,
  label,
  className = '',
  validationMessage,
  ...otherProps
}: TextAreaProps) => {
  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}
      <textarea
        className={`${styles.textarea} ${className}`}
        {...otherProps}
        id={name}
        name={name}
      />
      {validationMessage && (
        <span className={styles.validation_message}>{validationMessage}</span>
      )}
    </div>
  );
};

export default TextArea;
