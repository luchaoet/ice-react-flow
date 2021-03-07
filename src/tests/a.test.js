// import React from 'react';
import renderer from 'react-test-renderer';
import NodeView from '../components/NodeView';
import RpaIcon from '@/components/RpaIcon';
import { shallow, mount } from 'enzyme';
import NodeConfigDrawer from '@/components/NodeConfigDrawer';
import close from '../pages/Flow/nodes/brower/close'

describe('图标测试', function() {
  it('renders', function() {
		const wrapper = mount(<RpaIcon type="iconkongjian-keshihua1" />);
    expect(wrapper.find('.next-icon').length).toBe(1);
  });
});

describe('节点测试', function() {
  it('renders', function() {
		const obj = close;
		expect(typeof obj.type).toEqual('string');
  });
});

describe('弹窗测试', function() {
  it('renders', function() {
		const wrapper = mount(
			<NodeConfigDrawer
        currentNode={close}
        visible={true}
      />
		)
		expect(wrapper.find('input').length).toBe(1);
  });
});


