function register(event){
    event.preventDefault();
    const names = document.getElementById("names").value;
    const email = document.getElementById("email-register").value;
    const password = document.getElementById("password-register").value;
    const confirmPassword = document.getElementById("password-confirm").value;

    const resultElement = document.getElementById("result-register");

    if (names === "") {
        resultElement.innerHTML = "Моля въведете Вашите имена!";
        return false;
    } else if (names.length < 6) {
        resultElement.innerHTML = "Вашите имена са твърде кратки!";
        return false;
    } else if (email === "") {
        resultElement.innerHTML = "Моля въведете валиден имейл адрес!";
        return false;
    } else if (email.length < 6) {
        resultElement.innerHTML = "Имейла Ви е твърде кратък!";
        return false;
    } else if (password === "") {
        resultElement.innerHTML = "Моля въведете парола!";
        return false;
    } else if (password.length < 6) {
        document.getElementById("password-register").value = "";
        document.getElementById("password-confirm").value = "";
        resultElement.innerHTML = "Паролата трябва да бъде поне 6 знака!";
        return false;
    } else if (confirmPassword === "") {
        document.getElementById("password-register").value = "";
        document.getElementById("password-confirm").value = "";
        resultElement.innerHTML = "Моля въведете повторно паролата!";
        return false;
    } else if (password !== confirmPassword) {
        document.getElementById("password-register").value = "";
        document.getElementById("password-confirm").value = "";
        resultElement.innerHTML = "Паролите Ви не съвпадат!";
        return false;
    }

    const target = localStorage.getItem(email);
    if (target !== null) {
        resultElement.innerHTML = "Този имейл вече е регистриран!";
        return false;
    } else {
        const userData = {
            names: names,
            email: email,
            password: password
        };

        localStorage.setItem(email, JSON.stringify(userData));
        window.location.href = "main.html";

        return true;
    }
}