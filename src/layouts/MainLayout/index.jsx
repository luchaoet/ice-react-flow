import React, { useState } from 'react';
import styles from './index.module.scss';

export default function MainLayout({ children }) {
  return <div className={styles.container}>{children}</div>;
}
