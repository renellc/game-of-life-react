import React, { Component } from 'react';
import './Board.css';

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cellWidth: 0,
      cellHeight: 0
    }
  }

  componentDidMount() {
    let canvas = this.initializeBoard();

    this.setState({
      cellWidth: canvas.width / this.props.width,
      cellHeight: canvas.height / this.props.height
    }, () => {
      let { board, width, height } = this.props;
      this.drawBoard(board, width, height);
      canvas.addEventListener('click', ev => this.getClickCoords(ev));
    });
  }

  initializeBoard() {
    let canvas = document.getElementById('canvas');
    let parent = canvas.parentElement;
    canvas.width = parent.offsetWidth * 0.8;
    canvas.height = canvas.width / 2;
    return canvas;
  }

  getClickCoords(ev) {
    let x = Math.floor(ev.offsetX / this.state.cellWidth);
    let y = Math.floor(ev.offsetY / this.state.cellHeight);
    this.props.canvasClick({ x, y });
  }

  drawBoard(board, width, height) {
    if (!document.getElementById('canvas')) {
      return;
    }

    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let { cellWidth, cellHeight } = this.state;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        ctx.fillStyle = !board[x][y] ? 'white' : 'blue';
        ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth - 1, cellHeight - 1);
      }
    }
  }

  render() {
    let { board, width, height } = this.props;
    this.drawBoard(board, width, height);
    return (
      <canvas id="canvas"></canvas>
    );
  }
}