// dark mode en utilisant le toggle qui permet de changer la couleur du body
const toggleBtn = document.getElementById("theme-toggle");
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
}

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }

});

// c'est la navbar qui permet de scroller 
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

    if (window.scrollY > 300) {
        topBtn.style.display = "block";
    } else {
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
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.getAttribute("data-target");
            let count = 0;
            const increment = target / 200;
            const updateCounter = () => {
                count += increment;
                if (count < target) {
                    counter.innerText = Math.ceil(count);
                    requestAnimationFrame(updateCounter);
                } else {
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
// fade-in qui permet de faire quand on scrolle les choses comencent a apparaitre
const fadeElements = document.querySelectorAll(".fade-in");
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }
    });
});

fadeElements.forEach(el => {
    observer.observe(el);
});

//  la partie filtrage qui permet de filtrer 
const buttons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll("#freelancesGrid > div");
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const filter = button.getAttribute("data-filter");
        cards.forEach(card => {
            const category = card.getAttribute("data-filter");
            if (filter === "all" || category === filter) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});

// Validation du formulaire
const form = document.getElementById("contactForm");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    // Champ de validation pour l'email
    const name = document.getElementById("name");
    const firstname = document.getElementById("firstname");
    const email = document.getElementById("email");
    const message = document.getElementById("message");
    const sujet = document.getElementById("sujet");

    // message d'erreur
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");
    const successMessage = document.getElementById("successMessage");
    const nameError = document.getElementById("nameError");
    const firstnameError = document.getElementById("firstnameError");
    const sujetError = document.getElementById("errSujet")

    // Reinitialisation des messages d'erreur
    nameError.textContent = "";
    firstnameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    successMessage.textContent = "";
    sujetError.textContent = "";

    // Nom obligatoire
    if (name.value.trim() === "") {
        nameError.textContent = "Le nom est obligatoire.";
        valid = false;
    }
    if (firstname.value.trim() === "") {
        firstnameError.textContent = "Le prénom est obligatoire.";
        valid = false;
    }

    // Email obligatoire et format valide regex pour l'email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
        emailError.textContent = "Veuillez entrer un email valide.";
        valid = false;
    }
    // message obligatoire et au moins 20 caractères
    if (message.value.trim() === "") {
        messageError.textContent = "Le message est obligatoire.";
        valid = false;
    } else if (message.value.trim().length < 20) {
        messageError.textContent = "Le message doit contenir au moins 20 caractères.";
        valid = false;
    }

    if (sujet.value === "") {
        sujetError.textContent = "Veuillez choisir un sujet";
        valid = false;
    }

    if (valid) {
        successMessage.textContent = "Votre message a été envoyé avec succès !";
        form.reset();
    }
});

