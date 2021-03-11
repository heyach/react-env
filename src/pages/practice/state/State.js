import { useState } from "react"
import NumberBox2 from "../../../components/numberbox2/NumberBox2"

function Counter() {
  // [state 1, setState 2] = useState(initialState 3)
  // 相当于定义了一个state字段1，指定了一个改变state的方法2，和state的默认值3
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(10);
  function handleClick(e, e2) {
    console.log(e, e2, 3)
    setCount(count + 1)
  }
  function handleClickFn() {
    // 默认传递原来的值，返回新的值
    setCount((prevCount) => {
      return prevCount + 1
    })
  }
  function handleClick2() {
    setCount2(count2 + 1)
  }
  function handleClickFn2() {
    setCount2((prevCount) => {
      return prevCount + 1
    })
  }
  return (
    <>
      Count: {count}
      <br></br>
      Count2: {count2}
      <br></br>
      {/* 因为不是class的写法，如果要传递参数，还是要通过调用函数的方式，不过不能使用this，因为没得 */}
      <button onClick={(e) => handleClick(e, 22)}>+</button>
      <button onClick={handleClickFn}>+</button>
      <br></br>
      <button onClick={handleClick2}>+2</button>
      <button onClick={handleClickFn2}>+2</button>
      <br></br>
      <NumberBox2 a={1}></NumberBox2>
    </>
  );
}

export default Counter