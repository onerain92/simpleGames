const game = document.getElementById('game');
const character = document.getElementById('character');

let interval;
let both;
let counter = 0;
let currentBlocks = [];

function moveLeft() {
  const left = parseInt(
    window.getComputedStyle(character).getPropertyValue('left')
  );

  if (left > 0) {
    character.style.left = left - 2 + 'px';
  }
}

function moveRight() {
  const left = parseInt(
    window.getComputedStyle(character).getPropertyValue('left')
  );
  if (left < 380) {
    character.style.left = left + 2 + 'px';
  }
}

document.addEventListener('keydown', (event) => {
  if (both === 0) {
    both++;

    if (event.key === 'ArrowLeft') {
      interval = setInterval(moveLeft, 1);
    }

    if (event.key === 'ArrowRight') {
      interval = setInterval(moveRight, 1);
    }
  }
});

document.addEventListener('keyup', () => {
  clearInterval(interval);
  both = 0;
});

const blocks = setInterval(() => {
  console.log(counter);
  const blockLast = document.getElementById('block' + (counter - 1));
  const holeLast = document.getElementById('hole' + (counter - 1));
  let blockLastTop;
  let holeLastTop;

  if (counter > 0) {
    blockLastTop = parseInt(
      window.getComputedStyle(blockLast).getPropertyValue('top')
    );
    holeLastTop = parseInt(
      window.getComputedStyle(holeLast).getPropertyValue('top')
    );
  }

  if (blockLastTop < 400 || counter === 0) {
    const block = document.createElement('div');
    const hole = document.createElement('div');
    const random = Math.floor(Math.random() * 360);

    block.setAttribute('class', 'block');
    hole.setAttribute('class', 'hole');
    block.setAttribute('id', 'block' + counter);
    hole.setAttribute('id', 'hole' + counter);

    block.style.top = blockLastTop + 100 + 'px';
    hole.style.top = holeLastTop + 100 + 'px';
    hole.style.left = random + 'px';

    game.appendChild(block);
    game.appendChild(hole);

    currentBlocks.push(counter);
    counter++;
  }

  const characterTop = parseInt(
    window.getComputedStyle(character).getPropertyValue('top')
  );
  const characterLeft = parseInt(
    window.getComputedStyle(character).getPropertyValue('left')
  );
  let drop = 0;

  if (characterTop <= 0) {
    alert('Game Over! Score: ' + (counter - 9));
    clearInterval(blocks);
    location.reload();
  }

  for (let i = 0; i < currentBlocks.length; i++) {
    let current = currentBlocks[i];
    let iBlock = document.getElementById('block' + current);
    let iHole = document.getElementById('hole' + current);
    let iBlockTop = parseFloat(
      window.getComputedStyle(iBlock).getPropertyValue('top')
    );
    let iHoleLeft = parseFloat(
      window.getComputedStyle(iHole).getPropertyValue('left')
    );

    iBlock.style.top = iBlockTop - 0.5 + 'px';
    iHole.style.top = iBlockTop - 0.5 + 'px';

    if (iBlockTop < -20) {
      currentBlocks.shift();
      iBlock.remove();
      iHole.remove();
    }

    if (iBlockTop - 20 < characterTop && iBlockTop > characterTop) {
      drop++;

      if (iHoleLeft <= characterLeft && iHoleLeft + 20 >= characterLeft) {
        drop = 0;
      }
    }
  }

  if (drop === 0) {
    if (characterTop < 480) {
      character.style.top = characterTop + 2 + 'px';
    }
  } else {
    character.style.top = characterTop - 0.5 + 'px';
  }
}, 1);
