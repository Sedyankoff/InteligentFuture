let eventIdCounter = parseInt(localStorage.getItem("eventIdCounter")) || 1;
let events = JSON.parse(localStorage.getItem("events")) || [];

let eventDateInput =
    document.getElementById("eventDate");
let eventTitleInput =
    document.getElementById("eventTitle");
let eventDescriptionInput =
    document.getElementById("eventDescription");
let eventCategoryInput =
    document.getElementById("eventCategory");
let eventTeacherInput =
    document.getElementById("eventTeacher");
let reminderList =
    document.getElementById("reminderList");

function addEvent() {
    let date = eventDateInput.value;
    let title = eventTitleInput.value;
    let description = eventDescriptionInput.value;
    let imageInput = document.getElementById("imageInput");
    let category = eventCategoryInput.options[eventCategoryInput.selectedIndex].textContent;
    let teacher = eventTeacherInput.options[eventTeacherInput.selectedIndex].textContent;

    const resultElement = document.getElementById("result-event");

    if (date === "") {
        resultElement.innerHTML = "Моля въведете дата!";
        return false;
    }else if (category === "Избери категория") {
        resultElement.innerHTML = "Моля изберете категория!";
        return false;
    }else if (teacher === "Избери преподавател") {
        resultElement.innerHTML = "Моля изберете учител!";
        return false;
    }else if (title === "") {
        resultElement.innerHTML = "Моля въведете заглавие!";
        return false;
    } else if (description === "") {
        resultElement.innerHTML = "Моля въведете описание!";
        return false;
    }
    else {
        resultElement.innerHTML = "";
        let eventId = eventIdCounter++;

        events.push(
            {
                id: eventId, date: date,
                title: title,
                description: description,
                category: category,
                teacher: teacher
            }
        );

        localStorage.setItem("eventIdCounter", eventIdCounter);
        localStorage.setItem("events", JSON.stringify(events));

        let imageFile = imageInput.files[0];
        if (imageFile) {
                saveImageToIndexedDB(imageFile, eventId)
            .then(message => {
                console.log(message);
            })
            .catch(error => {
                console.error(error);
            });
        }

        showCalendar(currentMonth, currentYear);
        eventDateInput.value = "";
        eventTitleInput.value = "";
        eventDescriptionInput.value = "";
        eventCategoryInput.value = "";
        eventTeacherInput.value = "";
        imageInput.value = "";
        displayReminders();
    }
}

function deleteEvent(eventId) {
    let eventIndex = events.findIndex((event) => event.id === eventId);

    if (eventIndex !== -1) {
        events.splice(eventIndex, 1);
        
        eventIdCounter--;

        localStorage.setItem("events", JSON.stringify(events));
        localStorage.setItem("eventIdCounter", eventIdCounter);

        deleteImageFromIndexedDB(eventId);

        showCalendar(currentMonth, currentYear);
        displayReminders();
    }
}

function saveImageToIndexedDB(imageFile, eventId) {
    return new Promise((resolve, reject) => {
        let request = indexedDB.open("ImageDataDB", 1);

        request.onerror = function(event) {
            reject("IndexedDB error: " + event.target.errorCode);
        };

        request.onsuccess = async function(event) {
            let db = event.target.result;
            let transaction = db.transaction(["images"], "readwrite");
            let objectStore = transaction.objectStore("images");

            let blob = new Blob([imageFile], { type: imageFile.type });

            try {
                await putObject(objectStore, blob, eventId);
                resolve("Image added to IndexedDB: " + eventId);
            } catch (error) {
                reject("Error adding image to IndexedDB: " + error);
            }
        };

        request.onupgradeneeded = function(event) {
            let db = event.target.result;
            db.createObjectStore("images", { autoIncrement: true });
        };
    });
}

function deleteImageFromIndexedDB(eventId) {
    let request = indexedDB.open("ImageDataDB", 1);

    request.onerror = function(event) {
        console.error("IndexedDB error:", event.target.errorCode);
    };

    request.onsuccess = function(event) {
        let db = event.target.result;
        let transaction = db.transaction(["images"], "readwrite");
        let objectStore = transaction.objectStore("images");
        
        let deleteRequest = objectStore.delete(eventId);
        
        deleteRequest.onsuccess = function(event) {
            console.log("Image deleted from IndexedDB:", eventId);
        };
        
        deleteRequest.onerror = function(event) {
            console.error("Error deleting image from IndexedDB:", event.target.error);
        };
    };
}

function putObject(objectStore, blob, eventId) {
    return new Promise((resolve, reject) => {
        let putRequest = objectStore.put(blob, eventId);
        putRequest.onsuccess = function(event) {
            resolve();
        };
        putRequest.onerror = function(event) {
            reject(event.target.error);
        };
    });
}


