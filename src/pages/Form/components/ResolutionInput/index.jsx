import React from 'react';
import { Input, Icon } from '@alifd/next';
import styles from './index.module.scss'

class ResolutionInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        value: props.value || props.defaultValue
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
      const { value } = nextProps;
      this.setState({value: value});
  }

  onLeftInputChange = (v) => {
    const value = this.state.value || {};
    value.value1 = v;
    this.setState({value});
    this.onChange(value);
  }

  onRightInputChange = (v) => {
    const _value = this.state.value || {};
    _value.value2 = v;
    this.setState({value: _value});
    this.onChange(_value);
  }

  onChange = (v = {}) => {
    const { onChange } = this.props;
    const value = v.value1 || v.value2
        ? {value1: v.value1, value2: v.value2} 
        : undefined;
    if(onChange)onChange(value);
  }

  onDelete = () => {
    this.onChange();
  }

  render() {
    const { value } = this.state;
    const { value1, value2 } = value || {};
    return (
      <div className={styles.wrap}>
        <Input style={{width: 100, textAlign: 'center'}} hasClear value={value1} onChange={this.onLeftInputChange.bind(this)} />
        <Icon type="close" />
        <Input style={{width: 100}} hasClear value={value2} onChange={this.onRightInputChange.bind(this)} />
        {
          (value1 || value2) && 
          <Icon className={styles.delete} type="delete-filling" onClick={this.onDelete} />
        }
      </div>
    );
  }
}

export default ResolutionInput;