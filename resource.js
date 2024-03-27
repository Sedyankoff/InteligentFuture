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
    var events = localStorage.getItem("events");
    var event = JSON.parse(events);
    for (var i = 0; i < event.length; i++) {
        addButtonToDropdown(event[i]);
    }
}

function addButtonToDropdown(event) {
    var dropdownId = getDropdownId(event.category);
    var dropdownContent = document.getElementById(dropdownId);
    
    var button = document.createElement("button");
    button.className = "animated";
    button.textContent = event.title;
    button.onclick = function() {
        document.getElementById("teacherInfo").innerHTML = "";
        document.getElementById("startDateInfo").innerHTML = event.date;
        document.getElementById("descriptionInfo").innerHTML = event.description;
        dropdownContent.style.display = "none";
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
    localStorage.setItem('teachers', JSON.stringify(teachers));

    document.getElementById('teacherName').value = '';
    document.getElementById('teacherEmail').value = '';
    document.getElementById('teacherPhone').value = '';
    displayTeachers();
}

fillCategories();

function displayTeachers() {
    const reminderList = document.getElementById("reminderList");

    reminderList.innerHTML = "";

    const teachers = JSON.parse(localStorage.getItem("teachers")) || [];

    teachers.forEach((teacher) => {
        let listItem = document.createElement("li");
        listItem.innerHTML =
            `<strong>${teacher.name}</strong> - 
            Email: ${teacher.email}, 
            Phone: ${teacher.phone}`;

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";
        deleteButton.onclick = function () {
            deleteTeacher(teacher.id);
            listItem.remove();
        };

        listItem.appendChild(deleteButton);

        reminderList.appendChild(listItem);
    });
}

displayTeachers();

function deleteTeacher(teacherId) {
    let teachers = JSON.parse(localStorage.getItem("teachers")) || [];

    const index = teachers.findIndex((teacher) => teacher.id === teacherId);

    if (index !== -1) {
        teachers.splice(index, 1);
        localStorage.setItem("teachers", JSON.stringify(teachers));
    }
}
