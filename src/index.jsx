import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
// import Lists from './Lists'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  state = {
    input: 'http://www.baidu.com/'
  };

  handleClick (e) {
    e.preventDefault()
    $.post('/', {'url': 'http://www.apia.com.au'}, function(data){
      console.log('client')
      console.log(data)
    })
    // this.setState({
    //   input: this.refs.domain.value
    // })
  }

  render() {
    return (
      <div>
        <form>
          <input type="text" ref="domain"></input>
          <input type="submit" value="Start" onClick={this.handleClick}></input>
        </form>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('wrapper'))
