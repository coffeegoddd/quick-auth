import React, { Component } from 'react';

class Hidden extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.update();
    this.props.valid();
  }
  render() {
    return (<div>
      Follow me on twitter
      @coffeegoddd ;)
    </div>);
  }
}

export default Hidden;