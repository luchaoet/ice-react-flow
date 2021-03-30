import React, { createElement, Component } from 'react';

export default class ClickOutside extends Component {
  constructor(props) {
    super(props);
    this.container = null;
  }
  // componentDidMount() {}
  // componentWillUnmount() {}
  componentWillReceiveProps(nextProps) {
    const { selected } = nextProps;
    if (selected) {
      document.addEventListener('mousedown', this.handle, true);
    } else {
      document.removeEventListener('mousedown', this.handle, true);
    }
  }
  handle = (e) => {
    const el = this.container;
    if (!el) return;
    const { onClickOutside = () => {} } = this.props;
    if (!el.contains(el.target)) {
      onClickOutside(e);
    }
  };
  render() {
    const { children, onClickOutside, tag, ...props } = this.props;
    const _tag = tag || 'div';
    const el = createElement(
      _tag,
      {
        ref: (c) => (this.container = c),
        ...props,
      },
      children
    );
    return el;
  }
}
