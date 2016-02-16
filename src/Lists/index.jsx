import React from 'react'

export default class Lists extends React.Component {
  render() {
    var tmp = [
      'a',
      'b',
      'c'
    ]
    var list = tmp.map((e, i) => {
      return (
        <li key={i+1}>
          <span>{e}</span>
        </li>
      )
    })
    return (
      <ul>
        {list}
      </ul>
    )
  }
}
