import React from 'react';
// import ReactDOM from 'react-dom';

const KeyboardShortcut = (WrappedComponent) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.onkeydown = this.onkeydown.bind(this);
    }
    componentDidMount() {
      document.addEventListener('keydown', this.onkeydown, true);
    }

    componentWillUnmount() {
      document.addEventListener('keydown', this.onkeydown, true);
    }

    onkeydown(e) {
      if (
        this.__wrappedInstance &&
        typeof this.__wrappedInstance.onkeydown === 'function'
      ) {
        // this.__wrappedInstance.onkeydown(e);
        // console.log(this.__wrappedInstance.onkeydown());
        const keys = Object.keys(this.__wrappedInstance.onkeydown());
        const _keys = keys.map((i) => {
          return {
            funcName: i,
            keys: i.toLocaleLowerCase().split('+'),
          };
        });
        console.log(e.location, e);
        e.preventDefault();
      }
    }

    render() {
      const { wrappedRef, ...rest } = this.props;
      return (
        <WrappedComponent
          {...rest}
          ref={(c) => {
            this.__wrappedInstance = c;
            // this.__domNode = ReactDOM.findDOMNode(c);
            wrappedRef && wrappedRef(c);
          }}
        />
      );
    }
  };
};
export default KeyboardShortcut;
