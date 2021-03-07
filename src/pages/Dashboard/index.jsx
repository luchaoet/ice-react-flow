import { Button } from '@alifd/next';
import React from 'react';
import ReactDOM from 'react-dom';
import keyboardShortcut from './keyboardShortcut';
import './index.module.scss';

const modalRoot = document.getElementsByTagName('body')[0];

function createElement(ele, className) {
  const el = document.createElement(ele);
  el.className = className;
  return el;
}

class Overlay extends React.Component {
  constructor(props) {
    super(props);
    this.el = createElement('div', 'overlay-wrapper opened');
  }

  componentDidMount() {
    if (this.props.visible) {
      modalRoot.appendChild(this.el);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible) {
      modalRoot.appendChild(this.el);
    } else {
      modalRoot.removeChild(this.el);
    }
  }

  // componentWillUnmount() {
  //   modalRoot.removeChild(this.el);
  // }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

@keyboardShortcut
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((prevState) => ({
      visible: !prevState.visible,
    }));
  }

  onkeydown() {
    return {
      'shift+ctrl+p': () => {
        console.log('shift+ctrl+p');
      },
      p: () => {
        console.log('p');
      },
    };
  }

  render() {
    const { visible } = this.state;
    return (
      <>
        <Button onClick={this.handleClick}>按钮</Button>

        <Overlay visible={visible}>
          <div className="modal" onClick={this.handleClick}>
            Hi Overlay
          </div>
        </Overlay>
      </>
    );
  }
}

export default Home;
