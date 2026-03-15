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

// Navbar container
const navDiv = document.createElement("div");
navDiv.id = "topnav";
navDiv.style.position = "absolute";
navDiv.style.top = "0";
navDiv.style.left = "0";
navDiv.style.width = "100%";
navDiv.style.height = "auto";
navDiv.style.zIndex = "1000";

// Background image
const navImg = document.createElement("img");
navImg.src = "assets/mpassets/taskbara.png";
navImg.alt = "Navbar background";
navImg.style.width = "100%";
navImg.style.height = "auto";
navImg.style.display = "block";
navDiv.appendChild(navImg);
document.body.appendChild(navDiv);

// Logo button (redirect to home/index)
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

// About button (redirects to about page)
const aboutBtn = createButton(
    "about-btn",
    "assets/mpassets/about.png",
    "assets/mpassets/hoverabout.png",
    "60%",
    "about.html" // redirect to About page
);
navDiv.appendChild(aboutBtn);

// Gallery button (redirects to gallery page)
const galleryBtn = createButton(
    "gallery-btn",
    "assets/mpassets/gallery.png",
    "assets/mpassets/hovergallery.png",
    "80%",
    "gallery.html" // redirect to Gallery page
);
navDiv.appendChild(galleryBtn);