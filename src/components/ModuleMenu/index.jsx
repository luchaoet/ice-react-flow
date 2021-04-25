import React from 'react';
import { Collapse } from '@alifd/next';
import styles from './index.module.scss';
import nodes from '@/pages/Flow/nodes'
const Panel = Collapse.Panel;

const modules = [
  { 
    title: '网页', 
    nodes
  }
];

function ModuleMenu() {
  return (
    <div className={styles.container}>
      <Collapse>
        {modules.map((item, index) => {
          return (
            <Panel key={index} title={item.title}>
              {item.nodes.map((node, idx) => {
                return node.canSelect &&(
                  <p className={styles.panelList} key={node.type} nodetype={node.type} draggable="true">
                    {node.title}
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
