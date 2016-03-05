import React from 'react'

export default class Lists extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    var lists = this.props.lists.map((e, i) => {
      return (
        <li key={i+1}>
          <span>{e}</span>
        </li>
      )
    })
    return (
      <ul>
        {lists}
      </ul>
    )
  }
}
