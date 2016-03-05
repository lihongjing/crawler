import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import io from 'socket.io/node_modules/socket.io-client/socket.io.js'
import Lists from './Lists'

const socket = io()

class App extends React.Component {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this._addUrl = this._addUrl.bind(this)
  }

  state = {
    urls: []
  }

  _addUrl(url) {
    let tmp = this.state.urls
    tmp.push(url)
    this.setState({urls: tmp})
  }

  componentDidMount() {
    socket.on('add', this._addUrl)
  }

  handleClick (e) {
    e.preventDefault()
    socket.emit('start', 'http://www.apia.com.au')
  }

  render() {
    return (
      <div>
        <form>
          <input type="text" ref="domain"></input>
          <input type="submit" value="Start" onClick={this.handleClick}></input>
        </form>
        <Lists lists={this.state.urls}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('wrapper'))
