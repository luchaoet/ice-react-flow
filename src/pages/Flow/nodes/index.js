import brower from './brower';
export default [
  ...brower,
  {
    type: 'root',
    name: '流程',
    canDraggable: false,
    canAfterAdd: false,
    canBeforeAdd: false,
    disabled: false,
    canSelect: false,
  },
];
