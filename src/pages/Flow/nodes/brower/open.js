export default {
  type: 'brower_open',
  title: '打开网页',
  icon: { type: 'rpaliulanqi-keshihua' },
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
      validator: (field) => {
        const value = field.getValue('url');
        return new Promise((resolve, reject) => {
          if (!value) {
            reject([new Error(`值不可为空`)]);
          } else {
            resolve(value);
          }
        });
      },
    },
  ],
};
