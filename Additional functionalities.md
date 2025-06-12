const inputbox = document.getElementById("input-box");
const listcontainer = document.getElementById("list-container");

// Add task on button click or Enter key
inputbox.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

function addTask() {
  const taskText = inputbox.value.trim();
  if (taskText === '') {
    alert("You must enter something!");
    return;
  }

  const li = document.createElement("li");
  li.textContent = taskText;

  // Add delete button
  const span = document.createElement("span");
  span.textContent = "\u00d7";
  li.appendChild(span);

  listcontainer.appendChild(li);

  inputbox.value = "";
  saveData();
}

// Event delegation for clicks inside the list
listcontainer.addEventListener("click", function (e) {
  const target = e.target;

  if (target.tagName === "LI") {
    // Toggle complete
    target.classList.toggle("checked");

    if (target.classList.contains("checked")) {
      listcontainer.appendChild(target); // Move to bottom
    } else {
      // Move above first completed task
      const items = listcontainer.querySelectorAll("li");
      for (let i = 0; i < items.length; i++) {
        if (items[i] !== target && items[i].classList.contains("checked")) {
          listcontainer.insertBefore(target, items[i]);
          break;
        }
      }
    }
    saveData();

  } else if (target.tagName === "SPAN") {
    // Delete task
    const li = target.parentElement;
    li.remove();
    saveData();
  }
});

// Event delegation for double-click to edit task
listcontainer.addEventListener("dblclick", function (e) {
  const target = e.target;
  if (target.tagName === "LI") {
    const li = target;
    const currentText = li.firstChild.textContent.trim();

    const input = document.createElement("input");
    input.type = "text";
    input.value = currentText;
    input.style.width = "80%";
    input.style.fontSize = "16px";
    input.style.padding = "5px";

    li.innerHTML = "";
    li.appendChild(input);

    // Focus input and place cursor at the end initially
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);

    function finishEdit() {
      if (input.value.trim()) {
        li.innerHTML = input.value.trim();
        const span = document.createElement("span");
        span.textContent = "\u00d7";
        li.appendChild(span);
      } else {
        li.remove();
      }
      saveData();
    }

    input.addEventListener("blur", finishEdit);
    input.addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        input.blur();
      }
    });
  }
});

// Save to localStorage
function saveData() {
  localStorage.setItem("data", listcontainer.innerHTML);
}

// Load from localStorage
function showTask() {
  const data = localStorage.getItem("data");
  if (data) {
    listcontainer.innerHTML = data;
  }
}

showTask();

// Simpler one
// listcontainer.addEventListener("click", function(e){
//     if(e.target.tagName === "LI"){
//         e.target.classList.toggle("checked");
//         saveData();
//     }
//     else if(e.target.tagName === "SPAN"){
//         e.target.parentElement.remove();
//         saveData();
//     }
// }, false);