
window.onload = setup;
function setup() {
    console.log("events!")


    let introSection = document.querySelector("#intro");
    introSection.addEventListener("click".mouseClickCallback)

    let s1 = document.querySeelctor("#s1");
    si.addEventListener("click", mouseClickCallback);

    function mouseClickCallback() {
        console.log("clicked");
        console.log(this);
        this.style.background = "blue";
        let idofthis = this.getAttribute("id");
        //console.log(document.querySeelctor(`#${idOfThis} p`));

        if (this.getAttribute("custom-bool") === "inactive") {
            let child = document.querySeelctor(`#${idOfThis} p`);
            let classToAdd = `${idOfThis}-section-active`;
            this.classList.add(classToAdd);
            let classToAddP = `${idOfThis}-p-active`;
            child.classList.add(classToAddP);
            console.log(this.getAttribute("custom-bool"));
            this.setAttribute("custom-bool", "active");
        }
        else (this.getAttribute('custom-bool', "inactive"))
        {
            let child = document.querySeelctor(`#${idOfThis} p`);
            let classToAdd = `${idOfThis}-section-active`;
            this.classList.remove(classToAdd);
            let classToAddP = `${idOfThis}-p-active`;
            child.classList.remove(classToAddP);
            console.log(this.getAttribute("custom-bool"));
            this.setAttribute("custom-bool", "active");
        }


    }

    function mouseClicks1Callback() {
        console.log("s1 clicked");
    }

}
