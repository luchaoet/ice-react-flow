import { Button } from '@alifd/next';
import React from 'react';
import MovableDialog from '@/components/MovableDialog/test'
import './index.module.scss';

class DialogTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  switchState = () => {
    const { visible } = this.state;
    this.setState({
      visible: !visible
    })
  }

  render() {
    const { visible } = this.state;
    return (
      <div>
        <Button onClick={this.switchState}>测试1</Button>
        <Button onClick={this.switchState}>测试2</Button>
        <Button onClick={this.switchState}>测试3</Button>
        <Button onClick={this.switchState}>测试4</Button>
        <MovableDialog 
          visible={visible}
          title={'RDP远程桌面测试'}
          onClose={this.switchState}
          dataSource={[
            'http://console-rpa.aliyun.test/remoteDesktop?entityId=37a32c7f-8619-4a9e-89f5-02f5dbe93c25&robotId=4D0DEFEB0846746A32921610E6B356AE&ip=47.114.110.101',
            'http://console-rpa.aliyun.test/remoteDesktop?entityId=37a32c7f-8619-4a9e-89f5-02f5dbe93c25&robotId=4D0DEFEB0846746A32921610E6B356AE&ip=47.114.110.101'
          ]}
        />
      </div>
    );
  }
}

export default DialogTest;
