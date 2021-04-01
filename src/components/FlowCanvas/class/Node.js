import uuid from '../utils/uuid';

export default class Node {
  constructor(props = {}) {
    this.type = props.type;
    this.id = uuid();
    this.title = props.title;
    this.description = props.description;
    this.view = props.view || 'default';
    this.canDraggable = props.canDraggable || true;
    this.canAfterAdd = props.canAfterAdd || true;
    this.canBeforeAdd = props.canBeforeAdd || true;
    this.disabled = props.disabled || false;
    this.canSelect = props.canSelect || true;
    this.nodes = props.nodes || [];
    this.selected = props.selected || false;
    this.initProps = props.initProps || [];
    this.values = props.values;
    this.errors = props.errors;
    this.expand = props.expand;
    this.parent = props.parent;
    this.children = props.children;
    this.createChildren(props);
  }

  // 处理子节点
  createChildren(props) {
    const children = props.children;
    if (children) {
      const _children = [];
      for (const item of children) {
        _children.push(new FlowNode({ ...item, parent: this }));
      }
      this.children = _children;
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
    const type = nodes.nodeType;
    const id = nodes.nodeUuid;

    const root = this.getRoot();
    const _children = root.getChildren();
    const moveNode = _children.find((item) => item.id === id);
    if (!moveNode) return;
    const node = new FlowNode({
      ...moveNode,
      id: uuid(),
    });
    const index = this.getIndex();
    const children = this.getParentNode()?.getChildren() || [];
    children.splice(index + 1, 0, node);
    this.getParentNode().setAttributes({ children });
    this.forceUpdate();
  }
  // 在当前节点之前插入节点
  before(nodes) {
    const type = nodes.nodeType;
    const id = nodes.nodeUuid;

    const root = this.getRoot();
    const _children = root.getChildren();
    const moveNode = _children.find((item) => item.id === id);
    if (!moveNode) return;
    const node = new FlowNode({
      ...moveNode,
      id: uuid(),
    });
    const index = this.getIndex();
    const children = this.getParentNode()?.getChildren() || [];
    index <= 0 ? children.unshift(node) : children.splice(index, 0, node);
    this.getParentNode().setAttributes({ children });
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
    while (parent.getType() !== 'root') {
      parent = parent.getParentNode();
    }
    return parent;
  }
}
