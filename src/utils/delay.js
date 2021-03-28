/**
 * 输入框延迟函数
 */
let timeOut = null;
export default function delay(fn, time = 800) {
  clearTimeout(timeOut);
  timeOut = setTimeout(()=>{
    fn();
    timeOut = null;
  }, time)
}