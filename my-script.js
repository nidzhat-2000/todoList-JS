'use strict';

const taskName = document.querySelector('.new--task');
const addButton = document.querySelector('.addBtn');
const listContainer = document.querySelector('.to-dos');
const allTasks = document.querySelectorAll('.to-do');
const date = document.querySelector('.day-month-year');
const time = document.querySelector('.clock');
const removeBtns = document.querySelectorAll('.ignore');
const message = document.querySelector('.pop-up');
const avoiderMessageBtn = document.querySelector('.got');

//////////////////////////////////////
// Adding tasks function ⤵
listContainer.innerHTML = '';
const addTask = () => {
  const task = taskName.value.trim();
  // console.log(task.split(' '));  -- // all elements even 'spaces'
  // console.log(task.split(' ').filter(el => !el == '')); -- // all elements except 'spaces'
  const organizedTask =
    task == ''
      ? false
      : task
          .split(' ')
          .filter(el => !el == '')
          .map(el => el.replace(el[0], el[0].toUpperCase()))
          .join(' ');
  const newList = document.createElement('li');
  const rmvBtn = document.createElement('button');
  const important = document.createElement('button');

  // console.log(organizedTask); ---- // false == false
  // console.log(!organizedTask); // !false == true
  // ⤵
  if (!organizedTask) return (message.style.opacity = '100');

  newList.innerHTML = `${organizedTask}`;
  newList.classList.add('to-do');
  rmvBtn.innerHTML = '❌';
  rmvBtn.classList.add('ignore');
  important.innerHTML = '🧙‍♂️';
  important.classList.add('maker');

  listContainer.prepend(newList);
  newList.append(rmvBtn);
  newList.appendChild(important);

  newList.addEventListener('click', doneFunc);
  rmvBtn.addEventListener('click', removeTask);
  important.addEventListener('click', importantFun);

  taskName.value = '';
  taskName.blur();
};

addButton.addEventListener('click', addTask);

// Emtpy task message avoider ⤵
const avoidMessage = () => {
  message.style.opacity = '0';
};
avoiderMessageBtn.addEventListener('click', avoidMessage);

// Adding task and Avoiding message by keyboard ⤵
document.addEventListener('keydown', e => {
  e.key === 'Enter' && addTask();
  e.key === 'Escape' && avoidMessage();
});

/////////////////////////////
// Line through from task ⤵
const doneFunc = e => {
  setTimeout(() => {
    e.target.classList.toggle('checked');
  }, 500);
};
allTasks.forEach(li => li.addEventListener('click', doneFunc));

///////////////////////////
// Maker task important ⤵
const importantFun = e => {
  const taskOfBtn = e.target.closest('.to-do');
  setTimeout(() => {
    taskOfBtn.classList.remove('checked');
    taskOfBtn.classList.toggle('important');
  }, 500);
};
allTasks.forEach(li => li.addEventListener('click', importantFun));

//////////////////////////////
// Remover task from list ⤵
const removeTask = e => {
  const listInCont = e.target.closest('.to-do');
  setTimeout(() => listInCont.remove(), 1000);
};

removeBtns.forEach(eachBtn => eachBtn.addEventListener('click', removeTask));

/////////////////////////////
// Date of created new list  ⤵
const now = new Date();

const opsDate = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
};

const dateEnter = new Intl.DateTimeFormat('en-UK', opsDate).format(now);

const opsTime = {
  minute: 'numeric',
  hour: 'numeric',
};

const dateTime = new Intl.DateTimeFormat('en-UK', opsTime).format(now);
date.textContent = `${dateEnter} - `;

/////////////////////////////
// CurrentTime of created new list  ⤵
const clock = () => {
  const oclock = () => {
    const nows = new Date();
    const ops = {
      hour: 'numeric',
      minute: 'numeric',
      // second: 'numeric',
    };
    time.textContent = new Intl.DateTimeFormat('en-UK', ops).format(nows);
  };
  oclock();
  const wantedFunc = setInterval(oclock, 1000);
  return wantedFunc;
};
clock();

//////////////////////////////
// Reminding losing information before closing the page ↙
window.addEventListener('beforeunload', function (e) {
  e.returnValue = '';
});
