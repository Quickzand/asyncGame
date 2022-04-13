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
        url: "/php/login.php",
        type: "POST",
        data: {
            username: username,
            password: password
        },
        success: function (data) {
            console.log("Logged in");
            console.log(data);
            if (data == "invalid") {
                loginError();
            }
        }
    });


}

function loginError() {
    $("#loginError").text("Invalid username or password");
}