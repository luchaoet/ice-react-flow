import React from 'react';
import AddLine from '../AddLine'
import cx from 'classnames'
import styles from './index.module.scss'
import DefaultNodeView from '../NodeViews/default'
import { Consumer } from "../../utils/context";

const nodesTemp = {}
const _nodeViews = {
	default: DefaultNodeView
}

export default class Node extends React.Component {
	constructor(props){
		super(props);
		this.state= {
			selected: false
		}
	}
	
	handleClick = () => {
		this.setState({selected: true})
	}

	renderNodeView = () => {
		const {views, view, title, description} = this.props;
		const nvs = {
			..._nodeViews,
			...views
		}
		const Com = typeof view === 'function' ? view : nvs[view || 'default'];
		return <Com title={title} description={description} />
	}

	get handleProps() {
		const { type, nodes } = this.props;
		const defaultProps = nodes.find(node => node.type === type) || {};
		return {
			...defaultProps,
			...this.props
		}
	}
  
  render() {
		const { type, uuid, disabled, selectedNodes, canBeforeAdd, canAfterAdd, canDraggable, canSelect, onNodeClick } = this.handleProps;

		const selected = selectedNodes.find(item => item.uuid === uuid);
		const className = cx(
			styles.node_wrap, 
			{
				[styles.selected]: !!selected,
				[styles.disabled]: disabled
			}
		)
		
    return (
			<React.Fragment>
				{canBeforeAdd && <AddLine />}
				<div 
					className={className}
					onClick={() => !disabled && canSelect && onNodeClick({ ...this.props, selected })}
					type={type}
					uuid={uuid}
					draggable={canDraggable}
				>
					{this.renderNodeView()}
				</div>
				{canAfterAdd && <AddLine />}
			</React.Fragment>
    )
  }
}