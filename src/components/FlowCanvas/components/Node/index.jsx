import React from 'react';
import AddLine from '../AddLine'
import cx from 'classnames'
import DefaultNodeView from '../NodeViews/default'
import BranchNodeView from '../NodeViews/branch'
// import { Consumer } from "../../utils/context";
import ClickOutside from '../../libs/ClickOutside'
import Template from '../Template'
import styles from './index.module.scss'

const _nodeViews = {
	default: DefaultNodeView,
	branch: BranchNodeView
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
		const {views, node } = this.props;
		const { view, title, description, errors, children, icon } = node;
		const nvs = {
			..._nodeViews,
			...views
		}
		const Com = typeof view === 'function' ? view : nvs[view || 'default'];
		return <Com title={title} description={description} errors={errors} children={children} icon={icon} />
	}

	get handleProps() {
		const { type, nodes, node } = this.props;
		const defaultProps = nodes.find(node => node.type === type) || {};
		return {
			...defaultProps,
			...this.props
		}
	}

	onClickOutside = (e) => {
		const { shiftKey } = e;
		if(shiftKey)return;
		const { node } = this.props;
		node.setAttributes({selected: false})
	}

	onNodeClick = (e) => {
		const { shiftKey } = e;
		const {node, onNodeSelect} = this.props;
		const { disabled, canSelect }= node;
		// if(e.shiftKey) {
		// 	node.onNodeSelect(); 
		// }else{
		// 	// node.onNodeSelect();
		// }
		if(!disabled && canSelect) {
			node.onNodeSelect(); 
			onNodeSelect(node);
			const id = node.getId();
			document.getElementById(id).scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
		}
	}
  
  render() {
		const { node, onCreateOverlay } = this.props;
		const { type, id, disabled, canBeforeAdd, canAfterAdd, canDraggable, canSelect, selected } = node;
		const className = cx(
			styles.node_wrap, 
			{
				[styles.selected]: !!selected,
				[styles.disabled]: disabled
			}
		)
		const nextNode = node.getNextNode();
		const preNode = node.getPreNode();
		const nextNodeCanBeforeAdd = nextNode?.getValue('canBeforeAdd');
		
    return (
			<React.Fragment>
				<Template show={canBeforeAdd} component={AddLine} preNode={preNode} nextNode={node} onCreateOverlay={onCreateOverlay} />
				<ClickOutside 
					tag='div'
					className={className}
					onClick={this.onNodeClick}
					id={id}
					nodetype={type}
					nodeuuid={id}
					selected={selected}
					draggable={canDraggable}
					onClickOutside={this.onClickOutside}
					// onDragStart={e => this.onDragstart(e)} // 放到全局监听
				>
					{this.renderNodeView()}
				</ClickOutside>
				<Template show={canAfterAdd && !nextNodeCanBeforeAdd} component={AddLine} preNode={node} nextNode={nextNode} onCreateOverlay={onCreateOverlay} />
			</React.Fragment>
    )
  }
}