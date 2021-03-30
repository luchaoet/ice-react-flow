import React from 'react';
import styles from './index.module.scss'
import empty from '../../utils/empty'
import './iconfont'

export default class Icon extends React.Component {
	constructor(props){
		super(props);
  }
  
  render() {
    const {type, style, className, onClick = empty, onMouseEnter = empty, onMouseLeave = empty} = this.props;
    return (
      <i 
        className={className} 
        style={style} 
        onClick={e => onClick(e)}
        onMouseEnter={e => onMouseEnter(e)}
        onMouseLeave={e => onMouseLeave(e)}
      >
        <svg className={styles.icon} aria-hidden="true">
          <use xlinkHref={`#${type}`} />
        </svg>
      </i>
    )
  }
}