import React from 'react';
import styles from './index.module.scss'
import './iconfont'

export default class Icon extends React.Component {
	constructor(props){
		super(props);
  }
  
  render() {
      const {type, style, className, onClick} = this.props;
    return (
      <i className={className} style={style} onClick={e => onClick && onClick(e)}>
        <svg className={styles.icon} aria-hidden="true">
          <use xlinkHref={`#${type}`} />
        </svg>
      </i>
    )
  }
}