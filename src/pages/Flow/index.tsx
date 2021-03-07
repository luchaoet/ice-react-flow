import React from 'react';
// import styles from './index.module.scss';
import ModuleMenu from '@/components/ModuleMenu';
import Overlay from '@/components/Overlay';
import Canvas from '@/components/Canvas';
import ComponentInput from '@/components/ComponentInput/index';
// import NodeConfigDrawer from '@/components/NodeConfigDrawer';
import RpaIcon from '@/components/RpaIcon';

// import modules from '@/nodes';

// const _currentNode = null; //modules[0].nodes[0];

function Flow() {
  // const [visible, setVisible] = useState(true);
  // const [currentNode, setCurrentNode] = useState(_currentNode);

  const value = `from rpa4 import time
  
def start()
  print(11)
  `

  return (
    <>
      <ModuleMenu />
      <Canvas value={value} />
      {/* <NodeConfigDrawer
        currentNode={currentNode}
        visible={visible}
        onClose={() => setVisible(false)}
      /> */}

      {/* <div>
        <RpaIcon type="iconkongjian-keshihua1" size="xxs" />
      </div>

      <div style={{ height: 500 }}>test</div>

      <Overlay />

      <div style={{ height: 500 }}>test</div>

      <ComponentInput /> */}
    </>
  );
}

export default Flow;