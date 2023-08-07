const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const showAllButton = document.getElementById("showAll");
const showCompletedButton = document.getElementById("showCompleted");

addTaskButton.addEventListener("click", () => {
    const taskDescription = taskInput.value.trim();
    if (taskDescription !== "") {
        const li = document.createElement("li");
        const createdAt = new Date().toLocaleString(); // Get the current date and time
        li.innerHTML = `
            <input type="checkbox">
            <span>${taskDescription}</span>
            <span class="created-at">${createdAt}</span>
            <button>Remove</button>
        `;
        taskList.appendChild(li);
        taskInput.value = "";

        li.querySelector("button").addEventListener("click", () => {
            taskList.removeChild(li);
        });

        li.querySelector("input[type='checkbox']").addEventListener("change", () => {
            li.classList.toggle("completed");
        });
    }
});

showAllButton.addEventListener("click", () => {
    const tasks = document.querySelectorAll("li");
    tasks.forEach(task => {
        task.style.display = "flex";
    });
});

showCompletedButton.addEventListener("click", () => {
    const tasks = document.querySelectorAll("li");
    tasks.forEach(task => {
        if (task.classList.contains("completed")) {
            task.style.display = "flex";
        } else {
            task.style.display = "none";
        }
    });
});


taskList.addEventListener("dblclick", (event) => {
    const targetElement = event.target;
    if (targetElement.tagName === "SPAN") {
        const li = targetElement.parentElement;
        const taskText = targetElement.textContent;
        targetElement.style.display = "none";
        const inputElement = document.createElement("input");
        inputElement.type = "text";
        inputElement.value = taskText;
        li.insertBefore(inputElement, targetElement);

        inputElement.addEventListener("blur", () => {
            targetElement.style.display = "inline";
            const editedText = inputElement.value.trim();
            if (editedText !== "") {
                targetElement.textContent = editedText;
            }
            li.removeChild(inputElement);
        });

        inputElement.focus();
    }
});
