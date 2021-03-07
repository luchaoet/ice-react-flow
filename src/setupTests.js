// const { JSDOM } = require('jsdom');

// const jsdom = new JSDOM(
//   '<!doctype html><html><body></body><script></script></html>'
// );
// const { window } = jsdom;

// function copyProps(src, target) {
//   Object.defineProperties(target, {
//     ...Object.getOwnPropertyDescriptors(src),
//     ...Object.getOwnPropertyDescriptors(target),
//   });
// }

// global.window = window;
// global.document = window.document;
// global.navigator = {
//   userAgent: 'node.js',
// };
// global.requestAnimationFrame = function (callback) {
//   return setTimeout(callback, 0);
// };
// global.cancelAnimationFrame = function (id) {
//   clearTimeout(id);
// };
// copyProps(window, global);

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// global.React = React;
// global.shallow = shallow;

Enzyme.configure({ adapter: new Adapter() });