function populateTeachers() {
    let teachers = JSON.parse(localStorage.getItem("teachers")) || [];
    eventTeacherInput.innerHTML = "";

    let placeholderOption = document.createElement("option");
    placeholderOption.value = "";
    placeholderOption.textContent = "Избери преподавател";
    placeholderOption.disabled = true;
    placeholderOption.selected = true;
    eventTeacherInput.appendChild(placeholderOption);

    teachers.forEach(teacher => {
        let option = document.createElement("option");
        option.textContent = teacher.name; // Assuming teacher object has a 'name' property
        eventTeacherInput.appendChild(option);
    });
}


function displayReminders() {
    reminderList.innerHTML = "";
        for (let i = 0; i < events.length; i++) {
            let event = events[i];
            let eventDate = new Date(event.date);
            if (eventDate.getMonth() ===
                currentMonth &&
                eventDate.getFullYear() ===
                currentYear) {
                let listItem = document.createElement("li");
                listItem.innerHTML =
                    `- <strong>${event.title}</strong> - 
                ${event.description} на
                ${eventDate.toLocaleDateString()}`;
                
                if (localStorage.getItem("isLogged") === "admin@email") {
                    let deleteButton =
                    document.createElement("button");
                    deleteButton.className = "delete-event";
                    deleteButton.textContent = "Изтриване";
                    deleteButton.onclick = function () {
                    deleteEvent(event.id);
                    };
                    listItem.appendChild(deleteButton);
                }
                
                reminderList.appendChild(listItem);
            }
        }
}

function generate_year_range(start, end) {
    let years = "";
    for (let year = start; year <= end; year++) {
        years += "<option value='" +
            year + "'>" + year + "</option>";
    }
    return years;
}

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

let createYear = generate_year_range(1970, 2050);

document.getElementById("year").innerHTML = createYear;

let months = [
    "Януари",
    "Февруари",
    "Март",
    "Април",
    "Май",
    "Юни",
    "Юли",
    "Август",
    "Септември",
    "Октомври",
    "Ноември",
    "Декември"
];
let days = [
    "Нед", "Пон", "Втор", "Сря",
    "Четв", "Пет", "Съб"
];

let $dataHead = "<tr>";
for (let dhead in days) {
    $dataHead += "<th data-days='" +
        days[dhead] + "'>" +
        days[dhead] + "</th>";
}
$dataHead += "</tr>";

document.getElementById("thead-month").innerHTML = $dataHead;

let monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);

function next() {
    currentYear = currentMonth === 11 ?
        currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = currentMonth === 0 ?
        currentYear - 1 : currentYear;
    currentMonth = currentMonth === 0 ?
        11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {
    let firstDay = new Date(year, month, 1).getDay();
    let tbl = document.getElementById("calendar-body");
    tbl.innerHTML = "";
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    let date = 1;
    for (let i = 0; i < 6; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (date > daysInMonth(month, year)) {
                break;
            } else {
                let cell = document.createElement("td");
                cell.setAttribute("data-date", date);
                cell.setAttribute("data-month", month + 1);
                cell.setAttribute("data-year", year);
                cell.setAttribute("data-month_name", months[month]);
                cell.className = "date-picker";
                cell.innerHTML = "<span>" + date + "</span>";

                if (
                    date === today.getDate() &&
                    year === today.getFullYear() &&
                    month === today.getMonth()
                ) {
                    cell.className = "date-picker selected";
                }

                if (hasEventOnDate(date, month, year)) {
                    cell.style.backgroundColor = "#212529";
                    cell.style.color = "#FD9C1A";
                }

                row.appendChild(cell);
                date++;
            }
        }
        tbl.appendChild(row);
    }

    displayReminders();
}

function getEventsOnDate(date, month, year) {
    return events.filter(function (event) {
        let eventDate = new Date(event.date);
        return (
            eventDate.getDate() === date &&
            eventDate.getMonth() === month &&
            eventDate.getFullYear() === year
        );
    });
}

function hasEventOnDate(date, month, year) {
    return getEventsOnDate(date, month, year).length > 0;
}

function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}

function isAdmin() {
    var isLogged = localStorage.getItem("isLogged");
    var reminderSection = document.getElementById("reminder-section");
    var reminderList = document.getElementById("reminderList");

    if (isLogged !== null) {
        if (isLogged !== "admin@email") {
            reminderList.style.textAlign = "left";
            reminderList.style.padding = "10px";
            reminderSection.style.height = "100vh";
            document.getElementById("event-section").remove();
        }
    } else {
        reminderList.style.textAlign = "left";
            reminderList.style.padding = "10px";
            reminderSection.style.height = "100vh";
            document.getElementById("event-section").remove();
    }
}

showCalendar(currentMonth, currentYear);