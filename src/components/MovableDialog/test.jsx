
import React from 'react';
import ReactDOM from 'react-dom';
import { Icon } from '@alifd/next';
import styles from './test.module.scss';


export default class MovableDialog extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			
		}
	}

	render() {
		const { visible, dataSource, onClose } = this.props;

		return visible && (
			<div className={styles.wrap}>
				<div className={styles.icon}>
					<Icon type="semi-select" />
					<Icon type="error" onClick={onClose}/>
				</div>
				<iframe onLoad={v => console.log(1, v)} src={dataSource[0]} frameBorder="0"></iframe>
			</div>
		);
	}
}