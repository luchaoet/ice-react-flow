import React from 'react';
import { type } from '@/utils';

function IfElse({ if: _if, children }) {
  // 只有一个子节点 转成数组统一处理
  if (type(children) === 'object') {
    children = [children];
  }

  let ifDom = null;
  let elseDom = null;
  // 处理数组中的元素
  for (const child of children) {
    const childType = child.type;
    const _type = type(childType);
    const name = childType.name;
    // 子节点是Else函数定义的节点，则为else条件下显示的dom内容
    // 子节点是If函数定义的节点，或者其他普通节点（type若为标签名称，说明此时IfElse下只有一个节点）均为if条件下显示的dom内容
    if (_type === 'function' && name === 'Else') {
      elseDom = child;
    } else {
      ifDom = child;
    }
  }

  return _if ? ifDom : elseDom;
}

function If({ children }) {
  return children;
}

function Else({ children }) {
  return children;
}

export default IfElse;
export { If, Else };
