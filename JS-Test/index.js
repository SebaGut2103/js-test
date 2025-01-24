const add = document.getElementById("button");
const input = document.getElementById("add-work");
const list = document.getElementById("list");

loadTasks();

input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("button").click();
    }
});


function addTask() {
    const task = input.value.trim();

    if (task) {
        createTaskElement(task);
        input.value = "";
        saveTasks();
    } else {
        alert("Agregue una descripción");
    }
}

add.addEventListener("click", addTask);

function createTaskElement(task) {
    const listItem = document.createElement("li");
    const deleteButton = document.createElement("button");
    const doneButton = document.createElement("button");
    const buttonContainer = document.createElement("div");

    listItem.textContent = task;

    function showButtons() {
        doneButton.textContent = String.fromCodePoint(0x2714);
        doneButton.id = "done";
        deleteButton.textContent = String.fromCodePoint(0x2716);
        deleteButton.id = "delete";
        buttonContainer.appendChild(doneButton);
        buttonContainer.appendChild(deleteButton);
        listItem.appendChild(buttonContainer);
    }

    list.appendChild(listItem);

    showButtons();

    deleteButton.addEventListener("click", function () {
        list.removeChild(listItem);
        saveTasks();
    });

    doneButton.addEventListener("click", function () {
        listItem.innerHTML = "<s>" + listItem.textContent.slice(0, -2) + "</s>";
        listItem.style.backgroundColor = "gray";
        showButtons();
        saveTasks();
    });

}

async function saveTasks() {
    let tasks = [];

    list.querySelectorAll("li").forEach(function (item) {
        const taskText = item.childNodes[0].textContent;
        tasks.push(taskText);
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));

}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(createTaskElement);
}

const saveWork  = async ()=>{
    try{
        const response = await fetch("http://localhost:3000/Tareas",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                title:input
            })
        });
        input =  await response.json(input)
            
    }
}