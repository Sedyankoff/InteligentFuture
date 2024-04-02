let eventIdCounter = parseInt(localStorage.getItem("eventIdCounter")) || 1;
let events = JSON.parse(localStorage.getItem("events")) || [];

document.addEventListener('DOMContentLoaded', function() {
    var dropdownButton1 = document.getElementById('dropdown1');
    var dropdownButton2 = document.getElementById('dropdown2');
    var dropdownButton3 = document.getElementById('dropdown3');
    var dropdownButton4 = document.getElementById('dropdown4');
    var dropdownButton5 = document.getElementById('dropdown5');
    var dropdownContent = document.getElementById('dropdownContent');
    var dropdownContent1 = document.getElementById('dropdownContent1');
    var dropdownContent2 = document.getElementById('dropdownContent2');
    var dropdownContent3 = document.getElementById('dropdownContent3');
    var dropdownContent4 = document.getElementById('dropdownContent4');

    dropdownButton1.addEventListener('click', function() {
        if (dropdownContent.style.display === 'flex') {
            dropdownContent.style.display = 'none';
        } else {
            dropdownContent.style.display = 'flex';
            dropdownContent.style.flexDirection = "column";
        }
    });

    dropdownButton2.addEventListener('click', function() {
        if (dropdownContent1.style.display === 'flex') {
            dropdownContent1.style.display = 'none';
        } else {
            dropdownContent1.style.display = 'flex';
            dropdownContent1.style.flexDirection = "column";
        }
    });

    dropdownButton3.addEventListener('click', function() {
        if (dropdownContent2.style.display === 'flex') {
            dropdownContent2.style.display = 'none';
        } else {
            dropdownContent2.style.display = 'flex';
            dropdownContent2.style.flexDirection = "column";
        }
    });

    dropdownButton4.addEventListener('click', function() {
        if (dropdownContent3.style.display === 'flex') {
            dropdownContent3.style.display = 'none';
        } else {
            dropdownContent3.style.display = 'flex';
            dropdownContent3.style.flexDirection = "column";
        }
    });

    dropdownButton5.addEventListener('click', function() {
        if (dropdownContent4.style.display === 'flex') {
            dropdownContent4.style.display = 'none';
        } else {
            dropdownContent4.style.display = 'flex';
            dropdownContent4.style.flexDirection = "column";
        }
    });
});

function isAdmin() {
    var isLogged = localStorage.getItem("isLogged");

    if (isLogged !== null) {
        if (isLogged !== "admin@email") {
            document.getElementById("teacheradd-section").remove();
            document.getElementById("teacher-section").remove();
            document.getElementById("eventadd-section").remove();
            document.getElementById("event-info").remove();
        }
    } else {
        document.getElementById("teacheradd-section").remove();
        document.getElementById("teacher-section").remove();
        document.getElementById("eventadd-section").remove();
        document.getElementById("event-info").remove();
    }
}

function participate() {
    if (localStorage.getItem("isLogged") !== null) {
        document.getElementById("result-resource").innerHTML = "Успешно записване!";
    } else {
        window.location.href = "login.html";
    }
}

function fillCategories() {
    var events = JSON.parse(localStorage.getItem("events")) || [];
    var dropdownContent = document.getElementById("dropdownContent");
    var dropdownContent1 = document.getElementById("dropdownContent1");
    var dropdownContent2 = document.getElementById("dropdownContent2");
    var dropdownContent3 = document.getElementById("dropdownContent3");
    var dropdownContent4 = document.getElementById("dropdownContent4");

    dropdownContent.innerHTML = "";
    dropdownContent1.innerHTML = "";
    dropdownContent2.innerHTML = "";
    dropdownContent3.innerHTML = "";
    dropdownContent4.innerHTML = "";

    events.forEach(function(event) {
        addButtonToDropdown(event);
    });
}

function getImageFromIndexedDB(eventId){
    return new Promise((resolve, reject) => {
        let request = indexedDB.open("ImageDataDB", 1);

        request.onerror = function(event) {
            reject("IndexedDB error: " + event.target.errorCode);
        };

        request.onsuccess = function(event) {
            let db = event.target.result;
            let transaction = db.transaction(["images"], "readonly");
            let objectStore = transaction.objectStore("images");
            let getRequest = objectStore.get(eventId);

            getRequest.onsuccess = function(event) {
                let imageData = event.target.result;
                if (imageData) {
                    resolve(imageData);
                } else {
                    reject("Image data not found for eventId: " + eventId);
                }
            };

            getRequest.onerror = function(event) {
                reject("Error fetching image data from IndexedDB: " + event.target.error);
            };
        };
    });
}

