import React from 'react';
import { Button, Overlay, Input, Icon } from '@alifd/next';
import styles from './index.module.scss';
import cx from 'classnames'
import nodes from '@/pages/Flow/nodes'
import RpaIcon from '@/components/FlowCanvas/components/Icon';

const defaultValue = {
  target: null,
  align: 'tc',
  preNode: null, 
  nextNode: null
}
const canSelectNodes = nodes.filter(v => v.canSelect)

export default class CreateOverlay extends React.Component {
	constructor(props){
		super(props);
		this.state= {
			dataSource: props.dataSource
		}
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		this.setState({dataSource: nextProps.dataSource})
	}

	
	
  render() {
		const { dataSource } = this.state;
		const { onRequestClose } = this.props;
		const overlayContentClass = cx(
      styles.overlay, 
      {
        [styles.isTop]: dataSource.align === 'bc'
      }
		)

    return (
			<Overlay 
				container='FlowCanvas--content'
				align="tc bc" 
				shouldUpdatePosition 
				safeNode={dataSource.target}
				visible={!!dataSource.target}
				target={dataSource.target}
				onRequestClose={onRequestClose}
				onPosition={config => {
					const align = config.align[0];
					dataSource.align !== align && 
					this.setState({
						dataSource: {
						...dataSource,
						align
					}
				})}}
			>
				<div className={overlayContentClass}>
					<Input style={{width: '100%'}} innerAfter={<Icon type="search" size="xs" onClick={this.onClick} style={{margin: 4}}/>} />
					<div className={styles.itemWrap}>
						{
							canSelectNodes.map((item, index) => {
								return (
									<div 
										key={index} 
										className={styles.item}
										onClick={()=> {
											dataSource?.preNode?.after({type: item.type})
											onRequestClose()
										}}
									>
										<RpaIcon type={item.icon.type} size="xxxs" />
										<p>{item.title}</p>
										<span>{item.description}</span>
									</div>
								)
							})
						}
					</div>
				</div>
			</Overlay>
    )
  }
}