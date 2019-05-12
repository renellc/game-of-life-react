# Conway's Game of Life
Conway's Game of Life is a cellular automaton developed by mathematician John Horton Conway. It is
a zero-player game, where the player only interacts with the program at the beginning to set its
initial configuration. Once the simulation starts, the player can no longer interact with the board
and must watch the cells evolve over time.

## Installation and Running
Users should have Node 8.10.0 installed on their machine. Having Node 8.10.0 installed, run the
command `npm install`. Once that has finished, run the command `npm run start` and open your
browser to http://localhost:3000 to start using the application.

## Rules for cells in Conway's Game of Life
1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
2. Any live cell with two or three live neighbours lives on to the next generation.
3. Any live cell with more than three live neighbours dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.