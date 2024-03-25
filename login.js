function login(event){
    event.preventDefault();
    const email = document.getElementById("email-login").value;
    const password = document.getElementById("password-login").value;

    var admin = {
        names: "Admin",
        email: "admin@email",
        password: "admin"
    }
    localStorage.setItem("admin@email", JSON.stringify(admin));

    const resultElement = document.getElementById("result-login");

    if (email === "") {
        resultElement.innerHTML = "Моля въведете имейл адрес!";
        return false;
    } else if (password === "") {
        resultElement.innerHTML = "Моля въведете парола!";
        return false;
    }

    const target = localStorage.getItem(email);
    if (target === null) {
        resultElement.innerHTML = "Този имейл не е регистриран!";
        return false;
    } else {
        const storedUserData = JSON.parse(localStorage.getItem(email));
        if (password === storedUserData.password) {
            window.location.href = "main.html";
            localStorage.setItem("isLogged", email);
            return topLine();
        }
        else {
            resultElement.innerHTML = "Грешна парола!";
            document.getElementById("password-login").value = "";
            return false;
        }
    }
}

function topLine() {
    const oldLogin = document.getElementById("login");
    const oldRegister = document.getElementById("register");

    if(localStorage.getItem("isLogged") !== null) {
        const loggedEmail = localStorage.getItem("isLogged");
        var loginButton = document.getElementById("login");
        loginButton.style.display = "none";
        var registerButton = document.getElementById("register");
        const userData = JSON.parse(localStorage.getItem(loggedEmail));
        document.getElementById("logged").innerHTML = "Здравейте, " + userData.names + "!";
        registerButton.style.border = "none";
        registerButton.textContent = "Излизане";
        registerButton.style.color = "#FD9C1A";

        registerButton.onmouseover = function() {
            this.style.backgroundColor = "red";
            this.style.color = "white";
        };
        registerButton.onmouseout = function() {
            this.style.backgroundColor = "#212529";
            this.style.color = "#FD9C1A";
        }

        registerButton.onclick = function() {
            localStorage.removeItem("isLogged");
        };

        return true;
    }
    else {
        document.getElementById("login") = oldLogin;
        document.getElementById("register") = oldRegister;
        return false;
    }
}