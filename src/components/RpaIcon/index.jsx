import React from 'react';
import { Icon } from '@alifd/next';
import classnames from 'classnames';
import createdSVG from './font';
import styles from './index.module.scss';

if (process.env.NODE_ENV === 'test') {
  Icon.createFromIconfontCN({
    scriptUrl: 'http://at.alicdn.com/t/font_935323_9xvoh1907yh.js',
  });
} else {
  createdSVG();
}

function RpaIcon({ type, size = 'small' }) {
  const className = classnames('next-icon', styles['rpa-icon'], {
    [`next-${size}`]: size,
  });
  return (
    <i className={className}>
      <svg aria-hidden="true">
        <use xlinkHref={`#${type}`}></use>
      </svg>
    </i>
  );
}

export default RpaIcon;
