import React from 'react';
import styles from './index.module.scss';
import { FlowCanvas, FieldForm } from '@/components/FlowCanvas';
import ModuleMenu from '@/components/ModuleMenu';
import nodes from './nodes'
import NodeView from '@/components/FlowCanvas/components/Node'
import { Drawer } from '@alifd/next';

import CreateOverlay from './components/CreateOverlay'

const views = {
  common: NodeView
}

const _flowData = [
  {
    id: null,
    type: 'root',
    title:'流程1',
    children: [
      {
        id: null,
        type: 'startNode',
        title: '开始',
        description: '流程从此开始'
      },
      {
        id: null,
        type: "brower_open",
        title: '打开浏览器1',
        description: '在浏览器中打来一个新的窗口',
        initProps: [
          {
            name: 'url',
            label: '网页地址',
            required: true,
            component: 'Input',
            defaultValue: '',
            pattern: /^\d+$/
          },
          {
            name: 'way',
            label: '打开方式',
            component: 'Select',
            defaultValue: 'newWindow',
            dataSource:[
              {label: '当前窗口', value: 'currentWindow'},
              {label: '新窗口', value: 'newWindow'}
            ]
          }
        ],
      },
      {
        id: null,
        type: "brower_open5",
        title: '条件分支',
        description: '条件分支',
        initProps: [
          {
            name: 'url',
            label: '网页地址',
            required: true,
            component: 'Input',
            defaultValue: 'www.baidu.com',
            pattern: /^\d+$/
          },
          {
            name: 'way',
            label: '打开方式',
            component: 'Select',
            defaultValue: 'newWindow',
            dataSource:[{label: '当前窗口', value: 'currentWindow'},{label: '新窗口', value: 'newWindow'}]
          }
        ],
      },
      {
        type: 'endNode',
        title: '结束',
        description: '流程结束',
      }
    ]
  }
]
const defaultCreateOverlay = {
  target: null,
  align: 'tc',
  preNode: null, 
  nextNode: null
}

export default class Flow extends React.Component {
	constructor(props){
    super(props);
    this.state = {
      selectedNode: null,
      createOverlay: defaultCreateOverlay
    }
  }

  onRequestClose = () => {
    this.setState({createOverlay: defaultCreateOverlay})
  }
  
  render() {
    const { selectedNode, createOverlay } = this.state;
    
    return (
      <div className={styles.wrap}>
        <ModuleMenu />
        <FlowCanvas 
          nodes={nodes} 
          views={views}
          nodeViews={views}
          flowData={_flowData}
          onNodeSelect={node => this.setState({selectedNode: node})}
          onCreateOverlay={v => this.setState({
            createOverlay: {
              ...createOverlay,
              target: v.target,
              preNode: v.preNode,
              nextNode: v.nextNode,
            }
          })}
        />
        <Drawer 
          width={380}
          title={selectedNode?.title}
          visible={!!selectedNode}
          onClose={() => this.setState({selectedNode: null})}
        >
          <FieldForm 
            footer={false}
            node={selectedNode}
            onSubmit={(v,e)=> console.log(v, e)}
          />
        </Drawer>

        <CreateOverlay onRequestClose={this.onRequestClose} dataSource={createOverlay} />
      </div>
    )
  }
}