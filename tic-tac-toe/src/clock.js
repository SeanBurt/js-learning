import React from 'react';
import ReactDom from 'react-dom';

class Clock extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }

  componentDidMount () {
    this.timer = setInterval(_ => this.tick(), 1000);
  }

  componentWillUnmount () {
    clearInterval(this.timer);
  }

  tick () {
    this.setState({
      date: new Date()
    });
  }

  render () {
    return (
      <div>
        <h1>Hello, World!</h1>
        <h2>It is {this.state.date.toLocaleDateString()}.</h2>
      </div>
    );
  }
}

ReactDom.render(
  <Clock />,
  document.getElementById('root')
);
