document.addEventListener('DOMContentLoaded', function() {
    // Анимация чисел в статистике
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        const speed = 200;
        
        statNumbers.forEach(statNumber => {
            const target = +statNumber.getAttribute('data-count');
            const count = +statNumber.innerText;
            const increment = target / speed;
            
            if(count < target) {
                statNumber.innerText = Math.ceil(count + increment);
                setTimeout(animateStats, 1);
            } else {
                statNumber.innerText = target;
            }
        });
    }

    // Запуск анимации при скролле до блока
    function onScroll() {
        const statsSection = document.querySelector('.stats');
        if (!statsSection) return;
        
        const sectionPosition = statsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if(sectionPosition < screenPosition) {
            animateStats();
            window.removeEventListener('scroll', onScroll);
        }
    }

    // Плавное появление элементов при скролле
    function scrollAppear() {
        const elements = document.querySelectorAll('.slide-in');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if(elementPosition < screenPosition) {
                element.style.animation = 'slideIn 0.6s forwards';
            }
        });
    }

    // Маска для телефона
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
            e.target.value = !x[2] ? x[1] : '+' + x[1] + ' (' + x[2] + ') ' + x[3] + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
        });
    }

    // Обработка формы регистрации
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Сброс ошибок
            document.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('error');
            });
            
            // Валидация
            const inputs = registrationForm.querySelectorAll('input, select');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.parentElement.classList.add('error');
                    isValid = false;
                }
            });
            
            if (isValid) {
                // Анимация отправки
                registrationForm.style.opacity = '0.5';
                registrationForm.querySelector('button[type="submit"]').disabled = true;
                
                // Имитация отправки
                setTimeout(() => {
                    registrationForm.style.display = 'none';
                    document.querySelector('.success-message').classList.add('active');
                }, 1500);
            }
        });
    }

    // Инициализация
    window.addEventListener('scroll', scrollAppear);
    window.addEventListener('scroll', onScroll);
    
    // Первоначальная проверка для видимых элементов
    scrollAppear();
});