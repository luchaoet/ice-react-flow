import React from 'react';
import styles from './index.module.scss'

export default class DefaultNodeView extends React.Component {
  render() {
		const {title, description} = this.props;
    return (
			<>
				<div className={styles.node_title_wrap}>{title}</div>
				<div className={styles.node_description}>
					{description}
				</div>
			</>
    )
  }
}