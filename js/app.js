const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');
const tileSize = 20;
let maze = [];
let player = { x: 1, y: 1 };
let goal = { x: 0, y: 0 };
let moves = 0;

document.getElementById('startMazeBtn').addEventListener('click', makeMaze);

function generateMaze(rows, cols) {
    let maze = Array.from({ length: rows }, () => Array(cols).fill(1));
  
    function carve(currentColumn, currentRow) {
      maze[currentRow][currentColumn] = 0;
    
      const directions = [
        [0, -2],
        [0, 2],
        [-2, 0],
        [2, 0]
      ];
    
      directions.sort(() => Math.random() - 0.5);
    
      for (const [columnOffset, rowOffset] of directions) {
        const nextColumn = currentColumn + columnOffset;
        const nextRow = currentRow + rowOffset;
    
        if (
          nextRow > 0 && nextRow < maze.length - 1 &&
          nextColumn > 0 && nextColumn < maze[0].length - 1 &&
          maze[nextRow][nextColumn] === 1
        ) {
          maze[currentRow + rowOffset / 2][currentColumn + columnOffset / 2] = 0;
          carve(nextColumn, nextRow);
        }
      }
    }
  
    carve(1, 1);
    maze[1][1] = 0;
    maze[rows - 2][cols - 2] = 0;
    return maze;
  }

