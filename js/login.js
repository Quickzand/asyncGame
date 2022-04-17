const currServer = "asyncGame/";

function login() {
    var username = $("#username").val();
    var password = $("#password").val();

    // Check if username and password are not empty
    if (username == "" || password == "") {
        loginError();
    }

    // Checks if username and password pass regex
    if (!username.match(/^[a-zA-Z0-9]+$/) || !password.match(/^[a-zA-Z0-9]+$/)) {
        loginError();
    }

    // Send login request to server
    $.ajax({
        url: "php/login.php",
        type: "POST",
        data: {
            username: username,
            password: password
        },
        success: function (data) {
            console.log(data);
            data = JSON.parse(data);
            $("#loginForm").removeClass("error");

            if (data.success) {
                // Add token to cookies and redirect to game 
                setTokenCookie(data.token);
                setUsernameCookie(username);
                window.location.href = "index.html";
            } else {
                loginError();
            }

        }
    });
}



// Runs login when enter is hit in field
$("#loginForm input").on("keyup", function (e) {
    if (e.keyCode == 13) {
        login();
    }
});


function loginError() {
    $("#loginError").text("Invalid username or password");
    $("#loginForm").addClass("error");
}



function openCreateAccount() {
    $("#loginForm").addClass("hidden");
    $("#createAccountForm").removeClass("hidden");
}

function openLoginForm() {
    $("#createAccountForm").addClass("hidden");
    $("#loginForm").removeClass("hidden");
}

openLoginForm();



function createAccount() {
    var username = $("#createUsername").val();
    var password = $("#createPassword").val();
    var passwordConfirm = $("#createPasswordConfirm").val();
    var email = $("#createEmail").val();

    // Check if username and password are not empty
    if (username == "" || password == "") {
        createAccountError("Username and password cannot be empty");
        return;
    }

    if (password != passwordConfirm) {
        createAccountError("Passwords do not match");
        return;
    }

    // Checks if username and password pass regex
    if (!username.match(/^[a-zA-Z0-9]+$/) || !password.match(/^[a-zA-Z0-9]+$/)) {
        createAccountError("Username and password must only contain letters and numbers");
        return;
    }

    // Checks if email passes regex
    if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)) {
        createAccountError("Invalid email");
        return;
    }

    // Send login request to server
    $.ajax({
        url: "php/createAccount.php",
        type: "POST",
        data: {
            username: username,
            password: password,
            email: email
        },
        success: function (data) {
            console.log(data);
            data = JSON.parse(data);
            if (data.success) {
                $("#createAccountForm").removeClass("error");
                loginAccount(username, password);
            } else {
                createAccountError();
            }

        }
    });
}



function loginAccount(username, password) {
    // Send login request to server
    $.ajax({
        url: "php/login.php",
        type: "POST",
        data: {
            username: username,
            password: password
        },
        success: function (data) {
            console.log(data);
            data = JSON.parse(data);


            if (data.success) {
                // Add token to cookies and redirect to game 
                setTokenCookie(data.token);
                setUsernameCookie(username);
                window.location.href = "index.html";
            } else {
                loginError();
            }

        }
    });
}


function createAccountError(msg) {
    $("#createAccountForm").addClass("error");
    msg = msg || "Unable to create account";
    $("#createAccountError").text(msg);
}