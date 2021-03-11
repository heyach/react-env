import React, { Component } from "react"
import "./index.scss"

class NumberBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0,
    }
  }
  add() {
    let v = this.scopeLimit(this.state.value + this.props.stepLength)
    this.setState({
      value: v
    })
    this.props.getNumber(v)
  }
  reduce() {
    let v = this.scopeLimit(this.state.value - this.props.stepLength)
    this.setState({
      value: v
    })
    this.props.getNumber(v)
  }
  scopeLimit(val) {
    val = parseInt(val)
    if (val < this.props.minValue) {
      return this.props.minValue
    } else if (val > this.props.maxValue) {
      return this.props.maxValue
    } else {
      return val ? val : this.props.minValue
    }
  }
  vChange(e) {
    let v = this.scopeLimit(e.target.value)
    this.setState({
      value: v
    })
    this.props.getNumber(v)
  }
  componentWillMount() {
    this.setState({
      value: this.props.defaultValue,
      // 如果minValue/maxValue是动态的，依赖其的属性需要在componentWillReceiveProps更新
      // minValue: this.props.minValue,
      // maxValue: this.props.maxValue,
      // defaultValue: this.props.defaultValue || 0,
      // stepLength: this.props.stepLength || 1,
      // placeholderText: this.props.placeholderText || "",
      // bgColor: this.props.bgColor || {},
    })
  }
  render() {
    let {
      minValue,
      maxValue,
      placeholderText = "",
      bgColor = {}
    } = this.props
    return (
      <div className="number-box" desc="数字控件" style={bgColor}>
        <button
          className={`btn-reduce ${this.state.value <= minValue ? 'disabled' : ''}`}
          disabled={this.state.value < minValue}
          onClick={() => this.reduce()}
        >-</button>
        <input placeholder={placeholderText} value={this.state.value} onChange={(e) => this.vChange(e)} className="ipt-number" />
        <button
          className={`btn-add ${this.state.value >= maxValue ? 'disabled' : ''}`}
          disabled={this.state.value > maxValue}
          onClick={() => this.add()}
        >+</button>
      </div>)
  }
}
export default NumberBox