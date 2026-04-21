const menuToggle = document.querySelector('#mobile-menu');
const navList = document.querySelector('.nav-list');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navList.classList.toggle('active');
});

// Fechar o menu ao clicar em qualquer link (importante para UX)
document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navList.classList.remove('active');
    });
});

// --- Validação do Formulário de Contato ---
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('form-feedback');

if(contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); 

        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();

        // Reseta as classes de feedback
        formFeedback.className = 'feedback-msg'; 

        // Validação de campos vazios
        if(nome === "" || email === "" || mensagem === "") {
            formFeedback.textContent = "Por favor, preencha todos os campos.";
            formFeedback.classList.add('error');
            return; // Interrompe a execução aqui se houver erro
        }

        // Validação de formato de e-mail usando Regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            formFeedback.textContent = "Insira um endereço de e-mail válido.";
            formFeedback.classList.add('error');
            return; // Interrompe a execução aqui se o e-mail for inválido
        }

        // --- COMEÇO DO ENVIO REAL PARA O FORMSPREE ---

        // 1. Preparamos os dados como um objeto simples
        const data = {
            nome: nome,
            email: email,
            mensagem: mensagem
        };

        // Endpoint exato do Formspree
        const endpoint = 'https://formspree.io/f/xrerybdg';

        // Feedback visual de carregamento
        formFeedback.textContent = "Enviando mensagem...";
        formFeedback.className = 'feedback-msg'; 
        formFeedback.style.display = 'block';

        // 2. Requisição para o Formspree exigindo e enviando JSON
        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Avisa que estamos mandando JSON
                'Accept': 'application/json'        // Avisa que queremos resposta em JSON
            },
            body: JSON.stringify(data)              // Converte o objeto para texto JSON
        })
        .then(response => {
            if (response.ok) {
                // Sucesso! Limpa o form e abre o modal
                contactForm.reset();
                formFeedback.style.display = 'none'; 
                
                const modal = document.getElementById('successModal');
                modal.style.display = 'flex';
            } else {
                formFeedback.textContent = "Oops! Ocorreu um erro ao enviar a mensagem. Tente novamente.";
                formFeedback.classList.add('error');
                console.error("Erro Formspree:", response.status); // Para ajudar a debugar
            }
        })
        .catch(error => {
            formFeedback.textContent = "Erro de conexão. Verifique sua internet e tente novamente.";
            formFeedback.classList.add('error');
            console.error("Erro Catch:", error);
        });
    });
}
        // --- Controle de Fechamento do Modal ---
        const closeModalBtn = document.getElementById('closeModal');
        const successModal = document.getElementById('successModal');

        if (closeModalBtn && successModal) {
            // Fecha ao clicar no botão
            closeModalBtn.addEventListener('click', () => {
                successModal.style.display = 'none';
            });

            // Fecha ao clicar fora da caixinha do modal (no fundo escuro)
            window.addEventListener('click', (e) => {
                if (e.target === successModal) {
                    successModal.style.display = 'none';
                }
            });
        }