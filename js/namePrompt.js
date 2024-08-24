const nameInput = document.querySelector('#nameInput');

nameInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const name = e.target.value;
    document.querySelector('.box-greet').classList.add('hide');
    document.querySelector('.message-greet').classList.remove('hide');
    document.querySelector('.container').classList.remove('hide');
    toDoInput.value = '';

    drawUserName(name)

    localStorage.setItem("userName", name);
  }
})


export function drawUserName(userName) {
  document.querySelector('.message-greet').innerText = `Hello ${userName} !`;
}

