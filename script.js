const modal = document.getElementById("modal");
const btn = document.querySelectorAll(".openModal");
const span = document.getElementsByClassName("close")[0];
const form = document.getElementById("contactForm");
const SuccessMessage = document.getElementById("successMessage");
const blurredEls = document.getElementsByClassName('blur');

// Открываем модальное окно при нажатии на кнопку
btn.forEach(el => el.onclick = function() {
    modal.style.display = 'flex';
    for (let el of blurredEls) {
        el.style.filter = 'blur(2px)';
    }
});
// Закрываем модальное окно при нажатии на "X"
span.onclick = function() {
    modal.style.display = "none";
    for (let el of blurredEls) {
        el.style.filter = 'blur(0)';
    }
};
// Закрываем модальное окно при клике вне его области
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
        blurredEls.forEach(el=>el.style.filter='blur(0)');
    }
};

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем стандартное поведение отправки формы

    // Анимация: сначала показываем сообщение, затем меняем цвет
    SuccessMessage.style.display = 'block';
    SuccessMessage.style.color = 'green'; // Или любой другой цвет
});
// 1. Создаем объект formData с методом printData
const formData = {
    name: '',
    email: '',
    number: '',
    country: '',
    date: '',
    comments: '',
    agree: false,
    printData: function() {
        console.log("Имя:", this.name);
        console.log("E-mail:", this.email);
        console.log("Телефон:", this.number);
        console.log("Страна:", this.country);
        console.log("Дата:", this.date);
        console.log("Комментарии:", this.comments);
        console.log("Согласие на обработку данных:", this.agree);
    }
};


// 2. Функция submitForm с проверками
function submitForm(event) {
    event.preventDefault(); // Предотвращаем стандартное поведение отправки формы

    formData.name = document.getElementById('name').value.trim();
    formData.email = document.getElementById('email').value.trim();
    formData.number = document.getElementById('number').value.trim();
    formData.region = document.querySelector('select[name="country"]').value;
    formData.date = document.getElementById('date').value;
    formData.comments = document.getElementById('comments').value.trim();
    formData.agree = document.getElementById('agree').checked;

    // 3. Проверки
    if (!formData.name || !formData.email || !formData.comments) {
        alert('Поля "Имя", "Электронная почта" и "Комментарии" обязательны для заполнения!');
        return;
    }

    if (!/^\+7\d{10}$/.test(formData.number)) { //Более строгая проверка телефона
        alert('Некорректный формат номера телефона!  Допустимый формат: +7XXXXXXXXXX');
        return;
    }

    // Простая проверка email (можно использовать более сложное регулярное выражение)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        alert('Некорректный формат E-mail!');
        return;
    }

    if (!formData.agree) {
        alert('Необходимо согласиться на обработку персональных данных!');
        return;
    }

    formData.printData(); // Вывод данных в консоль
    // Здесь можно добавить отправку данных на сервер с помощью fetch или AJAX
}


// Привязка обработчика событий
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', submitForm);
} else {
    console.error('Форма не найдена.');
}