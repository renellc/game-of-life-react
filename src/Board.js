import React, { Component } from 'react';

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cellWidth: 0,
      cellHeight: 0
    }
  }

  componentDidMount() {
    let canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth * 0.75;
    canvas.height = canvas.width;

    this.setState({
      cellWidth: canvas.width / this.props.width,
      cellHeight: canvas.height / this.props.height
    }, () => {
      let { board, width, height } = this.props;
      this.drawBoard(board, width, height);
    });
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
        ctx.fillStyle = board[x][y] === 0 ? 'white' : 'blue';
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