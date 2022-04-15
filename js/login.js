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