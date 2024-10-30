import React, { ReactNode } from 'react';
import Box from '@mui/material/Box';
import styles from './style.module.scss';

// ScrollArea コンポーネントの型定義
interface ScrollAreaProps extends React.ComponentPropsWithoutRef<'div'> {
  children: ReactNode; // children の型を指定
  className?: string; // className の型を指定 (オプショナル)
}

export default function ScrollArea({ children, className = '', ...props }: ScrollAreaProps) {
  return (
    <Box className={`${styles.scrollArea} ${className}`} {...props}>
      {children}
    </Box>
  );
}
