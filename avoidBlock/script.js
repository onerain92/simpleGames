const character = document.getElementById('character');
const block = document.getElementById('block');

function jump() {
  if (character.classList !== 'animate') {
    character.classList.add('animate');
  }
  setTimeout(() => {
    character.classList.remove('animate');
  }, 500);
}

const checkDead = setInterval(() => {
  const characterTop = parseInt(
    window.getComputedStyle(character).getPropertyValue('top')
  );
  const blockLeft = parseInt(
    window.getComputedStyle(block).getPropertyValue('left')
  );

  if (0 < blockLeft && blockLeft < 20 && characterTop >= 130) {
    block.style.animation = 'none';
    block.style.display = 'none';

    alert('You Lose!');
  }
}, 10);

window.addEventListener('keydown', function (event) {
  const keyCode = event.keyCode;

  if (keyCode === 32) jump();
});
