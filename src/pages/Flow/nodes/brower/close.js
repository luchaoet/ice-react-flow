export default {
  type: 'brower_close',
  title: '关闭网页',
  icon: { type: 'rpashubiaojianpan-keshihua' },
  canDraggable: true,
  canAfterAdd: true,
  canBeforeAdd: true,
  disabled: false,
  canSelect: true,
  description: '在浏览器中关闭网页',
  initProps: [
    {
      name: 'url',
      title: '网页地址',
      component: 'Input',
      defaultValue: 'www.baidu.com',
    },
  ],
};
