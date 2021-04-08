import React from 'react';
import ReactDOM from 'react-dom';
import Node from "./components/Node";
import styles from './index.module.scss'
import FlowNode from './utils/FlowNode'
// import { Provider } from './utils/context'
import createFlowNode from './utils/createFlowNode'
import FieldForm from './components/FieldForm'
import FlowDocument from './class/FlowDocument'
import Template from './components/Template';

class FlowCanvas extends React.Component {
	constructor(props){
		super(props);
    this.dragstart = this.dragstart.bind(this);
    this.onContentMouseMove = this.onContentMouseMove.bind(this);
    const { nodes, flowData, views } = props;
    this.state = {
      nodes,
      views,
      flowData,
      flowDataDocument: createFlowNode(props.flowData),
      flowDocument: flowData.map(item => new FlowDocument({ flowData: item, nodes, views})),

      areaTop: null,
      areaLeft: null,
      areaWidth: null,
      areaHeight: null,
    }
  }

  componentDidMount() {
    document.addEventListener('dragstart', this.dragstart, true)
    window.FlowCanvas = this;
    window.oncontextmenu = () => false;
  }

  componentWillUnmount() {
    document.removeEventListener('dragstart', this.dragstart, true)
  }

  dragstart(e) {
    const nodeType = e.target.attributes?.nodetype?.value;
    const nodeUuid = e.target.attributes?.nodeuuid?.value || '';
    e.dataTransfer.setData("nodes", JSON.stringify({nodeType, nodeUuid}));
  } 

  onContentMouseDown = (e) => {
    const doc = ReactDOM.findDOMNode(this);
    doc.addEventListener('mousemove', this.onContentMouseMove, true)
  }

  onContentMouseUp = (e) => {
    const doc = ReactDOM.findDOMNode(this);
    doc.removeEventListener('mousemove', this.onContentMouseMove, true)
    this.setState({
      areaTop: null,
      areaLeft: null,
      areaWidth: null,
      areaHeight: null,
    })
  }

  onContentMouseMove(e) {
    const { areaTop, areaLeft } = this.state;
    const { offsetX, offsetY } = e || window.event || {};
    // console.log(e)
    if(areaTop && areaLeft) {
      this.setState({
        areaWidth: offsetX - areaTop,
        areaHeight: offsetY - areaLeft
      })
    }else{
      this.setState({
        areaTop: offsetY,
        areaLeft: offsetX
      })
    }
  }

  render() {
    const { 
      nodes, 
      views, 
      flowDataDocument, 
      flowDocument,
      areaTop,
      areaLeft,
      areaWidth,
      areaHeight,
    } = this.state;
    const { onNodeSelect } = this.props;
    console.log('areaTop', areaTop, areaLeft)
    return (
      <div className={styles.wrap}>
        <div 
          className={styles.content} 
          onMouseDown={this.onContentMouseDown} 
          onMouseUp={this.onContentMouseUp}
        >
          {
            flowDocument[0].children.map((node, index) => {
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
          <Template 
            tag='p' 
            show={areaTop && areaLeft} 
            className={styles.area} 
            style={{
              top: areaTop, 
              left: areaLeft,
              width: areaWidth,
              height: areaHeight
            }} 
          />
        </div>
      </div>
    )
  }
}

export {
  FlowCanvas,
  FieldForm
}