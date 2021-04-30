import React, { createElement } from 'react';

export default class Template extends React.Component {
  
  render() {
    const { component, show = true, children, ...reset} = this.props;
    const el = show && createElement(
      component,
      reset,
      children
    );
    return el;
  }
} 