const frm = document.querySelector("#add-task-form");
const taskList = document.querySelector("#task-list");

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
    const taskText = document.createElement("p");

    taskText.textContent = taskInputValue;
    task.append(taskText);

    taskInput.value = "";
    taskList.append(task);
  });
};

registerTaskSubmit(frm);
