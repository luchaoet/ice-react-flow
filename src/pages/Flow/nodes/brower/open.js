export default {
  type: 'brower_open',
  title: '打开网页',
  canDraggable: true,
  canBeforeAdd: true,
  canAfterAdd: true,
  disabled: false,
  canSelect: true,
  description: '在浏览器中打来一个新的窗口',
  initProps: [
    {
      name: 'url',
      title: '网页地址',
      component: 'Input',
      defaultValue: 'www.baidu.com',
    },
  ],
};
