const taskForm = document.getElementById("form");
const taskInput = document.getElementById("add-task");
const taskList = document.getElementById("task-list");
let openTaskOptionsDiv = null;

let tasks = [];

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const taskValue = taskInput.value.trim();

  if (taskValue === "") {
    alert("The input field is empty");
  } else {
    const taskDiv = document.createElement("div");

    const buttonOfTaskDiv = document.createElement("button");
    const imageForButtonOfTaskDiv = document.createElement("img");
    imageForButtonOfTaskDiv.src = "./images/three-img.png";
    buttonOfTaskDiv.appendChild(imageForButtonOfTaskDiv);

    const taskText = document.createElement("p");
    taskText.textContent = taskValue;

    taskDiv.appendChild(taskText);
    taskDiv.appendChild(buttonOfTaskDiv);

    taskList.appendChild(taskDiv);

    taskDiv.classList.add(
      "task-item",
      "w-[343px]",
      "p-2",
      "bg-[#FBF0E4]",
      "rounded-[10px]",
      "flex",
      "flex-col",
      "break-words",
      "gap-[10px]",
      "relative",
    );

    buttonOfTaskDiv.addEventListener("click", (e) => {
      e.stopPropagation();

      if (openTaskOptionsDiv) {
        openTaskOptionsDiv.remove();
        openTaskOptionsDiv = null;
      }

      const taskOptionsDiv = document.createElement("div");

      taskOptionsDiv.classList.add(
        "flex",
        "flex-col",
        "w-[188px]",
        "h-[150px]",
        "bg-[#F6F6F7]",
        "absolute",
        "right-[0px]",
        "top-[65px]",
        "rounded-[8px]",
        "p-[8px_14px]",
        "gap-[10px]",
        "shadow-inputShadow",
        "z-[1]",
      );

      // Importance button
      const importanceButton = document.createElement("button");
      const imgForImportanceBtn = document.createElement("img");
      imgForImportanceBtn.src = "./images/importamce-img.png";
      const importanceSpan = document.createElement("span");
      importanceSpan.textContent = "Importance";
      importanceButton.appendChild(imgForImportanceBtn);
      importanceButton.appendChild(importanceSpan);
      importanceButton.classList.add("flex", "gap-[12px]", "items-center");
      importanceSpan.classList.add("text-[14px]");

      // Complete button
      const completeButton = document.createElement("button");
      const imgForcompleteBtn = document.createElement("img");
      imgForcompleteBtn.src = "./images/mark-completed-img.png";
      const completeSpan = document.createElement("span");
      completeSpan.textContent = "Complete";
      completeButton.appendChild(imgForcompleteBtn);
      completeButton.appendChild(completeSpan);
      completeButton.classList.add("flex", "gap-[12px]", "items-center");
      completeSpan.classList.add("text-[14px]");

      // Edit button
      const editButton = document.createElement("button");
      const imgForeditBtn = document.createElement("img");
      imgForeditBtn.src = "./images/redact-img.png";
      const editSpan = document.createElement("span");
      editSpan.textContent = "Edit";
      editButton.appendChild(imgForeditBtn);
      editButton.appendChild(editSpan);
      editButton.classList.add("flex", "gap-[12px]", "items-center");
      editSpan.classList.add("text-[14px]");

      // Delete button
      const deleteButton = document.createElement("button");
      const imgFordeleteBtn = document.createElement("img");
      imgFordeleteBtn.src = "../images/delete-img.png";
      const deleteSpan = document.createElement("span");
      deleteSpan.textContent = "Delete";
      deleteButton.appendChild(imgFordeleteBtn);
      deleteButton.appendChild(deleteSpan);
      deleteButton.classList.add("flex", "gap-[12px]", "items-center");
      deleteSpan.classList.add("text-[14px]");

      // Add functions to the buttons:
      importanceButton.addEventListener("click", () => {
        taskDiv.classList.toggle("bg-amber-300");
        taskOptionsDiv.remove();
        openTaskOptionsDiv = null;
      });

      completeButton.addEventListener("click", () => {
        taskDiv.classList.toggle("bg-green-100");
        taskOptionsDiv.remove();
        openTaskOptionsDiv = null;
      });

      editButton.addEventListener("click", () => {
        const newTaskValue = prompt("Edit your task:", taskValue);
        if (newTaskValue) {
          taskText.textContent = newTaskValue;
        }
        taskOptionsDiv.remove();
        openTaskOptionsDiv = null;
      });

      deleteButton.addEventListener("click", () => {
        taskDiv.remove();
      });

      taskOptionsDiv.appendChild(importanceButton);
      taskOptionsDiv.appendChild(completeButton);
      taskOptionsDiv.appendChild(editButton);
      taskOptionsDiv.appendChild(deleteButton);

      taskDiv.appendChild(taskOptionsDiv);

      // Store the current open task options div
      openTaskOptionsDiv = taskOptionsDiv;
    });

    // -----------------------------  completed or importance logic          -------------------------------------------------

    const departmentsButton = document.getElementById("departments-part");
    const departmentsWindow = document.getElementById("departments-window");

    departmentsButton.addEventListener("click", (e) => {
      e.stopPropagation();
      departmentsWindow.classList.toggle("hidden");
    });

    document.addEventListener("click", (e) => {
      if (
        !departmentsWindow.contains(e.target) &&
        !departmentsButton.contains(e.target)
      ) {
        if (!departmentsWindow.classList.contains("hidden")) {
          departmentsWindow.classList.add("hidden");
        }
      }
    });

    // ---------------------------------------------------------------------------------------------

    taskInput.value = "";
  }
});

document.addEventListener("click", (e) => {
  // Close the taskOptionsDiv if it's open and the click is outside of it
  if (openTaskOptionsDiv && !openTaskOptionsDiv.contains(e.target)) {
    openTaskOptionsDiv.remove();
    openTaskOptionsDiv = null;
  }
});

// --------------------------------------------------------------------
const searchButton = document.getElementById("search-bar");
const searchInput = document.getElementById("search-input");

searchButton.addEventListener("click", () => {
  if (searchInput.classList.contains("hidden")) {
    searchInput.classList.remove("hidden");
    searchInput.focus();
  } else {
    searchInput.classList.add("hidden");
    searchInput.value = "";
    resetTaskHighlights();
  }
});

// Add event listener for typing in the search input
searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase().trim();
  const tasks = document.querySelectorAll(".task-item");

  tasks.forEach((task) => {
    const taskText = task.querySelector("p").textContent.toLowerCase();

    if (taskText.includes(searchTerm)) {
      task.classList.add("bg-red-200");
    } else {
      task.classList.remove("bg-red-200");
    }
  });
});

function resetTaskHighlights() {
  const tasks = document.querySelectorAll(".task-item");
  tasks.forEach((task) => {
    task.classList.remove("bg-red-200");
  });
}
