export default class NodeData {
  constructor(props = {}) {
    this.type = props.type;
    this.uuid = props.uuid;
    this.title = props.title;
    this.description = props.description || '';
    this.view = props.view || 'default';
    this.canDraggable = props.canDraggable || true;
    this.canAfterAdd = props.canAfterAdd || true;
    this.canBeforeAdd = props.canBeforeAdd || true;
    this.disabled = props.disabled || false;
    this.canSelect = props.canSelect || true;
    this.initProps = props.initProps || {};
    this.children = props.children;
    this.nodes = props.nodes || [];
  }
  // getParentNode() {}
  // getNextNode() {}
  // getPreNode() {}
  // setValue(name, value) {
  //   this[name] = value;
  // }
  // getValue(name) {
  //   return this[name];
  // }
  // setPropsValue(name, value) {
  //   this.initProps[name] = value;
  // }
  // getPropsValue(name) {
  //   return this.initProps[name];
  // }
}
