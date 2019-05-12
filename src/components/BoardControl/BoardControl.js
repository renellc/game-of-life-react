import React, { Component } from 'react';

export default class BoardControl extends Component {
  render() {
    return (
      <div className="container-fluid">
        <label htmlFor="speed-control">Speed: </label>
        <input id="speed-control" type="range" min="1.0" max="4.0" step="0.1" defaultValue="1.0"></input>
        <br/>

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
      </div>
    );
  }
}