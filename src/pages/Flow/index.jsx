import React from 'react';
import styles from './index.module.scss';
import FlowCanvas from '@/components/FlowCanvas';
import ModuleMenu from '@/components/ModuleMenu';
import nodes from './nodes'
import NodeView from '@/components/FlowCanvas/components/Node'

const views = {
  common: NodeView
}

export default class Flow extends React.Component {
	constructor(props){
		super(props);
  }
  
  render() {
    return (
      <div className={styles.wrap}>
        <ModuleMenu />
        <FlowCanvas nodes={nodes} views={views}/>
      </div>
    )
  }
}