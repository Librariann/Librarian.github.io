const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList"),
  toDoListComplete = document.querySelector(".js-toDoList-complete");

const TODOS_LS = "toDos";
const TODOS_COMPLETE_LS = "toDos_complete";

let toDos = [];
let toDosComplete = [];

/**
 * 
 * uuid 발급
 * 
 * @param :
 * @return Math.floor
 * 
 */
function uuid(){
  const randomNumber = Math.random();
  return Math.floor(randomNumber * 1000000);
}


function completeToDo(event){
  const btn = event.target;
  const li = btn.parentNode;
  let completeText = "";
  toDoList.removeChild(li);
  const cleanTask = toDos.filter(function(taskFn) {
    return taskFn.id !== parseInt(li.id);
  });
  
  const completeTask = toDos.filter(function(completeFn) {
      if(completeFn.id === parseInt(li.id)){
          completeText = completeFn.text;
      }
  });
  toDos = cleanTask;
  saveToDos();
  paintComplete(completeText);
}



function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
  });

  toDos = cleanToDos;
  saveToDos();
}

function deleteToDoComplete(event){
  const btn = event.target;
  const li = btn.parentNode;
  toDoListComplete.removeChild(li);
  const cleanToDos = toDosComplete.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
  });

  toDosComplete = cleanToDos;
  saveToDosComplete();
}

function returnToDos(){
  const btn = event.target;
  const li = btn.parentNode;
  let returnToDosText = "";
  toDoListComplete.removeChild(li);
  const cleanTask = toDosComplete.filter(function(taskFn) {
    if(taskFn.id === parseInt(li.id)){
        returnToDosText = taskFn.text;
    }
  });
  
  const completeTask = toDosComplete.filter(function(completeFn) {
      return completeFn.id !== parseInt(li.id);
  });
  toDosComplete = completeTask;
  saveToDosComplete();
  paintToDo(returnToDosText);
}

//SAVE TODO
function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

////SAVE TODO COMPLETE
function saveToDosComplete(){
  localStorage.setItem(TODOS_COMPLETE_LS, JSON.stringify(toDosComplete));
}

function paintToDo(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const completeBtn = document.createElement("button");
  const newId = uuid();
  span.innerText = text;
  delBtn.innerText = "❌";
  completeBtn.innerText = "✅";
  delBtn.addEventListener("click", deleteToDo);
  completeBtn.addEventListener("click", completeToDo);

  //TODO 버튼 생성
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(completeBtn);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function paintComplete(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const completeBtn = document.createElement("button");
  const newId = uuid();
  
  span.innerText = text;
  delBtn.innerText = "❌";
  completeBtn.innerText = "⏪";
  delBtn.addEventListener("click", deleteToDoComplete);
  completeBtn.addEventListener("click", returnToDos);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(completeBtn);
  li.id = newId;
  toDoListComplete.appendChild(li);
  const taskObj = {
    text: text,
    id: newId
  };
  toDosComplete.push(taskObj);
  saveToDosComplete();
}


function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo.text);
    });
  }
}

function loadToDosComplete() {
  const loadedComplete = localStorage.getItem(TODOS_COMPLETE_LS);
  if (loadedComplete !== null) {
    const parsedComplete = JSON.parse(loadedComplete);
    parsedComplete.forEach(function(toDo) {
      paintComplete(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  loadToDosComplete();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();