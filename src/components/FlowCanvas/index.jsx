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
    // this.dragover = this.dragover.bind(this);
    this.onContentMouseMove = this.onContentMouseMove.bind(this);
    const { nodes, flowData, views } = props;
    this.state = {
      nodes,
      views,
      flowData,
      flowDocument: flowData.map(item => new FlowDocument({ flowData: item, nodes, views})),

      areaTop: null,
      areaLeft: null,
      areaWidth: null,
      areaHeight: null,
    }
  }

  componentDidMount() {
    document.addEventListener('dragstart', this.dragstart, true)
    // document.addEventListener('dragover', this.dragover, true)
    window.FlowCanvas = this;
    // window.oncontextmenu = () => false;
  }

  componentWillUnmount() {
    document.removeEventListener('dragstart', this.dragstart, true)
    // document.removeEventListener('dragover', this.dragover, true)
  }

  dragstart(e) {
    const type = e.target.attributes?.nodetype?.value;
    const id = e.target.attributes?.nodeuuid?.value || '';
    localStorage.setItem("nodes", JSON.stringify({type, id}));
    window?.FlowCanvas?.forceUpdate();
  } 

  // dragover(e) {
  //   // const nodes = localStorage.getItem("nodes")
  //   // console.log(e)
  // }

  onContentMouseDown = (e) => {
    // const doc = ReactDOM.findDOMNode(this);
    // doc.addEventListener('mousemove', this.onContentMouseMove, true)
  }

  onContentMouseUp = (e) => {
    // const doc = ReactDOM.findDOMNode(this);
    // doc.removeEventListener('mousemove', this.onContentMouseMove, true)
    // this.setState({
    //   areaTop: null,
    //   areaLeft: null,
    //   areaWidth: null,
    //   areaHeight: null,
    // })
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
      flowDocument,
      areaTop,
      areaLeft,
      areaWidth,
      areaHeight,
    } = this.state;
    const { onNodeSelect } = this.props;
    console.log(flowDocument)
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