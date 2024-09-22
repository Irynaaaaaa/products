import React from 'react';
import styles from './styles.module.scss';

type ButtonColor = 'delete' | 'base';
type ButtonSize = 'small' | 'medium' | 'large';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
  onClick: () => void;
  className?: string;
  color?: ButtonColor;
  size?: ButtonSize;
  //   icon?: React.ReactNode;
};

const Button = ({
  color = 'base',
  size = 'medium',
  title,
  onClick,
  //   icon,
  className,
  ...props
}: ButtonProps) => {
  const onButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <button
      className={`${styles.base_button} ${styles[color]} ${styles[size]} ${className}`}
      onClick={onButtonClick}
      {...props}
    >
      {title}
      {/* {icon ? (
        <span className={styles.withIcon}>
          {icon} <span className={styles.title}>{title}</span>
        </span>
      ) : (
        <span className={styles.title}>{title}</span>
      )} */}
    </button>
  );
};

export default Button;
