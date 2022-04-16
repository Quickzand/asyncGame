var navElements = {
    "home": {
        "title": "Home",
        "url": "index.html"
    },
    "play": {
        "title": "Play",
        "url": "play.html"
    },
    "lobbies": {
        "title": "Lobbies",
        "url": "lobbies.html"
    },
    "friends": {
        "title": "Friends",
        "url": "friends.html"
    },

    "profile": {
        "title": getCookie("username"),
        "url": "profile.html",
        "dropDown": [{
            "title": "Log Out",
            "url": "logout.html"
        }]
    }
}





function navContsructor() {
    // Appends the nav bar to the body
    $("body").append("<nav>");
    for (var linkElement in navElements) {
        var navButton = $("<a>").addClass("navButton");
        navButton.attr("href", navElements[linkElement].url);
        navButton.text(navElements[linkElement].title);
        // Appends drop down elements
        if (navElements[linkElement].dropDown) {
            navButton.append("<div class='dropDown'>");
            for (var dropDownElement in navElements[linkElement].dropDown) {
                var dropDownButton = $("<a>").addClass("dropDownButton");
                dropDownButton.attr("href", navElements[linkElement].dropDown[dropDownElement].url);
                dropDownButton.text(navElements[linkElement].dropDown[dropDownElement].title);
                navButton.children(".dropDown").append(dropDownButton);
            }
        }



        $("nav").append(navButton);
        // $("nav").append("<a href='" + navElements[linkElement].url + "'>" + navElements[linkElement].title + "</a>");
    }
}

navContsructor();


$(window).scroll(function () {
    if ($(window).scrollTop() > 0) {
        $("nav").addClass("scrolled");
    } else {
        $("nav").removeClass("scrolled");
    }
});