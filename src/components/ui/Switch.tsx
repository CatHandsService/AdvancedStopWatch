import React from 'react';
import MuiSwitch from '@mui/material/Switch';
import styles from './style.module.scss';

// Switch コンポーネントの型定義
interface SwitchProps extends React.ComponentPropsWithoutRef<typeof MuiSwitch> {
  checked: boolean; // checked の型を指定
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // onChange の型を指定
  className?: string; // className の型を指定 (オプショナル)
}

export default function Switch({ checked, onChange, className = '', ...props }: SwitchProps) {
  return (
    <MuiSwitch
      checked={checked}
      onChange={onChange}
      className={`${styles.switch} ${className}`}
      {...props}
    />
  );
}