function addButtonToDropdown(event) {
    var dropdownId = getDropdownId(event.category);
    var dropdownContent = document.getElementById(dropdownId);
    
    var button = document.createElement("button");
    button.className = "animated";
    button.textContent = event.title;
    button.onclick = function() {
        document.getElementById("chosenHeader").innerHTML = event.title;
        document.getElementById("teacherInfo").innerHTML = event.teacher;
        document.getElementById("startDateInfo").innerHTML = event.date;
        document.getElementById("descriptionInfo").innerHTML = event.description;
        dropdownContent.style.display = "none";
        
        var infoImage = document.getElementById("info-image");
        
        getImageFromIndexedDB(event.id)
            .then(imageData => {
                infoImage.src = URL.createObjectURL(imageData);
                infoImage.alt = "Event Image";
            })
            .catch(error => {
                console.error("Error fetching image:", error);
            });
    };

    dropdownContent.appendChild(button);
}


function getDropdownId(category) {
    switch (category) {
        case "Лекции":
            return "dropdownContent";
        case "Упражнения":
            return "dropdownContent1";
        case "Семинари":
            return "dropdownContent2";
        case "Курсове":
            return "dropdownContent3";
        case "Стаж":
            return "dropdownContent4";
        default:
            return null;
    }
}

document.addEventListener('click', function(event) {
    var dropdowns = document.querySelectorAll('.dropdown-content');
    var targetElement = event.target;

    dropdowns.forEach(function(dropdown) {
        var button = dropdown.previousElementSibling;
        if (button.contains(targetElement)) {
            return;
        }
        if (!dropdown.contains(targetElement)) {
            dropdown.style.display = 'none';
        }
    });
});

function addTeacher() {
    var teacherName = document.getElementById('teacherName').value;
    var teacherEmail = document.getElementById('teacherEmail').value;
    var teacherPhone = document.getElementById('teacherPhone').value;
    var result = document.getElementById("result-teacher");

    if (teacherName === "") {
        result.innerHTML = "Моля въведете име!";
        return false;
    } else if (teacherEmail === "") {
        result.innerHTML = "Моля въведете имейл!";
        return false;
    } else if (teacherPhone === "") {
        result.innerHTML = "Моля въведете телефон!";
        return false;
    }

    var teacher = {
        name: teacherName,
        email: teacherEmail,
        phone: teacherPhone
    };

    var teachers = JSON.parse(localStorage.getItem('teachers')) || [];
    teachers.push(teacher);
    document.addEventListener('DOMContentLoaded', function() {
        fillTeachersDropdown();
    });
    localStorage.setItem('teachers', JSON.stringify(teachers));

    document.getElementById('teacherName').value = '';
    document.getElementById('teacherEmail').value = '';
    document.getElementById('teacherPhone').value = '';
    fillTeachersDropdown();
    displayTeachers();
}

fillCategories();

function displayTeachers() {
    const teacherList = document.getElementById("teacherList");

    teacherList.innerHTML = "";

    const teachers = JSON.parse(localStorage.getItem("teachers")) || [];

    teachers.forEach((teacher) => {
        let listItem = document.createElement("li");
        listItem.innerHTML =
            `<strong>${teacher.name}</strong> - 
            Email: ${teacher.email}, 
            Phone: ${teacher.phone}`;

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Изтриване";
        deleteButton.className = "delete-button";
        deleteButton.onclick = function () {
            deleteTeacher(teacher.id);
            listItem.remove();
            fillTeachersDropdown();
        };

        listItem.appendChild(deleteButton);

        teacherList.appendChild(listItem);
    });
}

displayTeachers();

