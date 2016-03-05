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
    this.handleChange = this.handleChange.bind(this)
    this._addUrl = this._addUrl.bind(this)
  }

  state = {
    entry: '',
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

  handleChange(e) {
    this.setState({
      entry: e.target.value
    })
  }

  _isValideUrl(url) {
    let result = false
    if(url.length !== 0) {
      result = true
    }
    return result
  }

  handleClick (e) {
    e.preventDefault()
    if(this._isValideUrl(this.state.entry)) {
      socket.emit('start', this.state.entry)
    }
  }

  render() {
    return (
      <div>
        <form>
          <input type="text" placeholder='type the entry for site' onChange={this.handleChange}></input>
          <input type="submit" value="Start" onClick={this.handleClick}></input>
        </form>
        <Lists lists={this.state.urls}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('wrapper'))
