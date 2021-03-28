import React from 'react';
import Icon from '../Icon'
import styles from './index.module.scss'
import { delay } from '@/utils'
import cx from 'classnames'

export default class AddLine extends React.Component {
	constructor(props){
    super(props);
    this.state = {
      status: null
    }
  }

  onDragEnter = (e) => {
    this.setState({status: 'enter'})
  }

  onDragLeave = (e) => {
    this.setState({status: null})
  }

  onDrop = (e) => {
    this.setState({status: null})
  }

  onDragOver = (e) => {
    e.preventDefault();
  }

  onAddClick = () => {
    console.log('onAddClick')
  }
  
  render() {
    const { status } = this.state;
    const className = cx(
      styles.add_wrap,
      {[styles.add_enter]: status === 'enter'}
    )
    return (
      <div 
        className={styles.wrap} 
      >
        <Icon type='rpaxiangxiajiantou' className={styles.arrow}/>
        {
          <div 
            className={className}
            onDragEnter={this.onDragEnter} 
            onDragLeave={this.onDragLeave}
            onDragOver={this.onDragOver} 
            onDrop={this.onDrop}
          >
            {status !== 'enter' && <Icon type="rpaGroup-" className={styles.add_icon} onClick={this.onAddClick} />}
          </div>
        }
        {/* {
          status === 'enter'
          ? <div className={styles.node_enter}></div>
          : <Icon type="rpaGroup-" className={styles.add} />
        } */}
        <Icon type='rpaxiangxiajiantou' className={styles.arrow}/>
      </div>
    )
  }
} 