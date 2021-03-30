import React, { createElement } from 'react';

export default class Template extends React.Component {
  
  render() {
    const { tag, show = true, children, ...reset} = this.props;
    const el = show && createElement(
      tag,
      reset,
      children
    );
    return el;
  }
} 