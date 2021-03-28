
import React from 'react';
import ReactDOM from 'react-dom';
import { Icon } from '@alifd/next';
import styles from './index.module.scss';

const minStyle = {
	top: '50%',
	left: '50%',
	width: '80%',
	height: '80%',
	transform: 'translate(-50%, -50%)'
}

const maxStyle = {
	width: '100%',
	height: '100%',
	top: 0,
	left: 0
}

export default class MovableDialog extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			// visible: props.visible,
			rect: null,
			// transform: [-50, -50],
			style: minStyle
		}
	}

	mousemove = (e) => {
		// console.log(e)
		const { clientX, clientY } = e;
		const { left, top, width, height } = this.ref.getBoundingClientRect();
		const rect = {
			clientX,
			clientY,
			left,
			top,
			width,
			height
		}
		this.setState((prevState) => {
			const { rect: prevStateRect } = prevState;

			const _top = prevStateRect ? top + clientY - prevStateRect.clientY : top;
			const _left = prevStateRect ? left + clientX - prevStateRect.clientX : left;

			return {
				rect,
				style: {
					width, 
					height, 
					top: _top,// > 0 ? _top : 0,
					left: _left, // > 0 ? _left : 0,
				}
			}
		})
	}

	initPosition = () => {
		const { left, top, width, height } = this.ref.getBoundingClientRect();
		// const { width, height } = this.state;
		// console.log(this.state)
		this.setState({ 
			style: {
				width,
				height,
				top, 
				left 
			}
		})
	}

	onMouseDown = (e) => {
		this.initPosition()
		document.addEventListener('mousemove', this.mousemove);
	}

	onMouseUp = () => {
		this.setState({rect: null})
		document.removeEventListener('mousemove', this.mousemove);
	}

	onMouseOut = () => {
		// this.onMouseUp()
	}

	zoomIn = () => {
		this.setState({style: minStyle})
	}

	zoomOut = () => {
		this.setState({style: maxStyle})
	}

	componentDidMount() {
		// console.log(1, this.refs)
	}
	
	componentDidUpdate() {
		
	}

	// componentWillReceiveProps(nextProps) {
	// 	const { visible } = nextProps;
	// 	const _style = visible ? {
	// 		style: minStyle
	// 	} : {}
	// 	this.setState({
	// 		visible,
	// 		..._style
	// 	})
	// }
		
	render() {
		const { visible, dataSource } = this.props;
		const { style } = this.state;

		return visible && (
			<div className={styles.wrap} ref={v => this.ref = v} style={style}>
				<div 
					className={styles.header} 
					onMouseDown={this.onMouseDown} 
					onMouseUp={this.onMouseUp} 
					onMouseOut={this.onMouseOut}
				>
					<div className={styles.title}>{'2222'}</div>
					<div className={styles.icon} onMouseDown={e => e.stopPropagation()}>
						<Icon type="minus" onClick={this.zoomIn}/>
						<Icon type="add" onClick={this.zoomOut} />
						<Icon type="close" onClick={this.props.onClose}/>
					</div>
				</div>
				<div className={styles.body}>
					{
						dataSource.map((item, index) => {
							return (
								<iframe className={styles.iframe} src={item} key={index} />
							)
						})
					}
				</div>
			</div>
		);
	}
}