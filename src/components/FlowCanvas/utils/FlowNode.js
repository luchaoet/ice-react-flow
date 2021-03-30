import uuid from './uuid';
export default class FlowNode {
  constructor(props = {}) {
    this.type = props.type;
    this.id = props.id || uuid();
    this.title = props.title + this.id;
    this.description = props.description + this.id;
    this.view = props.view || 'default';
    this.canDraggable = props.canDraggable || true;
    this.canAfterAdd = props.canAfterAdd || true;
    this.canBeforeAdd = props.canBeforeAdd || true;
    this.disabled = props.disabled || false;
    this.canSelect = props.canSelect || true;
    this.nodes = props.nodes || [];
    this.selected = props.selected || false;
    this.initProps = props.initProps || [];
    this.values = null;
    this.errors = null;
    this.expand = props.expand;
    this.parent = props.parent;
    this.children = null;
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
  after(type) {
    const node = new FlowNode({
      type,
      title: 'after测试',
      description: 'after测试',
      parent: this.parent,
    });
    const index = this.getIndex();
    const children = this.getParentNode()?.getChildren() || [];
    children.splice(index + 1, 0, node);
    this.children = children;
    window?.FlowCanvas?.forceUpdate();
  }
  // 在当前节点之前插入节点
  before(type) {
    const node = new FlowNode({
      type,
      title: 'before测试',
      description: 'before测试',
      parent: this.parent,
    });
    const index = this.getIndex();
    const children = this.getParentNode()?.getChildren() || [];
    index <= 0 ? children.unshift(node) : children.splice(index, 0, node);
    this.children = children;
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
}
