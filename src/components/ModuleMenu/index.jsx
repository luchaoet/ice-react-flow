import React from 'react';
import { Collapse } from '@alifd/next';
import styles from './index.module.scss';
const Panel = Collapse.Panel;

const modules = [{ name: '网页', nodes: [{ name: '打开网页', type: 'brower_open' }] }];

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
