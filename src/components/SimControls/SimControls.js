import React, { Component } from 'react';

export default class SimControls extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="btn-group mt-2" role="group">
        <button type="button" className="btn btn-primary" onClick={this.props.start}>
          <i className="fas fa-play"></i> Start
      </button>
        <button type="button" className="btn btn-secondary" onClick={this.props.pause}>
          <i className="fas fa-pause"></i> Pause
      </button>
        <button type="button" className="btn btn-danger" onClick={this.props.stop}>
          <i className="fas fa-stop"></i> Stop
      </button>
      </div>
    );
  }
}