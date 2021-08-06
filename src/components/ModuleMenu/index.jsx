import React, { useEffect } from 'react';
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
  useEffect(() => {
    var c=document.getElementById("myCanvas");
    var context=c.getContext("2d");

    context.font = '16px iconfont';
    context.fillStyle = 'red';
    context.fillText(eval('("'+`&#xe603;`.replace('&#x','\\u').replace(';','')+'")'), 10, 20);  
  }, [])

  return (
    <div className={styles.container}>
      <canvas id="myCanvas"></canvas>
      <Collapse>
        {modules.map((item, index) => {
          return (
            <Panel key={index} title={item.title}>
              {item.nodes.map((node, idx) => {
                return node.canSelect &&(
                  <p className={styles.panelList} key={node.type} nodetype={node.type} draggable="true" onDragStart={(e) => {
                    var canvas = document.createElement('canvas');
                    var context = canvas.getContext('2d');

                    // canvas.width = 244;
                    // canvas.height = 84;

                    // context.fillStyle = '#b2b0b0';
                    context.lineJoin = "round";
                    context.lineWidth = 6;

                    context.strokeRect(10, 10, 244, 84);

                    // context.fillStyle = '#999999';
                    // context.font = 'bold 13px Arial';
                    // context.fillText('DRAGGING...', 5, 15);
                    document.body.append(canvas);

                    e.dataTransfer.setDragImage(canvas, 122, 42);
                  }}>
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
