
// ===================================
// CAFE DREAM — JAVASCRIPT
// ===================================

// ВАЖНО: замени номер на реальный номер кафе.
// Формат: код страны + номер, без плюса и пробелов.
const WHATSAPP_NUMBER = "+996998091804";


// ===================================
// HEADER
// ===================================

const header = document.getElementById("header");

window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 50);
});


// ===================================
// MOBILE MENU
// ===================================

const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

menuToggle.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navigation.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navigation.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});


// ===================================
// MENU FILTER
// ===================================

const filters = document.querySelectorAll(".filter");
const menuCards = document.querySelectorAll(".menu-card");

filters.forEach(button => {

    button.addEventListener("click", () => {

        filters.forEach(filter => {
            filter.classList.remove("active");
        });

        button.classList.add("active");

        const category = button.dataset.filter;

        menuCards.forEach(card => {

            const matches =
                category === "all" ||
                card.dataset.category === category;

            card.classList.toggle("hidden", !matches);
        });

    });

});


// ===================================
// ANIMATION ON SCROLL
// ===================================

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver((entries, obs) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                obs.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.12
    });

    revealElements.forEach(element => {
        observer.observe(element);
    });

} else {

    revealElements.forEach(element => {
        element.classList.add("visible");
    });

}


// ===================================
// CURRENT YEAR
// ===================================

document.getElementById("year").textContent =
    new Date().getFullYear();


// ===================================
// RESERVATION DATE
// ===================================

const dateInput = document.getElementById("date");

const today = new Date();

const localToday = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().split("T")[0];

dateInput.min = localToday;


// ===================================
// WHATSAPP LINKS
// ===================================

function openWhatsApp(message) {

    const url =
        "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(message);

    window.open(url, "_blank", "noopener,noreferrer");
}

const whatsappLinks = [
    "contactWhatsapp",
    "floatingWhatsapp"
];

whatsappLinks.forEach(id => {

    const element = document.getElementById(id);

    element.href =
        "https://wa.me/" + WHATSAPP_NUMBER;

    element.target = "_blank";
    element.rel = "noopener noreferrer";

});


// ===================================
// RESERVATION FORM
// ===================================

const bookingForm = document.getElementById("bookingForm");
const formStatus = document.getElementById("formStatus");

bookingForm.addEventListener("submit", event => {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const date = dateInput.value;
    const time = document.getElementById("time").value;
    const guests = document.getElementById("guests").value;
    const message = document.getElementById("message").value.trim();

    if (!name || !phone || !date || !time || !guests) {

        formStatus.textContent =
            "Пожалуйста, заполните все обязательные поля.";

        return;
    }

    if (!/^[+0-9()\s-]{7,20}$/.test(phone)) {

        formStatus.textContent =
            "Проверьте правильность номера телефона.";

        return;
    }

    if (date < localToday) {

        formStatus.textContent =
            "Нельзя выбрать прошедшую дату.";

        return;
    }

    const bookingMessage =
`Здравствуйте! Хочу забронировать столик в Cafe Dream.

Имя: ${name}
Телефон: ${phone}
Дата: ${date}
Время: ${time}
Количество гостей: ${guests}
Пожелания: ${message || "Нет"}

Ожидаю подтверждения бронирования.`;

    formStatus.textContent =
        "Открываем WhatsApp для отправки заявки...";

    openWhatsApp(bookingMessage);

});


// ===================================
// CONSOLE
// ===================================

console.log("Cafe Dream 2.0 successfully loaded!");
