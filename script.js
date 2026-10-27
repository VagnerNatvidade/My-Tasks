const frm = document.querySelector("#add-task-form");
const taskList = document.querySelector("#task-list");
const pendingBtn = document.querySelector("#pending");
const doneBtn = document.querySelector("#done");
const allTasksBtn = document.querySelector("#all");
const clearCompletedTaskBtn = document.querySelector("#clean-btn");
const counterView = document.querySelector("#counter-view");
const totalTask = document.querySelector("#total-task");
const filterButtons = document.querySelectorAll("#filter-container button");

let activeFilter = "all";

const updateCounter = () => {
  const tasksArray = Array.from(document.querySelectorAll("#task-list li"));

  const completedTasks = tasksArray.filter((task) => {
    return task.classList.contains("completed");
  });

  totalTask.textContent = tasksArray.length;
  counterView.textContent = completedTasks.length;
};

const applyFilter = () => {
  const tasks = document.querySelectorAll("#task-list li");

  tasks.forEach((li) => {
    const isCompleted = li.classList.contains("completed");

    if (activeFilter === "pending") {
      if (isCompleted) {
        li.style.display = "none";
      } else {
        li.style.display = "flex";
      }
    } else if (activeFilter === "done") {
      if (!isCompleted) {
        li.style.display = "none";
      } else {
        li.style.display = "flex";
      }
    } else {
      li.style.display = "";
    }
  });
};

const updateActiveButton = () => {
  filterButtons.forEach((button) => {
    button.classList.remove("active");
  });

  const selectedButton = document.querySelector(`#${activeFilter}`);

  selectedButton.classList.add("active");
};

const updateUI = () => {
  updateCounter();
  applyFilter();
  updateActiveButton();
};

const registerTaskSubmit = (frm) => {
  frm.addEventListener("submit", (e) => {
    e.preventDefault();

    const taskInput = document.querySelector("#add-task-input");
    const taskInputValue = taskInput.value.trim();

    if (taskInputValue === "") {
      alert("Preencha qual será a tarefa.");
      return;
    }

    const task = document.createElement("li");
    const completeBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");
    const taskText = document.createElement("p");

    completeBtn.classList.add("complete-btn");
    deleteBtn.classList.add("delete-btn");
    completeBtn.textContent = "Concluir";
    deleteBtn.textContent = "Excluir";
    completeBtn.type = "button";
    deleteBtn.type = "button";

    taskText.textContent = taskInputValue;
    task.append(taskText, completeBtn, deleteBtn);

    taskInput.value = "";
    taskList.append(task);

    updateUI();
  });

  taskList.addEventListener("click", (e) => {
    const completeBtn = e.target.closest(".complete-btn");
    const deleteBtn = e.target.closest(".delete-btn");

    if (completeBtn) {
      const task = completeBtn.closest("li");

      task.classList.toggle("completed");

      if (task.classList.contains("completed")) {
        completeBtn.textContent = "Voltar";
      } else {
        completeBtn.textContent = "Concluir";
      }

      updateUI();
    } else if (deleteBtn) {
      const task = deleteBtn.closest("li");

      task.remove();

      updateCounter();
    }
  });
};

allTasksBtn.addEventListener("click", () => {
  activeFilter = "all";

  applyFilter();
  updateActiveButton();
});

pendingBtn.addEventListener("click", () => {
  activeFilter = "pending";

  applyFilter();
  updateActiveButton();
});

doneBtn.addEventListener("click", () => {
  activeFilter = "done";

  applyFilter();
  updateActiveButton();
});

clearCompletedTaskBtn.addEventListener("click", () => {
  const tasks = document.querySelectorAll("#task-list li");

  tasks.forEach((li) => {
    const isCompleted = li.classList.contains("completed");

    if (isCompleted) {
      li.remove();
    }
  });

  updateCounter();
});

registerTaskSubmit(frm);
