const cells = document.querySelectorAll('.grid div');
let playerPosition = 0;
function findPlayerStart() {
    cells.forEach((cell,index)=>{
        if (cell.classList.contains('cell--green')){
            playerPosition = index
        }
    });

}

findPlayerStart();

document.addEventListener('keydown', (event) => {
    console.log(event.key);
});


document.addEventListener('keydown', (event) => {
    let move = 0;

    if (event.key === 'ArrowRight' && (playerPosition + 1) % 6 !== 0) {
        move = 1;
    } else if (event.key === 'ArrowLeft' && playerPosition % 6 !== 0) {
        move = -1;
    } else if (event.key === 'ArrowUp' && playerPosition - 6 >= 0) {
        move = -6;
    } else if (event.key === 'ArrowDown' && playerPosition + 6 < cells.length) {
        move = 6;
    }

    const nextPosition = playerPosition + move;

    if (move !== 0 && cells[nextPosition] && cells[nextPosition].classList.contains('cell--x')) {
        // 1. Verwijder de groene kleur van de huidige cel
        cells[playerPosition].classList.remove('cell--green');
        cells[playerPosition].classList.add('cell--x');

        // 2. Update de positie van de speler
        playerPosition = nextPosition;

        // 3. Maak de nieuwe cel groen
        cells[playerPosition].classList.remove('cell--x');
        cells[playerPosition].classList.add('cell--green');
    }
});
