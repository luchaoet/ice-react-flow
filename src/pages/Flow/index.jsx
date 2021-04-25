import React from 'react';
import styles from './index.module.scss';
import { FlowCanvas, FieldForm } from '@/components/FlowCanvas';
import ModuleMenu from '@/components/ModuleMenu';
import nodes from './nodes'
import NodeView from '@/components/FlowCanvas/components/Node'
import { Drawer, Overlay } from '@alifd/next';
import cx from 'classnames'

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
        type: "brower_open",
        title: '打开浏览器2',
        description: '在浏览器中打来一个新的窗口',
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

export default class Flow extends React.Component {
	constructor(props){
    super(props);
    this.state = {
      selectedNode: null,
      createOverlay: {
        currentTarget: null,
        align: 'tc'
      }
    }
  }
  
  render() {
    const { selectedNode, createOverlay } = this.state;
    const overlayContentClass = cx(
      styles.overlay, 
      {
        [styles.isTop]: createOverlay.align === 'bc'
      }
    )
    return (
      <div className={styles.wrap}>
        <ModuleMenu />
        <FlowCanvas 
          nodes={nodes} 
          views={views}
          nodeViews={views}
          flowData={_flowData}
          onNodeSelect={node => this.setState({selectedNode: node})}
          onCreateOverlay={target => this.setState({
            createOverlay: {
              ...createOverlay,
              currentTarget: target
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
            footer={{
              align: 'right'
            }}
            node={selectedNode}
            onSubmit={(v,e)=> console.log(v, e)}
          />
        </Drawer>
        <Overlay 
          container='FlowCanvas--content'
          align="tc bc" 
          shouldUpdatePosition 
          safeNode={createOverlay.currentTarget}
          visible={!!createOverlay.currentTarget}
          target={createOverlay.currentTarget}
          onRequestClose={() => this.setState({
            createOverlay: {
              ...createOverlay,
              currentTarget: null,
              align: null
            }
          })}
          onPosition={config => {
            const align = config.align[0];
            createOverlay.align !== align && 
            this.setState({
            createOverlay: {
              ...createOverlay,
              align
            }
          })}}
        >
          <div className={overlayContentClass}>{createOverlay.align}</div>
        </Overlay>
      </div>
    )
  }
}