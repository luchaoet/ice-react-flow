import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ClickOutside from 'react-click-outside';
import Popper from 'popper.js';
import Transition from '../Transition';
import View from '../View';
import styles from './index.module.scss';

class Overlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      count: 1,
    };
  }

  handleClickOutside() {
    if (this.state.show) {
      this.toggle();
    }
  }

  componentDidMount() {
    this.reference = ReactDOM.findDOMNode(this.refs.reference);
    this.popper = ReactDOM.findDOMNode(this.refs.popper);
  }

  componentWillMount() {
    if (this.popperJS) {
      this.popperJS.update();
    }
  }

  componentWillUpdate() {
    if (this.popperJS) {
      this.popperJS.update();
    }
  }

  toggle = () => {
    const that = this;
    this.setState({
      show: !this.state.show,
    });
  };

  onEnter = () => {
    console.log('onEnter');
    const that = this;
    this.popperJS = new Popper(this.reference, this.popper, {
      // placement: 'left',
      // positionFixed: true,
      modifiers: {
        computeStyle: {
          gpuAcceleration: false,
        },
      },
    });
  };

  onAfterLeave = () => {
    this.popperJS.destroy();
  };

  render() {
    const { show, count } = this.state;
    return (
      <>
        <div className={styles.container}>
          <span onClick={this.toggle} ref="reference">
            Overlay
          </span>
        </div>
        <Transition
          name="el-zoom-in-top"
          onEnter={this.onEnter}
          onAfterLeave={this.onAfterLeave}
        >
          <View show={show}>
            <div className={styles.overlayContainer} ref="popper">
              wwwww{count}
            </div>
          </View>
        </Transition>
      </>
    );
  }
}

export default ClickOutside(Overlay);
