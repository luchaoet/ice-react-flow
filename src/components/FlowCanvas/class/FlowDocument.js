import uuid from '../utils/uuid';
import Node from './Node';

export default class FlowDocument {
  constructor(props = {}) {
    this.id = uuid();
    this.flowData = props.flowData; // 流程数据
    this.selectedNodes = []; // 选中节点
    this.nodes = props.nodes; // 所有的节点
    this.nodeViews = props.nodeViews || {}; // 节点组件
    this.createFlowData(props);
  }
  createFlowData(props) {}
}
