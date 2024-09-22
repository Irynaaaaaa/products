import React from 'react';
import styles from './styles.module.scss';

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  name: string;
  label: string;
  className?: string;
};

const TextArea = ({
  name,
  label,
  className = '',
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
    </div>
  );
};

export default TextArea;
