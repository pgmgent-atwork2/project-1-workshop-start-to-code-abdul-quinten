const canvas = document.getElementById("mazeCanvas");
const ctx = canvas.getContext("2d");
const tileSize = 20;
let maze = [];
let player = { x: 1, y: 1 };
let goal = { x: 0, y: 0 };
let moves = 0;

document.getElementById("startMazeBtn").addEventListener("click", makeMaze);

function makeMaze() {
    const size = parseInt(document.getElementById('diffSelect').value);
    maze = generateMaze(size, size);
    player = { x: 1, y: 1 };
    goal = { x: size - 2, y: size - 2 };
    moves = 0;
    drawMaze();
  }
  
function generateMaze(rows, cols) {
  let maze = Array.from({ length: rows }, () => Array(cols).fill(1));

  function carve(currentColumn, currentRow) {
    maze[currentRow][currentColumn] = 0;

    const directions = [
      [0, -2],
      [0, 2],
      [-2, 0],
      [2, 0],
    ];

    directions.sort(() => Math.random() - 0.5);

    for (const [columnOffset, rowOffset] of directions) {
      const nextColumn = currentColumn + columnOffset;
      const nextRow = currentRow + rowOffset;

      if (
        nextRow > 0 &&
        nextRow < maze.length - 1 &&
        nextColumn > 0 &&
        nextColumn < maze[0].length - 1 &&
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

function drawMaze() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const rows = maze.length;
  const cols = maze[0].length;
  const scale = canvas.width / cols;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (maze[y][x] === 1) {
        ctx.fillStyle = "#343232cc";
        ctx.fillRect(x * scale, y * scale, scale, scale);
      }
    }
  }

  // Goal
  const goalImage = new Image();
  goalImage.src = "static/Images/icons8-house-32.png";
  goalImage.onload = () => {
    ctx.drawImage(goalImage, goal.x * scale, goal.y * scale, scale, scale);
  };

  // Player
  const playerImage = new Image();
playerImage.src = 'static/Images/icons8-key-24.png';
playerImage.onload = () => {
  ctx.drawImage(playerImage, player.x * scale, player.y * scale, scale, scale);
};

}
document.addEventListener('keydown', event => {
    if (!maze.length) return;
  
    let { x, y } = player;
    let newX = x;
    let newY = y;
  
    if (event.key === 'ArrowUp') newY--;
    else if (event.key === 'ArrowDown') newY++;
    else if (event.key === 'ArrowLeft') newX--;
    else if (event.key === 'ArrowRight') newX++;
    else return;
  
    if (maze[newY]?.[newX] === 1) {
 
      alert("Oops! You hit a wall. Starting over...");
      player = { x: 1, y: 1 };  
      moves = 0;
    } else {
     
      player = { x: newX, y: newY };
      moves++;
    }
  
    drawMaze();
  
    if (player.x === goal.x && player.y === goal.y) {
      document.getElementById('moves').textContent = `You moved ${moves} steps.`;
      document.getElementById('Message-Container').style.display = 'block';
    }
  });
  