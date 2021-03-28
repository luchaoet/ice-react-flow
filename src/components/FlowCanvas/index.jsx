import React from 'react';
import Node from "./components/Node";
import styles from './index.module.scss'
import NodeGenerate from './utils/NodeGenerate'
import { Provider } from './utils/context'

export default class FlowCanvas extends React.Component {
  NodeGenerateCopy = null
	constructor(props){
		super(props);
    this.dragstart = this.dragstart.bind(this)
    this.ondrag = this.ondrag.bind(this)
    this.ondrop = this.ondrop.bind(this)
    this.state = {
      nodes: props.nodes,
      views: props.views,
      flowData: [
        {
          uuid: 'ee312-123qe-q2wqwd-213qwe-qwe23-sdsa',
          type: 'root',
          title:'流程1',
          children: [
            {
              uuid: 'eqw12-123qe-qweqwd-213qwe-qwe23-sdsa',
              type: "brower_open",
              title: '打开浏览器',
              description: '在浏览器中打来一个新的窗口',
              initProps: {},
            },
            {
              uuid: 'eqw12-123qe-qweqwd-213qwe-qwe23-swsa',
              type: "brower_open",
              title: '打开浏览器',
              description: '在浏览器中打来一个新的窗口',
              initProps: {},
            }
          ]
        }
      ],
      selectedNodes: []
    }
  }

  componentDidMount() {
    document.addEventListener('dragstart', this.dragstart, true)
    // document.addEventListener('ondrag', this.ondrag, true)
    // document.addEventListener('ondrop', this.ondrop, true)
    
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

  onNodeClick = (node) => {
    this.setState({
      selectedNodes: [node]
    })
  }

  get handleFlowData() {
    const { flowData, nodes } = this.state;





    // console.log(flowData)
    return this.state.flowData;
  }
  
  render() {
    const { nodes, views, selectedNodes } = this.state;
    const _flowData = this.handleFlowData;
    return (
      <div className={styles.wrap}>
        {
          _flowData[0].children.map((node, index) => {
            return (
              <Node 
                nodes={nodes}
                views={views}
                key={index} 
                selectedNodes={selectedNodes} 
                onNodeClick={this.onNodeClick}
                {...node}
              />
            )
          })
        }
      </div>
    )
  }
}