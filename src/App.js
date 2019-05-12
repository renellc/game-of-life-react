import React, { Component } from 'react';
import Board from './Board';

export default class App extends Component {
  constructor(props) {
    super(props);
    let width = 45;
    let heightRatio = 1.8;
    this.state = {
      width: width,
      height: Math.floor(width / heightRatio),
      board: this.createBoard(width),
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
      const { width, height } = this.state;
      let newBoard = this.createBoard(width);

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

          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3">
                <label htmlFor="speed-control">Speed</label><br />
                <input id="speed-control" type="range" min="1.0" max="4.0" step="0.1"></input>
              </div>
              <div className="col-md-3">
                <div className="btn-group mt-2" role="group">
                  <button type="button" className="btn btn-primary" onClick={this.startSimulation.bind(this)}>
                    <i className="fas fa-play"></i> Start
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={this.pauseSimulation.bind(this)}>
                    <i className="fas fa-pause"></i> Pause
                  </button>
                  <button type="button" className="btn btn-danger" onClick={this.stopSimulation.bind(this)}>
                    <i className="fas fa-stop"></i> Stop
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
