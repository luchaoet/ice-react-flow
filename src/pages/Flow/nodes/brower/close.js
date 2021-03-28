export default {
  type: 'brower_close',
  name: '关闭网页',
  view: 'NodeView',
  canDraggable: true,
  canAfterAdd: true,
  canBeforeAdd: true,
  disabled: false,
  canSelect: true,
  initProps: {
    name: 'url',
    title: '网页地址',
    component: 'Input',
    defaultValue: 'www.baidu.com',
  },
};
