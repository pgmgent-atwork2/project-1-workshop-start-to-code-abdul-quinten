const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');
const tileSize = 20;
let maze = [];
let player = { x: 1, y: 1 };
let goal = { x: 0, y: 0 };
let moves = 0;

document.getElementById('startMazeBtn').addEventListener('click', makeMaze);