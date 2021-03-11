import { useState, useEffect } from "react"
import "./index.scss"

// props的接受和使用
function NumberBox2(props) {
  // 这里value的值初始化为父组件传递的defaultValue
  // 但是defaultValue可能会异步更新，useState不会自动更新设置
  // 需要在useEffect里处理这种由于组件生命周期，参数传递的副作用
  const [value, setValue] = useState(props.defaultValue || 0);
  useEffect(() => {
    setValue(props.defaultValue)
  },[props.defaultValue]) 
  // 告知react依赖props.defaultValue，如果该值有更新才从新设置value
  // 否则每次add和reduce改变value的值时，也会执行setValue(props.defaultValue) 

  // 如果setState中有异步操作
  let {
    bgColor = {},
    minValue = 0,
    stepLength = 1,
    maxValue = 10,
    placeholderText = ""
  } = props
  function add() {
    let v = scopeLimit(value + stepLength)
    setValue(v)
    // setValue(v => { // v为每次最新的state值
    //   return v
    // })
    // 调用组件上的函数传递给父组件参数
    props.getNumber(v)
  }
  function reduce() {
    let v = scopeLimit(value - stepLength)
    setValue(v)
    props.getNumber(v)
  }
  function vChange(e) {
    let v = scopeLimit(e.target.value)
    setValue(v)
    props.getNumber(v)
  }
  function scopeLimit(val) {
    val = parseInt(val)
    if (val < minValue) {
      return minValue
    } else if (val > maxValue) {
      return maxValue
    } else {
      return val ? val : minValue
    }
  }
  return (
    <div className="number-box" desc="数字控件" style={bgColor}>
      <button
        className={`btn-reduce ${value <= minValue ? 'disabled' : ''}`}
        disabled={value < minValue}
        onClick={reduce}
      >-</button>
      <input
        placeholder={placeholderText}
        value={value}
        onChange={(e) => vChange(e)}
        className="ipt-number" />
      <button
        className={`btn-add ${value >= maxValue ? 'disabled' : ''}`}
        disabled={value > maxValue}
        onClick={add}
      >+</button>
    </div>
  );
}

export default NumberBox2