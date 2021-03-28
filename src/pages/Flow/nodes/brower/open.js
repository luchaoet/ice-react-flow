export default {
  type: 'brower_open',
  name: '打开网页',
  canDraggable: true,
  canBeforeAdd: true,
  canAfterAdd: true,
  disabled: false,
  canSelect: true,
  initProps: {
    name: 'url',
    title: '网页地址',
    component: 'Input',
    defaultValue: 'www.baidu.com',
  },
};
