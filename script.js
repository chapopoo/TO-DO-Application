const inputbox = document.getElementById("input-box");
const listcontainer = document.getElementById("list-container");

inputbox.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask(){
    if(inputbox.value === ''){
        alert("Yous must Enter Something!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputbox.value;
        listcontainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputbox.value = "";
    saveData();
}

listcontainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");

        if (e.target.classList.contains("checked")) {
            listcontainer.appendChild(e.target); // Move to bottom
        } else {
            // Move to the first unchecked position
            const items = listcontainer.querySelectorAll("li");
            for (let i = 0; i < items.length; i++) {
                if (items[i] !== e.target && items[i].classList.contains("checked")) {
                    listcontainer.insertBefore(e.target, items[i]);
                    break;
                }
            }
        }

        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data", listcontainer.innerHTML);
}

function showTask(){
    listcontainer.innerHTML = localStorage.getItem("data");
}
showTask();

