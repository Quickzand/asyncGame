// Gets current user's login token cookie
// and checks if it is still valid
// If not, redirects to login page
function validate() {
    var token = getCookie("loginToken");
    if (token == null) {
        invalidToken();
    }
    $.ajax({
        url: "php/validateToken.php",
        type: "POST",
        data: {
            token: token
        },
        success: function (data) {
            console.log(data)
            data = JSON.parse(data);
            if (data.success) {
                // Token is still valid
                return;
            } else {
                // Token is invalid
                invalidToken();
                // console.log(token);
            }
        }
    });
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Removes specific given cookie from browser
function removeCookie(cname) {
    document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function invalidToken() {
    console.log("INVALID USER TOKEN");

    // Redirect to login page if not already there
    if (window.location.href.indexOf("login.html") == -1) {
        window.location.href = "login.html";
    }
}

function setTokenCookie(token) {
    setCookie("loginToken", token, 1);
}


// Resets the users token for login and requires them to log in again 

function resetLoginToken() {
    removeCookie("loginToken");
}





validate();