import React from 'react';
import Icon from '../Icon'
import styles from './index.module.scss'
import jsonParse from '../../utils/jsonParse'
import cx from 'classnames'
import Template from '../Template'
import empty from '../../utils/empty';

export default class AddLine extends React.Component {
	constructor(props){
    super(props);
    this.state = {
      status: null
    }
  }

  onDragEnter = (e) => {
    let nodes = localStorage.getItem("nodes");
    nodes = jsonParse(nodes, {});
    const {preNode, nextNode} = this.props;
    // 节点不同放置在自己的前后位置
    if(
      (preNode && preNode.id === nodes?.id) || 
      (nextNode && nextNode.id === nodes?.id)
    ){
      this.setState({status: 'not-allowed'})
    }else{
      this.setState({status: 'enter'})
    }
  }

  onDragLeave = (e) => {
    this.setState({status: null})
  }

  onDrop = (e) => {
    e.preventDefault();
    let nodes = localStorage.getItem("nodes");
    localStorage.removeItem('nodes');
    nodes = jsonParse(nodes, null);
    const {preNode, nextNode} = this.props;
    if(
      !nodes ||
      (preNode && preNode.id === nodes?.id) || 
      (nextNode && nextNode.id === nodes?.id)
    ){
      return this.setState({status: null})
    }

    if(preNode) {
      preNode.after(nodes)
    }else if(nextNode) {
      nextNode.before(nodes);
    }
    this.setState({status: null})
  }

  onDragOver = (e) => {
    e.preventDefault();
  }
  
  render() {
    const { status } = this.state;
    const {preNode, nextNode, onCreateOverlay = empty } = this.props;
    let nodes = localStorage.getItem("nodes");
    nodes = jsonParse(nodes, {});
    const isNear = preNode && preNode?.id === nodes?.id || nextNode && nextNode?.id === nodes?.id;

    const className = cx(
      styles.add_wrap,
      {
        [styles.add_enter]: status === 'enter'
      }
    )
    
    const dragEvent = isNear ? {} : {
      onDragEnter: this.onDragEnter,
      onDragLeave: this.onDragLeave,
      onDragOver: this.onDragOver,
      onDrop: this.onDrop
    }
    
    return (
      <div className={styles.wrap}>
        <Template 
          show={!!preNode} 
          component={Icon} 
          type="rpaxiangxiajiantou" 
          className={styles.arrow} 
        />
        <div 
          className={className}
          {...dragEvent}
        >
          <Template 
            show={status === null} 
            component={Icon} 
            type="rpazengjia" 
            className={styles.add_icon} 
            onClick={e => onCreateOverlay({target: e.currentTarget, preNode, nextNode})}
          />
        </div>
        <Template 
          show={!!nextNode} 
          component={Icon} 
          type="rpaxiangxiajiantou" 
          className={styles.arrow} 
        />
      </div>
    )
  }
} 