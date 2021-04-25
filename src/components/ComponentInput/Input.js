import React, { Component } from 'react';
import { Input, Icon, Dropdown, Menu } from '@alifd/next';
import IfElse from '@/components/IfElse';
import styles from './index.module.scss';
import locale from '@/locale';

export default class ComInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      selectLabel: '',
    };
  }

  // 下拉点击选择 清空搜索关键字
  onSelect = (value = {}) => {
    const { onChange } = this.props;
    onChange && onChange(value);
    this.selectInputChange('');
  };

  // 输入框输入搜索
  selectInputChange = (selectLabel) => {
    this.setState({ selectLabel });
  };

  // 失焦 收起下拉 清空搜索关键字
  onInputBlur = () => {
    this.setState({
      visible: false,
    });
    setTimeout(() => {
      this.selectInputChange('');
    }, 200);
  };

  render() {
    const { placeholder, field, value } = this.props;
    const { type: _type, value: _value, label: _label } = value || {};
    const { visible, selectLabel } = this.state;
    return (
      <>
        <Input
          addonTextAfter={<Icon type="ellipsis" />}
          placeholder={_label ? '' : placeholder || '请选择控件'}
          maxLength={10}
          hasClear
          // addonTextAfter={<Icon type="ellipsis" />}
          value={selectLabel}
          onFocus={() => this.setState({ visible: true })}
          onBlur={() => this.onInputBlur()}
          onChange={(value) => this.selectInputChange(value)}
        />
        <IfElse if={_type && _value}>
          <p className={styles.valueWrap}>
            <span>{_label}</span>
            <Icon size="small" type="close" onClick={() => this.onSelect()} />
          </p>
        </IfElse>
        <ComInputDropdown
          visible={visible}
          defaultValue={_value}
          selectLabel={selectLabel}
          onSelect={(value) => this.onSelect(value)}
        />
      </>
    );
  }
}

const menuData = [
  { type: 'c', label: locale.t('el.datepicker.selectDate'), value: '111' },
  { type: 'c', label: '搜索22', value: '222' },
  { type: 'c', label: '淘宝搜索', value: '5f789fwe23ewp' },
];
const Item = Menu.Item;

class ComInputDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 当前选择 高亮
      selectedKeys: props.defaultValue,
    };
  }

  // 下拉选择 返回完整的 value
  handleItem(value) {
    const temp = menuData.filter((item) => item.value === value);
    const _value = 0 in temp ? temp[0] : null;
    const { onSelect } = this.props;
    onSelect && onSelect(_value);
    // 设置当前高亮的值
    this.setState({
      selectedKeys: _value ? _value.value : null,
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { defaultValue } = nextProps;
    if (!defaultValue)
      this.setState({
        selectedKeys: null,
      });
  }

  render() {
    const { selectedKeys } = this.state;
    const { visible, value = {}, selectLabel } = this.props;
    const { type: _type, value: _value, label: _label } = value;

    // 搜索
    const _dataSource = selectLabel
      ? menuData.filter((item) => {
          return item.label === selectLabel;
        })
      : menuData;

    return (
      <Dropdown
        trigger={<i style={{ display: 'block' }}></i>}
        visible={visible}
        triggerType="click"
        className="componentInput-dropdown"
      >
        <Menu
          onItemClick={(value) => this.handleItem(value)}
          selectedKeys={selectedKeys}
          selectMode="single"
        >
          {0 in _dataSource ? (
            _dataSource.map((item) => (
              <Item key={item.value}>{item.label}</Item>
            ))
          ) : (
            <div>无数据</div>
          )}
        </Menu>
      </Dropdown>
    );
  }
}
