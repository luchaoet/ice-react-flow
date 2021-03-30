import React from 'react';
import Node from "./components/Node";
import styles from './index.module.scss'
import FlowNode from './utils/FlowNode'
import { Provider } from './utils/context'
import createFlowNode from './utils/createFlowNode'
import FieldForm from './components/FieldForm'

class FlowCanvas extends React.Component {
  NodeGenerateCopy = null
	constructor(props){
		super(props);
    this.dragstart = this.dragstart.bind(this)
    this.ondrag = this.ondrag.bind(this)
    this.ondrop = this.ondrop.bind(this)
    this.state = {
      nodes: props.nodes,
      views: props.views,
      flowData: props.flowData,
      flowDataDocument: createFlowNode(props.flowData),
    }
  }

  componentDidMount() {
    document.addEventListener('dragstart', this.dragstart, true)
    // document.addEventListener('ondrag', this.ondrag, true)
    // document.addEventListener('ondrop', this.ondrop, true)
    window.FlowCanvas = this;
    // window.oncontextmenu = () => false;
    
  }

  componentWillUnmount() {
    document.removeEventListener('dragstart', this.dragstart, true)
    // document.removeEventListener('ondrag', this.ondrag, true)
    // document.removeEventListener('ondrop', this.ondrop, true)
  }

  dragstart(e) {
    const nodeType = e.target.attributes?.nodetype?.value;
    const nodeUuid = e.target.attributes?.nodeuuid?.value;
    console.log('dragstart:', 'nodeType-',nodeType, ', nodeUuid-',nodeUuid)
  } 

  ondrag(e) {
    // e.preventDefault();
    // console.log('ondrag', e)
  }

  ondrop() {
    // console.log(222)
  }

  render() {
    const { nodes, views, flowDataDocument } = this.state;
    const { onNodeSelect } = this.props;
    console.log(flowDataDocument)
    return (
      <div className={styles.wrap}>
        {
          flowDataDocument[0].children.map((node, index) => {
            return (
              <Node 
                nodes={nodes}
                views={views}
                key={index} 
                node={node}
                onNodeSelect={onNodeSelect}
              />
            )
          })
        }
      </div>
    )
  }
}

export {
  FlowCanvas,
  FieldForm
}