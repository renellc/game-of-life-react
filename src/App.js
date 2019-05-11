import React, { Component } from 'react';

export default class App extends Component {
  componentDidMount() {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');

    ctx.canvas.style.width = '90%';

    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.width / 3);
  }

  render() {
    return (
      <div class="container-fluid">
        <div class="row text-center mt-5">
          <div class="col-12">
            <h1 class="display-4">Conway's Game of Life</h1>
          </div>
        </div>
        <div class="row text-center">
          <div class="col-12">
            <canvas id="canvas"></canvas>
          </div>
        </div>
      </div>
    );
  }
}
