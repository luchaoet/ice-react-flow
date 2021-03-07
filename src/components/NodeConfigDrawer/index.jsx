import React from 'react';
import styles from './index.module.scss';
import { Drawer, Button, Message } from '@alifd/next';

const NodeConfigDrawer = (props) => {
  const { visible, currentNode, onClose } = props;
  const { name, Drawer: NodeDrawer, initProps = {} } = currentNode;

  function fieldValidate(error, data) {
    console.log('NodeConfigDrawer', error, data);
    if (error) {
      Message.error('请填写完整信息');
    }
  }

  return (
    <Drawer
      title={name}
      placement="right"
      width={400}
      visible={visible && !!NodeDrawer}
      onClose={() => onClose && onClose()}
    >
      <NodeDrawer
        initProps={initProps}
        fieldValidate={(error, data) => fieldValidate(error, data)}
      />
    </Drawer>
  );
};

export default NodeConfigDrawer;
