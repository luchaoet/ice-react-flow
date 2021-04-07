import uuid from '../utils/uuid';
import Node from './Node';

export default class FlowDocument {
  constructor(props = {}) {
    this.id = props.flowData.id || uuid();
    this.type = props.flowData.type;
    this.title = props.flowData.title;
    this.nodes = props.nodes; // 所有的节点
    this.views = props.flowData.views || {}; // 节点组件
    this.children = this.createChildren(props.flowData.children);
  }
  createChildren(children) {
    return children.map((item) => new Node({ ...item, parent: this }));
  }
  getId() {
    return this.id;
  }
  getType() {
    return this.type;
  }
  getNodes() {
    return this.nodes;
  }
  getViews() {
    return this.views;
  }
  getChildren() {
    return this.children;
  }
  setAttributes(obj) {
    for (const key in obj) {
      this[key] = obj[key];
    }
    this.forceUpdate();
  }
  forceUpdate() {
    window?.FlowCanvas?.forceUpdate();
  }
}
