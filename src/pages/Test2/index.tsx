import { Button } from '@alifd/next';
import React from 'react';
import styles from './index.module.scss';
import b from '@/utils/test.b'

console.log('Test2', '打印 b', b)

class Test2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      activeIndex: null,
      dragStartIndex: null
    };
  }

  componentWillMount() {
    let output = this.identity<string>("11111");
    console.log(output)
  }

  identity<T>(arg: T): T {
    return arg
  }

  onDrop(e, index) {
    e.preventDefault();
    this.setState({
      activeIndex: null,
      dragStartIndex: null
    })
  }

  onDragStart(e, index) {
    // console.log(1)
    this.setState({
      dragStartIndex: index
    })
  }

  onDragEnter(e, index) {
    // if(e.currentTarget !== e.target && e.currentTarget.contains(e.target)) return;
    console.log('onDragEnter', index)
    this.setState({
      activeIndex: index
    })
  }

  onDragOver(e) {
    e.preventDefault()
  }

  render() {
    const dataSource = [1,2,3,4,5,6,7,8,9,10, 1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10, 1,2,3,4,5,6,7,8,9,10]
    const { activeIndex, dragStartIndex } = this.state;
    return (
      <div>
        <ul className={styles.wrap}>
          {
            dataSource.map((item, index) => {
              return (
                <li 
                  key={index}
                  draggable="true"
                  onDrop={e => this.onDrop(e, index)} 
                  onDragOver={this.onDragOver}
                  onDragEnter={e => this.onDragEnter(e, index)} 
                  onDragStart={e => this.onDragStart(e, index)} 
                  className={index === activeIndex && index !== dragStartIndex ? styles.activeItem : null}
                >
                  <div>qweqwe</div>
                  <div>{item + index}</div>
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}

export default Test2;
