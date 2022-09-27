import React, { Component } from 'react'

export class ClassClick extends Component {

    clickHandler() {
        console.log("class click handler has been clicked")
    }

  render() {
    return (
      <div className="asshole">
        <button onClick= {this.clickHandler}>click</button>
        </div>
    )
  }
}

export default ClassClick