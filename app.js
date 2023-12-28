// elementlerçi çek

const form = document.querySelector("#todoAddForm");
const addInput=document.querySelector("#todoName");
const todoList=document.querySelector(".list-group");
const firstCard=document.querySelectorAll(".card-body")[0];
const clearButton=document.querySelector("#clearButton");
const search=document.querySelector("#todoSearch");


let todos=[];

runEvents()

function runEvents(){
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",pageLoaded);
    todoList.addEventListener("click", removeTodoUI);
    clearButton.addEventListener("click",removeAllUI);
    search.addEventListener("keyup",filter);
}

function filter(e){
   const ınputvalue = e.target.value.toLowerCase().trim();
   const todoLists=document.querySelectorAll(".list-group-item")
   if(todoLists.length>0){
        todoLists.forEach(function(todo){
           
            if(todo.textContent.toLowerCase().trim().includes(ınputvalue)){
                todo.setAttribute("style","display: block")
            }else{
                todo.setAttribute("style","display: none ! important")
            }

        })
   }else{
    showMessage("warning","arama yapmak için lütfen todo ekleyin") 
   }
}


function removeAllUI(){
    const todolist=document.querySelectorAll(".list-group-item");
    if(todolist.length>0){
        todolist.forEach(function(todo){
            todo.remove()
        })
        showMessage("success","tüm todo silindi")
        // storageden silme
        todos=[];
        localStorage.setItem("todos",JSON.stringify(todos));
    }else{
        showMessage("warning","lütfen en az bir todo ekleyin")
    }
}

function removeTodoUI(e){
    if(e.target.className==="fa fa-remove"){
        const todo= e.target.parentElement.parentElement
        todo.remove();

        removeTodoFromStorage(todo.textContent);
        showMessage("info","todo silindi")

    }
    
}
function removeTodoFromStorage(todoText) {
    checkTodoFromStorage();
    const todoIndex = todos.indexOf(todoText);
    if (todoIndex !== -1) {
        todos.splice(todoIndex, 1);
        localStorage.setItem("todos", JSON.stringify(todos));
    }
}

function pageLoaded(){
    checkTodoFromStorage()
    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
}

function addTodo(e){
    const inputText=addInput.value.trim();
    if(inputText==null || inputText==""){
        showMessage("warning","lütfen boş bırakmayın")
    }else{
        addTodoToUI(inputText)
        addTodoToStorage(inputText)
        showMessage("success ","Todo eklendi")
    }
    e.preventDefault();
}

function addTodoToUI(newTodo){

    const li =document.createElement("li");
    li.className="list-group-item d-flex justify-content-between";
    li.textContent=newTodo;

    const a =document.createElement("a");
    a.href="#";
    a.className="delete-item"

    const i =document.createElement("i");
    i.className="fa fa-remove"

    a.appendChild(i)
    li.appendChild(a)
    todoList.appendChild(li);

    addInput.value="";
}

function addTodoToStorage(newTodo){
    checkTodoFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function checkTodoFromStorage(){
    if(localStorage.getItem("todos")===null){
        todos= [];
    }else{
        todos= JSON.parse(localStorage.getItem("todos"));
    }
}

function showMessage(type,message){
    const div =document.createElement("div");
    div.className=`alert alert-${type}`;
    div.textContent=message;
    firstCard.appendChild(div);

    setTimeout(function(){
        div.remove();
    },1500);
}


