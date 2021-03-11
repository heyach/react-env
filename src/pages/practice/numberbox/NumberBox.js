import React, { Component } from "react"
import NumberBox from "../../../components/numberbox/NumberBox"
import "./index.scss"

class NumberBoxPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
          stepLength: 1
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
          stepLength: 1
        }, {
          name: "商品4",
          price: 5,
          num: 0,
          minValue: 0,
          maxValue: 20,
          defaultValue: 0,
          stepLength: 1
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
  getNumber(value, index, index2) {
    let t = this.state.storeList
    t[index].goods[index2].num = value
    let totalNum = 0, totalPrice = 0
    t.forEach(item => {
      item.goods.forEach(item2 => {
        totalNum += item2.num
        totalPrice += item2.num * item2.price
      })
    })
    this.setState({
      storeList: t,
      totalNum: totalNum,
      totalPrice: totalPrice
    })
  }
  render() {
    let {
      storeList
    } = this.state
    return (
      <div className="number-box-con">
        <div className="block-item">
          <div className="intro">
            <p>数字控件</p>
            <p>可以进行一些自定义的处理，步进，上下限</p>
            <p>可以进行一些自定义的过滤，非法数据处理</p>
            <p>可以传入默认值，如果有动态的值要传递，需要在componentWillReceiveProps里处理依赖计算</p>
            <p>下面看一个多商铺多商品购物车计数的例子</p>
          </div>
          <div className="com-item">
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
                                <NumberBox
                                  minValue={item2.minValue}
                                  maxValue={item2.maxValue}
                                  defaultValue={item2.defaultValue}
                                  stepLength={item2.stepLength}
                                  getNumber={(v) => this.getNumber(v, index, index2)}
                                >
                                </NumberBox>
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

export default NumberBoxPage