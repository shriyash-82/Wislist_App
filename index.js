function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

let input = document.querySelector('.input');
let addToDoBtn = document.querySelector('.button');
let showTodos = document.querySelector(".todos-container");
let todo;
let todoList = [];

// handling addToDoBtn -
addToDoBtn.addEventListener('click',(e)=>{
     e.preventDefault();
     todo = input.value;
     input.value = "";
     if( todo.length > 0 ) {
        todoList.push({id : uuid(),todo,isCompleted : false})
     }
     localStorage.setItem("todo",JSON.stringify(todoList));
     renderTodos(todoList);
})
// implementing the list part 
showTodos.addEventListener('click',(e)=>{
    e.preventDefault();
   let key = e.target.dataset.key;
   let deleteKey = e.target.dataset.todokey;
   todoList = todoList.map( (todo) => todo.id === key ? {...todo,isCompleted : !todo.isCompleted} : todo);
  // implementing delete button functionality
   todoList = todoList.filter( (todo) => 
     todo.id !== deleteKey
   )
   localStorage.setItem("todo",JSON.stringify(todoList));
   console.log(todoList)
   renderTodos(todoList);
})
function getlocalStorage() {
    const reference = localStorage.getItem("todo");
    if(reference){
      todoList = JSON.parse(reference);
      renderTodos(todoList);
    }
}
getlocalStorage();
function renderTodos(todoLIst){
  showTodos.innerHTML = todoLIst.map( ({id,todo,isCompleted}) => `<div class = "relative" > <input class = "t-checkbox t-pointer" id = "item-${id}" type = "checkbox" ${isCompleted ? "checked" : ""} data-key = ${id}/> <label for = "item-${id}" class = "todo todo-text t-pointer ${isCompleted ? "checked-todo" : ""}" data-key = ${id}>${todo}</label><button class="absolute right-0 button cursor"><span data-todokey=${id}  class="del-btn material-icons-outlined">delete</span>
  </button></div>`)
}
