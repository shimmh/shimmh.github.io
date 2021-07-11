const toDoForm = document.getElementById("todo-form");
const toDoList = document.getElementById("todo-list");
const toDoInput = toDoForm.querySelector("input");
const toDoBtn = document.querySelector("#todo-btn");
const toDoPopup = document.querySelector(".todo-popup");
// localstorage 저장 : json string
// 데이터 관리 : arr
const TODOS_KEY = "todos";
const HIDDEN = "hidden";

// 업데이트 시 배열에 데이터를 저장 후 마자막에 로컬 스토리지에 json string으로 변환 후 저장
// 디비에 저장할 값을 관리한다.
let toDos = [];
let popupChk = true;

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const li = event.target.parentElement;
  li.remove();

  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}
function paintToDo(newToDo) {
  // 배열에서 읽어와 한줄씩  li append.
  const li = document.createElement("li");
  li.id = newToDo.id;
  const button = document.createElement("button");
  const label = document.createElement("label");

  label.innerHTML = `<input type="checkbox"/>${newToDo.text}`;
  button.innerText = "x";
  button.addEventListener("click", deleteToDo);
  li.appendChild(label);
  li.appendChild(button);
  toDoList.appendChild(li);
}

function handleToDo(event) {
  if (event.keyCode == 13) {
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    const newToDoObj = {
      text: newTodo,
      id: Date.now(),
    };
    toDos.push(newToDoObj); //배열에 넣고
    paintToDo(newToDoObj);
    saveToDos();
  }
}

function onShowTodoList(event) {
  event.preventDefault();
  if (popupChk) {
    toDoPopup.classList.remove(HIDDEN);
  } else {
    toDoPopup.classList.add(HIDDEN);
  }
  popupChk = !popupChk;
}

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo); // paintTDo({text:"a", id:121212})
}

toDoForm.addEventListener("keydown", handleToDo);
toDoBtn.addEventListener("click", onShowTodoList);
