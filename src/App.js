import React, { Component } from 'react';

export default class App extends Component {
  state = {
    width: 30,
    height: 20,
    board: []
  }

  componentDidMount() {
    this.setState({ board: this.createBoard() });
  }

  createBoard() {
    let board = new Array();
    for (let i = 0; i < this.state.height; i++) {
      board.push(new Array(this.state.width).fill(0));
    }
    return board;
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