function deleteTeacher(teacherId) {
    let teachers = JSON.parse(localStorage.getItem("teachers")) || [];

    const index = teachers.findIndex((teacher) => teacher.id === teacherId);

    if (index !== -1) {
        teachers.splice(index, 1);
        localStorage.setItem("teachers", JSON.stringify(teachers));
        document.getElementById("eventTeacher").innerHTML = "";
        var defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Избери преподавател";
        defaultOption.disabled = true;
        defaultOption.selected = true;
        document.getElementById("eventTeacher").appendChild(defaultOption);
    }
    fillTeachersDropdown();
    displayTeachers();
}

function displayEvents() {
    const eventList = document.getElementById("eventList");

    eventList.innerHTML = "";

    const events = JSON.parse(localStorage.getItem("events")) || [];

    events.forEach((event) => {
        let listItem = document.createElement("li");
        listItem.innerHTML =
            `<strong>${event.title}</strong> - 
            ${event.description} на
            ${event.date}`;

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Изтриване";
        deleteButton.className = "delete-button";
        deleteButton.onclick = function () {
            deleteEvent(event.id);
            listItem.remove();
        };

        listItem.appendChild(deleteButton);

        eventList.appendChild(listItem);
    });
}

displayEvents();

function deleteEvent(eventId) {
    let eventIndex = events.findIndex((event) => event.id === eventId);

    if (eventIndex !== -1) {
        events.splice(eventIndex, 1);
        
        eventIdCounter--;

        localStorage.setItem("events", JSON.stringify(events));
        localStorage.setItem("eventIdCounter", eventIdCounter);

        deleteImageFromIndexedDB(eventId);
    }

    fillCategories();
    displayEvents();
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

function addEvent() {
    let date = document.getElementById("eventDate").value;
    let title = document.getElementById("eventTitle").value;
    let description = document.getElementById("eventDescription").value;
    let imageInput = document.getElementById("imageInput");
    let category = document.getElementById("eventCategory").options[document.getElementById("eventCategory").selectedIndex].textContent;
    let teacher = document.getElementById("eventTeacher").options[document.getElementById("eventTeacher").selectedIndex].textContent;

    const resultElement = document.getElementById("result-event");

    if (date === "") {
        resultElement.innerHTML = "Моля въведете дата!";
        return false;
    }else if (category === "Избери категория") {
        resultElement.innerHTML = "Моля изберете категория!";
        return false;
    }else if (teacher === "Избери преподавател") {
        resultElement.innerHTML = "Моля изберете преподавател!";
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

        document.getElementById("eventDate").value = "";
        document.getElementById("eventTitle").value = "";
        document.getElementById("eventDescription").value = "";
        document.getElementById("eventCategory").value = "";
        document.getElementById("eventTeacher").value = "";
        document.getElementById("imageInput").value = "";
        fillCategories();
        fillTeachersDropdown();
        displayEvents();
    }
}

function saveImageToIndexedDB(imageFile, eventId) {
    return new Promise((resolve, reject) => {
        let request = indexedDB.open("ImageDataDB", 1);

        request.onerror = function(event) {
            reject("IndexedDB error: " + event.target.errorCode);
        };

        request.onsuccess = function(event) {
            let db = event.target.result;
            let transaction = db.transaction(["images"], "readwrite");
            let objectStore = transaction.objectStore("images");

            let blob = new Blob([imageFile], { type: imageFile.type });

            putObject(objectStore, blob, eventId)
                .then(() => {
                    resolve("Image added to IndexedDB: " + eventId);
                })
                .catch(error => {
                    reject("Error adding image to IndexedDB: " + error);
                });
        };

        request.onupgradeneeded = function(event) {
            let db = event.target.result;
            if (!db.objectStoreNames.contains("images")) {
                let objectStore = db.createObjectStore("images", { autoIncrement: true });
                objectStore.createIndex("eventId", "eventId", { unique: true });
            }
        };
    });
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

function fillTeachersDropdown() {
    var teachers = JSON.parse(localStorage.getItem("teachers")) || [];
    var teacherDropdown = document.getElementById("eventTeacher");

    teacherDropdown.innerHTML = "";

    var placeholderOption = document.createElement("option");
    placeholderOption.text = "Избери преподавател";
    placeholderOption.disabled = true;
    placeholderOption.selected = true;
    teacherDropdown.appendChild(placeholderOption);

    teachers.forEach(function(teacher) {
        var option = document.createElement("option");
        option.text = teacher.name;
        teacherDropdown.add(option);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    fillTeachersDropdown();
});
