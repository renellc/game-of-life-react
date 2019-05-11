import React, { Component } from 'react';
import './App.css'

export default class App extends Component {
  state = {
    width: 30,
    height: 20,
    board: []
  }

  componentDidMount() {
    this.setState({ board: this.createBoard() }, () => {
      //this.updateBoard();
      console.log('board created');
      this.updateBoard();
    });
  }

  createBoard() {
    let board = new Array();
    for (let i = 0; i < this.state.height; i++) {
      board.push(new Array(this.state.width).fill(0));
    }
    return board;
  }

  updateBoard() {
    let { board } = this.state;
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerHeight;

    let squareWidth = canvas.width / this.state.width;
    let squareHeight = canvas.height / this.state.height;

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    board.forEach((row, x) => {
      for (let y = 0; y < row.length; y++) {
        ctx.fillStyle = row[y] === 0 ? 'white' : 'grey';
        ctx.fillRect(y * squareWidth, x * squareHeight, squareWidth - 0.5, squareHeight - 0.5);
      }
    });
  }

  render() {
    return (
      <div class="container-fluid">
        <div class="row text-center mt-2">
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
