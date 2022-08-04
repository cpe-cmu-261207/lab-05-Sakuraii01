const inputAdd = document.getElementById("input-add-todo");
const todoCtn = document.getElementById("todo-container");

let loading = true;
inputAdd.onkeyup = (event) => {
  loading = true;
  if (event.key !== "Enter"){
    return 0;
  }else if(inputAdd.value ===""){
    alert("Todo cannot be empty");
  }else{
    addTodo( inputAdd.value , false);
    saveTodo();
    inputAdd.value = "";
  }

  //your code here
};

function addTodo(title, completed) {
  //create a div that holds todo title, done button, delete button
  const div = document.createElement("div");
  div.className = "border-bottom p-1 py-2 fs-2 d-flex";

  //create span for showing title
  const span = document.createElement("span");
  span.innerText = title;
  span.style.textDecoration = completed ? "line-through" : "";
  span.className = "me-3";

  //create done button
  const doneBtn = document.createElement("button");
  doneBtn.innerText = "Done";
  doneBtn.className = "btn btn-success me-2";

  //create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.className = "btn btn-danger";

  //your code here

  deleteBtn.onclick  = () => {
    div.remove();
    saveTodo();
  }

  doneBtn.onclick = () => {
    if(span.style.textDecoration === "line-through"){
      span.style.textDecoration = "none";
    }else{
      span.style.textDecoration = "line-through";
    }
    saveTodo();
  }
  
  //append todo to HTML...
  div.appendChild(span);
  div.appendChild(doneBtn);
  div.appendChild(deleteBtn);
  
  

  if(loading === true){
    todoCtn.insertBefore(div, todoCtn.firstChild);
  }else{
    todoCtn.appendChild(div);
  }
  inputAdd.value = "";
  

  //define buttons event...
  doneBtn.style.visibility = "hidden";
  deleteBtn.style.visibility = "hidden";

  div.onmouseover = () => {
    doneBtn.style.visibility = "visible";
    deleteBtn.style.visibility = "visible";
  }

  div.onmouseout = () => {
    doneBtn.style.visibility = "hidden";
  deleteBtn.style.visibility = "hidden";
  }

}

function saveTodo() {
  const data = [];
  for (const todoDiv of todoCtn.children) {
    //your code here
    const span = todoDiv.children[0];
    const title = span.innerHTML;
    const boolean = span.style.textDecoration == "line-through";
    data.push({
      title:title,
      completed:boolean,
    }); 
  }
  //your code here
  const json = JSON.stringify(data);
  localStorage.setItem('todoListData',json);
}

function loadTodo() {
  loading = false;
  const dataStr = localStorage.getItem("todoListData");
  const data = JSON.parse(dataStr);

  for (const todoobj of data) {
    addTodo(todoobj.title, todoobj.completed);
  }
}

loadTodo();
