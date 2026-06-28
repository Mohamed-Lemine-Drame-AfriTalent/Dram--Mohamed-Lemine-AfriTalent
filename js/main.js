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


//    COUNTERS AU SCROLL
const counters = document.querySelectorAll(".counter");
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            const counter = entry.target;
            const target = +counter.getAttribute("data-target");
            let count = 0;
            const increment = target / 200;
            const updateCounter = () => {
                count += increment;
                if(count < target){
                    counter.innerText = Math.ceil(count);
                    requestAnimationFrame(updateCounter);
                }else{
                    counter.innerText = target;
                }
            };
            updateCounter();
         counterObserver.unobserve(counter);
        }
    });
}, {
    threshold: 0.5
});
    counters.forEach(counter => {
    counterObserver.observe(counter);
});
const fadeElements = document.querySelectorAll(".fade-in");
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }
    });
});

    fadeElements.forEach(el => {
    observer.observe(el);
});


