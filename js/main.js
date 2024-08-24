import { v4 as uuidv4 } from 'https://cdn.skypack.dev/uuid';
import { drawUserName } from './namePrompt.js';

const toDoInput = document.querySelector('#toDoInput');
const list = document.querySelector('.todo-list');
const savedUserName = localStorage.getItem("userName");

let toDoList = [];

// Check data 
if (savedUserName) {
  document.querySelector('.box-greet').classList.add('hide');
  document.querySelector('.message-greet').classList.remove('hide');
  document.querySelector('.container').classList.remove('hide');
  drawUserName(savedUserName);
  drawSavedList();
}

function renderToDoList() {
  list.innerHTML = '';
  toDoList.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `<p>${item.text}</p>
    <button class="btn-edit" data-id="${item.id}"><i class="fa-solid fa-edit"></i></button>
    <button class="btn-delete" data-id="${item.id}"><i class="fa-solid fa-trash"></i></button>`
    list.appendChild(li);
  })
}


function saveTodoList() {
  localStorage.setItem('todoList', JSON.stringify(toDoList));
}

function drawSavedList() {
  const list = JSON.parse(localStorage.getItem('todoList'));
  toDoList = list;
  renderToDoList()
}



toDoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const uniqueId = uuidv4();
    const newItem = {
      id: uniqueId,
      text: e.target.value
    }
    toDoList.push(newItem);
    renderToDoList();
    toDoInput.value = '';
  }
  saveTodoList();
})



list.addEventListener('click', (e) => {
  const itemId = e.target.closest('button')?.getAttribute('data-id')
  const li = e.target.closest('li');
  const item = toDoList.find(item => item.id === itemId)


  // edit mode
  if (e.target.closest('.btn-edit')) {
    console.log(item)
    const currentText = item.text;
    li.innerHTML = `
        <textarea>${currentText}</textarea>
        <button class="btn-save" data-id="${item.id}">
          <i class="fa-solid fa-check " ></i>
        </button>
        <button class="btn-cancel" data-id="${item.id}">
          <i class="fas fa-times" ></i>
        </button>
      
      `;
    toDoInput.value = ''
  }
  // update
  if (e.target.closest('.btn-save')) {
    const newText = li.querySelector('textarea').value;
    console.log(newText)
    item.text = newText;
    renderToDoList();
    saveTodoList();
  }
  
  if (e.target.closest('.btn-cancel')) {
    renderToDoList();
  }

  //delete
  if (e.target.closest('.btn-delete')) {
    const btn = e.target.closest('.btn-delete');
    const li = btn.closest('li');
    toDoList = toDoList.filter(item => item.id !== itemId)
    renderToDoList()
    saveTodoList();
  }

})

