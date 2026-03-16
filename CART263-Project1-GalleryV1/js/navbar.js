// navbar.js

// Helper function to create a button with hover effect and optional click redirect
function createButton(id, imgSrc, hoverSrc, leftPosition, clickRedirect = null) {
    const btn = document.createElement("button");
    btn.id = id;
    btn.style.width = "10%";
    btn.style.height = "auto";
    btn.style.padding = "0";
    btn.style.top = "20%";
    btn.style.left = leftPosition;
    btn.style.border = "none";
    btn.style.background = "none";
    btn.style.cursor = "pointer";
    btn.style.position = "absolute";

    const img = document.createElement("img");
    img.src = imgSrc;
    img.style.width = "100%";
    img.style.height = "auto";
    img.style.display = "block";
    btn.appendChild(img);

    // Hover effect
    btn.addEventListener("mouseenter", () => img.src = hoverSrc);
    btn.addEventListener("mouseleave", () => img.src = imgSrc);

    // Redirect on click
    if (clickRedirect) {
        btn.addEventListener("click", () => {
            window.location.href = clickRedirect;
        });
    }

    return btn;
}


// NAVBAR CONTAINER
const navDiv = document.createElement("div");
navDiv.id = "topnav";

navDiv.style.position = "absolute";
navDiv.style.top = "0";
navDiv.style.left = "0";
navDiv.style.width = "100%";
navDiv.style.height = "auto";
navDiv.style.zIndex = "1000";

/* smooth fade */
navDiv.style.transition = "opacity 0.35s ease";


// BACKGROUND IMAGE
const navImg = document.createElement("img");
navImg.src = "assets/mpassets/taskbara.png";
navImg.alt = "Navbar background";
navImg.style.width = "100%";
navImg.style.height = "auto";
navImg.style.display = "block";

navDiv.appendChild(navImg);
document.body.appendChild(navDiv);


// LOGO BUTTON
const logo = document.createElement("div");
logo.id = "logo";

logo.style.width = "100px";
logo.style.height = "60px";
logo.style.position = "absolute";
logo.style.left = "2%";
logo.style.top = "0";
logo.style.cursor = "pointer";

logo.onclick = () => window.location.href = "index.html";

navDiv.appendChild(logo);


// ABOUT BUTTON
const aboutBtn = createButton(
    "about-btn",
    "assets/mpassets/about.png",
    "assets/mpassets/hoverabout.png",
    "44%",
    "about.html"
);
navDiv.appendChild(aboutBtn);

// GALLERY BUTTON
const galleryBtn = createButton(
    "gallery-btn",
    "assets/mpassets/gallery.png",
    "assets/mpassets/hovergallery.png",
    "36%",
    "gallery.html"
);
navDiv.appendChild(galleryBtn);

// MAP BUTTON
const mapBtn = createButton(
    "map-btn",
    "assets/mpassets/map.png",
    "assets/mpassets/hovermap.png",
    "53%",
    "gallery.html"
);
navDiv.appendChild(mapBtn);


/* ---------------------------------------------------
   NAVBAR VISIBILITY CONTROLS (used by gallery system)
   
   doesn't work rn
--------------------------------------------------- */
/*
window.hideNavbar = function () {
    navDiv.style.opacity = "0";
    navDiv.style.pointerEvents = "none";
};

window.showNavbar = function () {
    navDiv.style.opacity = "1";
    navDiv.style.pointerEvents = "auto";
};
*/