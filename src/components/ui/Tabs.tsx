import React, { ReactNode } from 'react';
import { Tabs as MuiTabs, Box } from '@mui/material';
import styles from './style.module.scss';

// Tabs コンポーネントの型定義
interface TabsProps {
  children: ReactNode; // children の型を指定
  defaultValue: string; // 受け取る value の型を指定
  onChange: (event: React.SyntheticEvent, newValue: string) => void; // onChange の型を指定
}

export default function Tabs({ children, defaultValue, onChange }: TabsProps) {
  return (
    <MuiTabs value={defaultValue} onChange={onChange} className={styles.tabs}>
      {children}
    </MuiTabs>
  );
}

// TabList コンポーネントの型定義
interface TabListProps {
  children: ReactNode; // children の型を指定
}

export function TabList({ children }: TabListProps) {
  return <div className={styles.tabList}>{children}</div>;
}

// TabPanel コンポーネントの型定義
interface TabPanelProps {
  children: ReactNode; // children の型を指定
  value: unknown; // value の型を指定 (必要に応じて具体的な型に変更)
  index: number; // index の型を指定
}

export function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    value === index && (
      <Box className={styles.tabPanel}>
        {children}
      </Box>
    )
  );
}
