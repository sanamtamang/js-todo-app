const todos = JSON.parse(localStorage.getItem("todos"));

const todosElement = document.querySelector("ul");
const input = document.querySelector("input");
const form = document.querySelector("form");
const searchInput = document.querySelector("#searchInput");

function removeTodo(index){
todos.splice(index,1);
render();
localStorage.setItem("todos", JSON.stringify(todos));

}
function handleChange(index){
const prevState = todos[index].completed
todos[index].completed =! prevState;
localStorage.setItem("todos", JSON.stringify(todos));


render();
}

function render(_todos = todos){  
    let html = "";
    _todos.forEach((todo,i) => {
        html = html + `<li> 
        ${
            todo.completed
            ? `<input type = 'checkbox' checked onclick = 'handleChange(${i})' />`
            : `<input type ='checkbox'  onclick = 'handleChange(${i})' />`
        }
        
        <span class =  ${todo.completed ?"line-strike": ""}>${todo.title}</span>
        <button onclick ="removeTodo(${i})">X</button></li>`;   
    } 
    )
       
        
    
    todosElement.innerHTML = html;
}

render();

const searchTodo = () => {
    const filtered = todos.filter( todo => {
        return todo.title.toLowerCase().includes(searchInput.value.toLowerCase());
    });

    render(filtered        );
};


function addTodo (event){
    event.preventDefault();
    const newTodo = input.value;
    if (newTodo != "") {
        todos.push({title : newTodo, completed : false  });
        render();
        input.value = "";    
        localStorage.setItem("todos", JSON.stringify(todos));
    }
    
    
};              
form.addEventListener("submit", addTodo);
searchInput.addEventListener("keyup", searchTodo);
searchInput.addEventListener("keydown", searchTodo);








