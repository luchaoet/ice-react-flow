const class2type = {};
const temp = 'Boolean Number String Function Array Date RegExp Object Error'.split(
  ' '
);

for (const name of temp) {
  class2type['[object ' + name + ']'] = name.toLowerCase();
}

function type(obj) {
  // null undefined boolean number string function array date regexp object error
  // 其他的都返回 object 例如：DOM对象
  return obj == null ? String(obj) : class2type[toString.call(obj)] || 'object';
}

export default type;
