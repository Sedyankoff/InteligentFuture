window.onload = () => {
    this.sessionStorage.setItem('email', 'stoil0878@gmail.com');
    this.sessionStorage.setItem('password', 'danostane');

    var inputEmail = document.getElementById('email');
    var inputPassword = document.getElementById('password');
    var login = document.getElementById('login-button');
    var form = document.getElementById('login');
    form.onsubmit = () => { return false; }

    login.onclick = () => {

        if ((inputEmail.value != "") && (inputPassword.value != "")) {
            if ((inputEmail.value == sessionStorage.getItem('email')) && (inputPassword.value == sessionStorage.getItem('password'))) {
                form.onsubmit = () => { return true; }
                document.cookie = "email=" + inputEmail.value;
                document.cookie = "password=" + inputPassword.value;
                window.location.href = "main.html";
            } else {
                if ((inputEmail.value != sessionStorage.getItem('email'))) {
                    inputEmail.nextElementSibling.textContent = "Email DOESN'T match";
                    setTimeout(() => {
                        inputEmail.nextElementSibling.textContent = "";
                    }, 2000);
                    
                }
                if ((inputPassword.value != sessionStorage.getItem('password'))) {
                    inputPassword.nextElementSibling.textContent = "Password DOESN'T match";
                    setTimeout(() => {
                        inputPassword.nextElementSibling.textContent = "";
                    }, 2000);
                }
            }
        } else {
            if (inputEmail.value == "") {
                inputEmail.nextElementSibling.textContent = "Email is empty";
                setTimeout(() => {
                    inputEmail.nextElementSibling.textContent = "";
                }, 2000);
            }
            if (inputPassword.value == "") {
                inputPassword.nextElementSibling.textContent = "Password is empty";
                setTimeout(() => {
                    inputPassword.nextElementSibling.textContent = "";
                }, 2000);
            }
        }
    }
}