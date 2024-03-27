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
    for (var i = 1; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        
        var event = JSON.parse(value);

        if (key.startsWith("events")) {
            var option = document.createElement("button");
            option.className = "animated";
            option.textContent = event.title;
            option.onclick = function() {
                document.getElementById("teacherInfo").innerHTML = "";
                document.getElementById("startDateInfo").innerHTML = "";
                document.getElementById("descriptionInfo").innerHTML = "";
            };

            if (event.category === "Лекции") {
                document.getElementById("dropdownContent").appendChild(option);
            }
            else if (event.category === "Упражнения") {
                document.getElementById("dropdownContent1").appendChild(option);
            }
            else if (event.category === "Семинари") {
                document.getElementById("dropdownContent2").appendChild(option);
            }
            else if (event.category === "Курсове") {
                document.getElementById("dropdownContent3").appendChild(option);
            }
            else {
                document.getElementById("dropdownContent4").appendChild(option);
            }
        }
    }
}