import React from 'react';
import AddLine from '../AddLine'
import cx from 'classnames'
import styles from './index.module.scss'
import DefaultNodeView from '../NodeViews/default'
import { Consumer } from "../../utils/context";
import ClickOutside from '../../libs/ClickOutside'
import Template from '../Template'

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
		const {views, node } = this.props;
		const { view, title, description, errors, children } = node;
		const nvs = {
			..._nodeViews,
			...views
		}
		const Com = typeof view === 'function' ? view : nvs[view || 'default'];
		return <Com title={title} description={description} errors={errors} children={children} />
	}

	get handleProps() {
		const { type, nodes, node } = this.props;
		const defaultProps = nodes.find(node => node.type === type) || {};
		return {
			...defaultProps,
			...this.props
		}
	}

	onClickOutside = () => {
		const { node } = this.props;
		node.setAttributes({selected: false})
	}

	onNodeClick = () => {
		const {node, onNodeSelect} = this.props;
		const { disabled, canSelect }= node;
		if(!disabled && canSelect) {
			node.onNodeSelect(); 
			onNodeSelect(node);
			const id = node.getId();
			document.getElementById(id).scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
		}
	}

	onDragstart = (e) => {
		const type = e.target.attributes?.nodetype?.value;
		const id = e.target.attributes?.nodeuuid?.value;
		localStorage.setItem("nodes", JSON.stringify({type, id}));
		window?.FlowCanvas?.forceUpdate();
	}
  
  render() {
	  const { node } = this.props;
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
				<Template show={canBeforeAdd} tag={AddLine} preNode={preNode} nextNode={node} />
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
					onDragStart={e => this.onDragstart(e)}
				>
					{this.renderNodeView()}
				</ClickOutside>
				<Template show={canAfterAdd && !nextNodeCanBeforeAdd} tag={AddLine} preNode={node} nextNode={nextNode} />
			</React.Fragment>
    )
  }
}