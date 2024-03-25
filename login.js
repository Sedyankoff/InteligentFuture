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
            return true;
        }
        else {
            resultElement.innerHTML = "Грешна парола!";
            document.getElementById("password-login").value = "";
            return false;
        }
    }
}