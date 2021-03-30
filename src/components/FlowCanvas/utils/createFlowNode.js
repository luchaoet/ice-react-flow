import FlowNode from './FlowNode';
export default function createFlowNode(flowData) {
  const _flowData = [];
  for (const item of flowData) {
    _flowData.push(new FlowNode(item));
  }
  return _flowData;
}
