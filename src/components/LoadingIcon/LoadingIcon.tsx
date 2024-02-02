import React from 'react';
import styles from './component.module.scss';

interface LoadingIconProps {
  width?: string;
  height?: string;
}

const LoadingIcon: React.FC<LoadingIconProps> = ({ width = "60px", height = "60px" }) => {
  return (
    <div data-testid="loading-icon">
      <div
        className={styles.loader}
        style={{
          width,
          height
        }}
      >
      </div>
    </div>
  );
};

export default LoadingIcon;