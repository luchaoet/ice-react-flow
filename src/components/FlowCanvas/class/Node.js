import uuid from '../utils/uuid';
import { Message } from '@alifd/next';

export default class Node {
  constructor(props = {}) {
    const _props = this.handleProps(props);
    this.id = uuid();
    this.type = _props.type;
    this.title = _props.title;
    this.description = _props.description;
    this.view = _props.view || 'default';
    this.canDraggable = _props.canDraggable ?? true;
    this.canAfterAdd = _props.canAfterAdd ?? true;
    this.canBeforeAdd = _props.canBeforeAdd ?? true;
    this.disabled = _props.disabled ?? false;
    this.canSelect = _props.canSelect ?? true;
    this.nodes = _props.nodes || [];
    this.selected = _props.selected ?? false;
    this.initProps = _props.initProps || [];
    this.values = _props.values;
    this.errors = _props.errors;
    this.expand = _props.expand;
    this.parent = _props.parent;
    this.children = this.createChildren(_props.children);
  }
  handleProps(props) {
    const nodes = props.parent.getRoot().nodes;
    const _props = nodes.find((v) => v.type === props.type) || {};
    return { ...props, ..._props };
  }
  getDefaultNodeProps(type) {
    const nodes = this.getRoot().nodes;
    return nodes.find((v) => v.type === type);
  }
  // 处理子节点
  createChildren(children) {
    if (children) {
      const _children = [];
      for (const item of children) {
        _children.push(new Node({ ...item, parent: this }));
      }
      return _children;
    } else {
      return null;
    }
  }

  createInitProps() {
    const initProps = this.initProps || [];
    const values = this.values;
    if (values) {
      for (const item of initProps) {
        const name = item.name;
        if (name in values) {
          item.defaultValue = values[name];
        }
      }
      this.initProps = initProps;
    }
  }
  getParentNode() {
    return this.parent;
  }
  getChildren() {
    return this.children;
  }
  getNextNode() {
    const index = this.getIndex();
    const children = this.getParentNode()?.getChildren() || [];
    return children[index + 1];
  }
  getPreNode() {
    const index = this.getIndex();
    const children = this.getParentNode()?.getChildren() || [];
    return children[index - 1];
  }
  getPropsValue(name) {
    return this.initProps[name];
  }
  getIndex() {
    const children = this.getParentNode()?.getChildren() || [];
    return children.indexOf(this);
  }
  getId() {
    return this.id;
  }
  getType() {
    return this.type;
  }
  getValue(name) {
    return this[name];
  }
  getValues() {
    return this.values;
  }
  setAttributes(obj) {
    for (const key in obj) {
      this[key] = obj[key];
    }
    this.forceUpdate();
  }
  setPropsValue(name, value) {
    this.initProps[name] = value;
  }
  setValues(values) {
    this.values = values;
  }
  setErrors(errors) {
    this.errors = errors;
  }
  // 当前节点被选中
  onNodeSelect() {
    this.selected = true;
    this.forceUpdate();
  }
  // 在当前节点之后插入节点
  after(nodes) {
    const type = nodes.type;
    const nodeUuid = nodes.id;
    let node = null;
    const id = uuid();
    const parent = this.getParentNode();
    if (nodeUuid) {
      const _children = this.getRoot().getChildren();
      const moveNode = _children.find((item) => item.id === nodeUuid);
      node = new Node({ ...moveNode, id, parent });
      moveNode.remove();
      console.log(`Node moved successfully, id: ${id}`);
    } else {
      const _nodes = this.getRoot().getNodes();
      const _node = _nodes.find((item) => item.type === type);
      node = new Node({ ..._node, id, parent });
      console.log(`Node added successfully, id: ${id}`);
    }
    const index = this.getIndex();
    const children = parent?.getChildren() || [];
    children.splice(index + 1, 0, node);
    parent.setAttributes({ children });
    this.forceUpdate();
  }
  // 在当前节点之前插入节点
  before(nodes) {
    const type = nodes.type;
    const nodeUuid = nodes.id;
    let node = null;
    const id = uuid();
    const parent = this.getParentNode();
    if (nodeUuid) {
      const _children = this.getRoot().getChildren();
      const moveNode = _children.find((item) => item.id === nodeUuid);
      node = new Node({ ...moveNode, id, parent });
      moveNode.remove();
      console.log(`Node moved successfully, id: ${id}`);
    } else {
      const _nodes = this.getRoot().getNodes();
      const _node = _nodes.find((item) => item.type === type);
      node = new Node({ ..._node, id, parent });
      console.log(`Node added successfully, id: ${id}`);
    }
    const index = this.getIndex();
    const children = parent?.getChildren() || [];
    index <= 0 ? children.unshift(node) : children.splice(index, 0, node);
    parent.setAttributes({ children });
    this.forceUpdate();
  }
  // 删除当前节点
  remove() {
    const index = this.getIndex();
    const children = this.getParentNode()?.getChildren() || [];
    children.splice(index, 1);
    this.getParentNode().setAttributes({ children });
    this.forceUpdate();
  }
  forceUpdate() {
    window?.FlowCanvas?.forceUpdate();
  }
  getRoot() {
    let parent = this.getParentNode();
    while (parent && parent.getType() !== 'root') {
      parent = parent.getParentNode();
    }
    return parent;
  }
}
