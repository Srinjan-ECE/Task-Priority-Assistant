let tasks = [];

const taskForm = document.getElementById("task-form");
const taskTitle = document.getElementById("task-title");
const taskDeadline = document.getElementById("task-deadline");
const taskTime = document.getElementById("task-time");
const clientDetails = document.getElementById("client-details");
const taskList = document.getElementById("task-list");
const prioritizeButton = document.getElementById("prioritize-button");
const liveClock = document.getElementById("live-clock");

// Add Task
taskForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const task = {
        id: Date.now(),
        title: taskTitle.value,
        deadline: new Date(taskDeadline.value),
        time: parseFloat(taskTime.value),
        client: clientDetails.value,
        note: ""
    };

    tasks.push(task);
    taskTitle.value = "";
    taskDeadline.value = "";
    taskTime.value = "";
    clientDetails.value = "";

    renderTasks();
});

// Delete Task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

// Highlight Task
function highlightTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.highlighted = !task.highlighted;
        }
        return task;
    });
    renderTasks();
}

// Add Note
function addNoteToTask(id) {
    const note = prompt("Add your note (max 100 words):");
    if (note && note.split(" ").length <= 100) {
        tasks = tasks.map(task => {
            if (task.id === id) {
                task.note = note;
            }
            return task;
        });
        renderTasks();
    } else {
        alert("Note exceeds 100 words. Please try again.");
    }
}

// Prioritize Tasks
prioritizeButton.addEventListener("click", function () {
    tasks.sort((a, b) => a.deadline - b.deadline);
    renderTasks();
});

// Render Tasks
function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach(task => {
        const listItem = document.createElement("li");
        listItem.className = `task-item ${task.highlighted ? "highlight" : ""}`;
        listItem.innerHTML = `
            <strong>${task.title}</strong> <br>
            Deadline: ${task.deadline.toLocaleString()} <br>
            Estimated Time: ${task.time} hours <br>
            Client: ${task.client || "None"} <br>
            Note: ${task.note || "No notes added."}
            <div class="task-item-actions">
                <button onclick="deleteTask(${task.id})">Delete</button>
                <button onclick="highlightTask(${task.id})">Highlight</button>
                <button onclick="addNoteToTask(${task.id})">Add Note</button>
            </div>
        `;
        taskList.appendChild(listItem);
    });
}

// Live Clock
setInterval(() => {
    const now = new Date();
    liveClock.textContent = now.toLocaleString();
}, 1000);
