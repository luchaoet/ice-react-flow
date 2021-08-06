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
const canSelectNodes = nodes.filter(item => item.canSelect)

export default class CreateOverlay extends React.Component {
	constructor(props){
		super(props);
		this.state= {
			dataSource: props.dataSource,
			nodes: canSelectNodes
		}
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		this.setState({
			dataSource: nextProps.dataSource,
			nodes: canSelectNodes
		})
	}

	onChange = (value) => {
		let nodes = canSelectNodes;
		if(value) {
			nodes = canSelectNodes.filter(item => item.description.indexOf(value) >= 0 || item.title.indexOf(value) >= 0)
		}
		this.setState({nodes})
	}
	
  render() {
		const { dataSource, nodes } = this.state;
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
					<Input 
						style={{width: '100%'}} 
						hasClear
						innerBefore={<Icon type="search" size="xs" style={{margin: 4}}/>} 
						onChange={this.onChange} 
						autoFocus
					/>
					{
						0 in nodes
						? (
							<ul className={styles.itemWrap}>
								{
									nodes.map((item, index) => {
										return (
											<li 
												key={index} 
												className={styles.item}
												onClick={()=> {
													dataSource?.preNode?.after({type: item.type})
													onRequestClose()
												}}
											>
												<div>
													<RpaIcon type={item.icon.type} size="xxxs" />
												</div>
												<p>{item.title}</p>
												<span>{item.description}</span>
											</li>
										)
									})
								}
							</ul>
						)
						: (
							<div className={styles.empty}>
								<img src="data:image/png;base64,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" alt=""/>
							</div>
						)
					}
				</div>
			</Overlay>
    )
  }
}