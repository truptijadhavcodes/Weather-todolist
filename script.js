const inputTask = document.getElementById("inputTask");
const addTaskBtn = document.getElementById("AddTaskBtn");
const taskList = document.getElementById("TaskList");
const taskCounts = document.getElementById("TaskCounts");
const allBtn = document.getElementById("AllBtn");
const completedBtn = document.getElementById("CompletedBtn");
const remainingBtn = document.getElementById("RemainingBtn");

let tasks = [];
let currentFilter = "all";

function addTask() {
    const text = inputTask.value.trim();

    if (text === "") {
        alert("Please enter a task!");
        return;
    }

    const task = {
        text: text,
        completed: false
    };

    tasks.push(task);
    inputTask.value = "";

    showTasks();
}

function showTasks() {
    taskList.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];

        if (currentFilter === "completed" && !task.completed) {
            continue;
        }

        if (currentFilter === "remaining" && task.completed) {
            continue;
        }

        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", function () {
            task.completed = checkbox.checked;
            showTasks();
        });

        const span = document.createElement("span");
        span.textContent = task.text;

        if (task.completed) {
            span.style.textDecoration = "line-through";
        }

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", function () {
            tasks.splice(tasks.indexOf(task), 1);
            showTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    }

    updateCounts();
}

function updateCounts() {
    let completed = 0;

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].completed) {
            completed++;
        }
    }

    const remaining = tasks.length - completed;

    taskCounts.textContent =
        "Total: " + tasks.length +
        " | Completed: " + completed +
        " | Remaining: " + remaining;
}

addTaskBtn.addEventListener("click", addTask);

allBtn.addEventListener("click", function () {
    currentFilter = "all";
    showTasks();
});

completedBtn.addEventListener("click", function () {
    currentFilter = "completed";
    showTasks();
});

remainingBtn.addEventListener("click", function () {
    currentFilter = "remaining";
    showTasks();
});

inputTask.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

showTasks();


function getWeather() {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=18.5204&longitude=73.8567&current=temperature_2m,relative_humidity_2m,wind_speed_10m")
        .then(response => response.json())
        .then(data => {
            document.getElementById("temperature").textContent =
                data.current.temperature_2m + "°C";

            document.getElementById("humidity").textContent =
                data.current.relative_humidity_2m;

            document.getElementById("windSpeed").textContent =
                data.current.wind_speed_10m;

            document.getElementById("weatherStatus").textContent =
                "Pune Weather";
        });
}

getWeather();

document.getElementById("refreshWeatherBtn").addEventListener("click", getWeather);
