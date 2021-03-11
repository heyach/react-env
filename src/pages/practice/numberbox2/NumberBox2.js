import React, { Component } from "react"
import NumberBox2 from "../../../components/numberbox2/NumberBox2"
import "./index.scss"

class NumberBox2Page extends Component {
  constructor(props) {
    super(props)
    this.state = {
      minValue: 0,
      maxValue: 30,
      defaultValue: 10,
      value: 0,
      stepLength: 5,
      storeList: [{
        name: "店铺1",
        goods: [{
          name: "商品1",
          price: 2,
          num: 0,
          minValue: 0,
          maxValue: 20,
          defaultValue: 0,
          stepLength: 1
        }, {
          name: "商品2",
          price: 3,
          num: 0,
          minValue: 0,
          maxValue: 20,
          defaultValue: 0,
          stepLength: 2
        }]
      }, {
        name: "店铺2",
        goods: [{
          name: "商品3",
          price: 4,
          num: 0,
          minValue: 0,
          maxValue: 20,
          defaultValue: 0,
          stepLength: 3
        }, {
          name: "商品4",
          price: 5,
          num: 0,
          minValue: 0,
          maxValue: 20,
          defaultValue: 0,
          stepLength: 4
        }]
      }]
    }
  }
  // 计算属性
  get totalNum(){
    let { storeList } = this.state
    let t = 0
    storeList.forEach(item => {
      item.goods.forEach(item2 => {
        t += item2.num
      })
    })
    return t
  }
  get totalPrice(){
    let { storeList } = this.state
    let t = 0
    storeList.forEach(item => {
      item.goods.forEach(item2 => {
        t += item2.price * item2.num
      })
    })
    return t
  }
  componentDidMount(){
    this.setState({
      defaultValue: 20,
      maxValue: 40,
      stepLength: 10
    })
  }
  getNumber(value, index, index2) {
    let t = this.state.storeList
    t[index].goods[index2].num = value
    this.setState({
      storeList: t
    })
  }
  getNumber2(value){
    this.setState({
      value: value
    })
  }
  render() {
    let {
      minValue,
      maxValue,
      defaultValue,
      stepLength,
      storeList
    } = this.state
    return (
      <div className="number-box-con">
        <div className="block-item">
          <div className="intro">
            <p>使用函数式组件numberbox2</p>
          </div>
          <div className="com-item">
              父组件传递的参数会异步更新，比如defaultValue由10->20，子组件的value需要跟着变化
              <NumberBox2
                minValue={minValue}
                maxValue={maxValue}
                defaultValue={defaultValue}
                stepLength={stepLength}
                getNumber={(v) => this.getNumber2(v)}
              >
              </NumberBox2>
            <div className="shop-car">
            {
              storeList.map((item, index) => {
                return (
                  <div className="store-item" key={index}>
                    <div className="store-name">{item.name}</div>
                    <div className="store-goods">
                      {
                        item.goods.map((item2, index2) => {
                          return (
                            <div className="goods-item" key={index2}>
                              <div className="goods-name">{item2.name}</div>
                              <div className="goods-price">价格${item2.price}</div>
                              <div className="goods-num">
                                <NumberBox2
                                  minValue={item2.minValue}
                                  maxValue={item2.maxValue}
                                  defaultValue={item2.defaultValue}
                                  stepLength={item2.stepLength}
                                  getNumber={(v) => this.getNumber(v, index, index2)}
                                >
                                </NumberBox2>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                )
              })
            }
            <div className="bottom-info">共选择了{this.totalNum}件商品，总价{this.totalPrice}</div>
          </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NumberBox2Page