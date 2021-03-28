import React from 'react';
import { Collapse } from '@alifd/next';
import styles from './index.module.scss';
// import modules from '@/nodes';

const Panel = Collapse.Panel;
// console.log('all modules => ', modules);

const modules = [{ name: '测试', nodes: [{ name: 'a', type: 'test' }] }];

function ModuleMenu() {
  return (
    <div className={styles.container}>
      <Collapse>
        {modules.map((item, index) => {
          return (
            <Panel key={index} title={item.name}>
              {item.nodes.map((node, idx) => {
                return (
                  <p className={styles.panelList} key={node.type} nodetype={node.type} draggable="true">
                    {node.name}
                  </p>
                );
              })}
            </Panel>
          );
        })}
      </Collapse>
    </div>
  );
}

export default ModuleMenu;
