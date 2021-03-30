import React from 'react';
import Icon from '../../Icon'
import Template from '../../Template'
import styles from './index.module.scss'
import { Balloon } from '@alifd/next';
const Tooltip = Balloon.Tooltip;

export default class DefaultNodeView extends React.Component {
	handleErrors(errors) {
		return errors && (
			<div>
				{
					Object.keys(errors).map((item, index) => {
						return <p key={index}>{`${index + 1}: ${errors[item]}`}</p>
					})
				}
			</div>
		)
	}
  render() {
		const {title, description, errors} = this.props;
		const trigger = <Template show={!!errors} tag={Icon} className={styles.tips} type="rpayunhangzhuangtai-yichang" />
    return (
			<>
				<div className={styles.node_title_wrap}>
					<Icon className={styles.icon} type="rpaliulanqi" />
					<p className={styles.title}>{title}</p>
					<Tooltip trigger={trigger} align="t">{this.handleErrors(errors)}</Tooltip>
					<Icon className={styles.expand} type="rpaxiangxiazhanhang"/>
				</div>
				<div className={styles.node_description}>
					{description}
				</div>
			</>
    )
  }
}