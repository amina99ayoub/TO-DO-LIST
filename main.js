const nameInput = document.getElementById("name");
const todoForm = document.getElementById("new-todo-form");
const contentInput = document.getElementById("content");
const todoList = document.getElementById("todo-list");
let todos = JSON.parse(localStorage.getItem("todos")) || [];

nameInput.addEventListener("input", () => {
    const name = nameInput.value.trim();
    localStorage.setItem("userName", name);
    nameInput.placeholder = name ? `Hello, ${name}!` : "Name here";
});

const savedName = localStorage.getItem("userName");
if (savedName) {
    nameInput.value = savedName;
    nameInput.placeholder = `Hello, ${savedName}!`;
}
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
    todoList.innerHTML = ""; 

    todos.forEach((todo, index) => {
        const todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");
        if (todo.completed) todoItem.classList.add("completed");


        const content = document.createElement("div");
        content.classList.add("content");

    
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;
        checkbox.addEventListener("change", () => {
            todo.completed = checkbox.checked;
            saveTodos();
            renderTodos();
        });
        const input = document.createElement("input");
        input.type = "text";
        input.value = todo.content;
        input.readOnly = true;

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => {
            if (editButton.textContent === "Edit") {
                input.readOnly = false;
                input.focus();
                editButton.textContent = "Save";
            } else {
                const updatedContent = input.value.trim();
                if (updatedContent === "") {
                    alert("Todo content cannot be empty!");
                    input.focus();
                } else {
                    todo.content = updatedContent;
                    input.readOnly = true;
                    editButton.textContent = "Edit";
                    saveTodos();
                    renderTodos();
                }
            }
        });

        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            todos.splice(index, 1);
            saveTodos();
            renderTodos();
        });

        // Append elements
        content.appendChild(checkbox);
        content.appendChild(input);
        todoItem.appendChild(content);
        todoItem.appendChild(editButton);
        todoItem.appendChild(deleteButton);
        todoList.appendChild(todoItem);
    });
}

// Add new todo
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const content = contentInput.value.trim();
    const category = document.querySelector('input[name="category"]:checked');

    if (!content) {
        alert("Please enter a todo.");
        return;
    }
    if (!category) {
        alert("Please select a category.");
        return;
    }

    const newTodo = {
        content: content,
        category: category.value,
        completed: false,
        createdAt: new Date().toISOString(),
    };

    todos.push(newTodo);
    saveTodos();
    renderTodos();
    todoForm.reset(); 
});

renderTodos();
