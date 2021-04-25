export default function jsonParse(str, defaultValue) {
  let obj = {};
  try {
    obj = JSON.parse(str);
  } catch (error) {
    obj = defaultValue || null;
  }
  return obj;
}
