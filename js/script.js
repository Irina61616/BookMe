document.addEventListener('DOMContentLoaded', function() {
    
    
    const burger = document.getElementById('burger');
    const navLinks = document.querySelector('.nav-links');
    
    if (burger && navLinks) {
        burger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            burger.classList.toggle('active');
            
            if (window.innerWidth <= 768) {
                document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    burger.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
    }

    
    const modal = document.getElementById('booking-modal');
    const openModalBtn = document.getElementById('modal-btn');
    const heroBookBtn = document.getElementById('hero-book-btn');
    const closeModalBtn = document.getElementById('modal-close');
    
    
    function openModal() {
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; 
            
            
            const dateInput = document.getElementById('date-input');
            if (dateInput) {
                const today = new Date().toISOString().split('T')[0];
                dateInput.min = today;
            }
        }
    }
    
    
    function closeModal() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = ''; 
            
            
            const form = document.getElementById('booking-form');
            if (form) form.reset();
            
            
            document.getElementById('successBanner').style.display = 'none';
            document.getElementById('errorBanner').style.display = 'none';
        }
    }
    
    
    if (openModalBtn) {
        openModalBtn.addEventListener('click', openModal);
    }
    
    if (heroBookBtn) {
        heroBookBtn.addEventListener('click', openModal);
    }
    
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });

    
    document.querySelectorAll('.service-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const service = this.getAttribute('data-service');
            openModal();
            
            
            setTimeout(() => {
                const serviceSelect = document.getElementById('service-select');
                if (serviceSelect && service) {
                    serviceSelect.value = service;
                }
            }, 100);
        });
    });

    
    const form = document.getElementById('booking-form');
    const nameInput = document.getElementById('name-input');
    const telInput = document.getElementById('tel-input');
    const dateInput = document.getElementById('date-input');
    const serviceSelect = document.getElementById('service-select');
    const submitBtn = document.getElementById('submit-btn');
    const successBanner = document.getElementById('successBanner');
    const errorBanner = document.getElementById('errorBanner');

    
    function showError(input, message) {
        const errorElement = document.getElementById(input.id + '-error');
        if (errorElement) {
            input.classList.add('error');
            errorElement.textContent = message;
        }
    }

    function clearError(input) {
        const errorElement = document.getElementById(input.id + '-error');
        if (errorElement) {
            input.classList.remove('error');
            errorElement.textContent = '';
        }
    }

    
    if (nameInput) {
        nameInput.addEventListener('input', function() {
            if (this.value.trim().length < 2) {
                showError(this, 'Имя должно содержать минимум 2 символа');
            } else {
                clearError(this);
            }
        });
    }

    
    if (telInput) {
        telInput.addEventListener('input', function() {
            const phoneRegex = /^\+?[0-9\s\-\(\)]{10,18}$/;
            if (!phoneRegex.test(this.value.trim())) {
                showError(this, 'Введите корректный номер телефона');
            } else {
                clearError(this);
            }
        });
    }

    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            
            successBanner.style.display = 'none';
            errorBanner.style.display = 'none';
            
            
            let isValid = true;
            
            
            if (!serviceSelect.value) {
                showError(serviceSelect, 'Выберите услугу');
                isValid = false;
            } else {
                clearError(serviceSelect);
            }
            
        
            if (!dateInput.value) {
                showError(dateInput, 'Выберите дату');
                isValid = false;
            } else {
                clearError(dateInput);
            }
            
            
            if (!nameInput.value.trim()) {
                showError(nameInput, 'Введите имя');
                isValid = false;
            } else if (nameInput.value.trim().length < 2) {
                showError(nameInput, 'Имя должно содержать минимум 2 символа');
                isValid = false;
            } else {
                clearError(nameInput);
            }
            
            
            const phoneRegex = /^\+?[0-9\s\-\(\)]{10,18}$/;
            if (!telInput.value.trim()) {
                showError(telInput, 'Введите телефон');
                isValid = false;
            } else if (!phoneRegex.test(telInput.value.trim())) {
                showError(telInput, 'Введите корректный номер телефона');
                isValid = false;
            } else {
                clearError(telInput);
            }
            
            if (isValid) {
                
                submitBtn.disabled = true;
                submitBtn.textContent = 'Отправка...';
                
                setTimeout(() => {
                    successBanner.style.display = 'block';
                    form.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Подтвердить запись';
                    
                    
                    setTimeout(() => {
                        closeModal();
                        successBanner.style.display = 'none';
                    }, 2000);
                    
                }, 1500);
            } else {
                errorBanner.style.display = 'block';
            }
        });
    }
});