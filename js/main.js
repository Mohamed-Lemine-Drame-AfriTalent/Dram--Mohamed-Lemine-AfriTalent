const toggleBtn = document.getElementById("theme-toggle");
if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark-mode");
}

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if(document.body.classList.contains("dark-mode")){
        localStorage.setItem("theme", "dark");
    }else{
        localStorage.setItem("theme", "light");
    }

});


const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    const navbar = document.querySelector(".navbar");

    if(window.scrollY > 50){
        navbar.classList.add("scrolled");
    }else{
        navbar.classList.remove("scrolled");
    }

    if(window.scrollY > 300){
        topBtn.style.display = "block";
    }else{
        topBtn.style.display = "none";
    }
});

topBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

