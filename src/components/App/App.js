import React, { Component } from 'react';
import Board from '../Board/Board';
import SimControls from '../SimControls/SimControls';

export default class App extends Component {
  constructor(props) {
    super(props);
    let width = 45;
    let heightRatio = 1.8;
    this.state = {
      width: width,
      heightRatio: heightRatio,
      height: Math.floor(width / heightRatio),
      board: this.createBoard(width, heightRatio),
      simIntervalId: null,
      simRunning: false
    };
  }

  createBoard(startingWidth, heightRatio) {
    let board = [];
    for (let i = 0; i < startingWidth; i++) {
      board.push(new Array(Math.floor(startingWidth / heightRatio)).fill(false));
    }
    return board;
  }

  colorCell(coords) {
    let { simRunning } = this.state;
    if (simRunning) {
      return;
    }

    let board = this.state.board;
    board[coords.x][coords.y] = !board[coords.x][coords.y];
    this.setState({ board: board });
  }

  startSimulation() {
    let intervalId = window.setInterval(() => {
      let { board } = this.state;
      const { width, height, heightRatio } = this.state;
      let newBoard = this.createBoard(width, heightRatio);

      for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
          let neighborCount = this.getCellNeighborCount(x, y);
          if (board[x][y]) {
            newBoard[x][y] = !(neighborCount < 2 || neighborCount > 3);
          } else {
            newBoard[x][y] = neighborCount === 3;
          }
        }
      }
      this.setState({ board: newBoard });
    }, 1000);
    this.setState({ simIntervalId: intervalId, simRunning: true });
  }

  getCellNeighborCount(currCellX, currCellY) {
    const { board, width, height } = this.state;
    let neighborCount = 0;

    for (let x = currCellX - 1; x <= currCellX + 1; x++) {
      for (let y = currCellY - 1; y <= currCellY + 1; y++) {
        if (x === currCellX && y === currCellY) {
          continue;
        }
        const withinXBounds = x >= 0 && x < width;
        const withinYBounds = y >= 0 && y < height;
        if (withinXBounds && withinYBounds) {
          neighborCount = board[x][y] ? neighborCount + 1 : neighborCount;
        }
      }
    }
    return neighborCount;
  }

  pauseSimulation() {
    const { simIntervalId } = this.state;
    window.clearInterval(simIntervalId);
    this.setState({ simRunning: false });
  }

  stopSimulation() {
    let { simIntervalId, simRunning } = this.state;
    window.clearInterval(simIntervalId);
    simRunning = false;
    this.setState({ simIntervalId, simRunning });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row text-center my-3">
          <div className="col-12">
            <h1 className="display-4">Conway's Game of Life</h1>
          </div>
        </div>

        <div className="board mx-1">
          <Board
            canvasClick={this.colorCell.bind(this)}
            board={this.state.board}
            width={this.state.width}
            height={this.state.height} />

          <SimControls 
            start={this.startSimulation.bind(this)}
            pause={this.pauseSimulation.bind(this)}
            stop={this.stopSimulation.bind(this)} />
        </div>
      </div>
    );
  }
}
