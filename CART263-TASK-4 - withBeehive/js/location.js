window.onload = function () {
    // create button element
    const button = document.createElement("button");

    // set id (so CSS can style it)
    button.id = "locBtn";

    // set text
    button.textContent = "Find cool spots near me";

    // add to page
    document.body.appendChild(button);

    function getLocation() {
        if (!navigator.geolocation) {
            alert("Geolocation not supported");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                console.log("Latitude", lat);
                console.log("Longitude", lng);

            },
            (err) => {
                console.error(err);
                alert("Location permission denied");
            },
            {
                enableHighAccuracy: true, // important for precise location
                maximumAge: 0
            }
        );
    }

    // click behavior
    button.addEventListener("click", () => {
        console.log("location")
        getLocation();
        // later:
        // getLocation();
    });



};