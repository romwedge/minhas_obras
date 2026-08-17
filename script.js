/**
 * ACERVO LITERÁRIO - SCRIPT VERSÃO DEFINITIVA (ANTI-ERRO)
 * Esta versão remove o uso de onclick no HTML para evitar conflitos de parâmetros.
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. LISTA DE OBRAS
    const books = [
        { title: "A Marca da Besta", image: "capa1.jpg", desc: "Investigação profunda sobre as profecias do Apocalipse e o cenário contemporâneo." },
        { title: "Profecias Messiânicas e as Últimas 24hs de Jesus", image: "capa2.jpg", desc: "A exatidão das promessas bíblicas cumpridas integralmente nas horas finais de Cristo." },
        { title: "Ao Pó Tornarás", image: "capa3.jpg", desc: "Reflexões sobre a finitude humana e a esperança cristã." },
        { title: "Alma é para o corpo - Espírito é para Deus, Vol I", image: "capa4.jpg", desc: "Estudo sobre a natureza tripartida do homem: alma e espírito." },
        { title: "Alma é para o corpo - Espírito é para Deus, Vol II", image: "capa5.jpg", desc: "O aprofundamento da conexão espiritual com o Criador." },
        { title: "O Livro das Perguntas Difíceis da Fé", image: "capa6.jpg", desc: "Respostas fundamentadas para os dilemas mais complexos da caminhada cristã." },
        { title: "As duas Testemunhas do Apocalipse", image: "capa7.jpg", desc: "Exegese detalhada sobre o impacto profético das testemunhas finais." }
    ];

    // 2. RENDERIZAÇÃO DO CATÁLOGO
    const grid = document.getElementById('grid');
    if (grid) {
        grid.innerHTML = ''; // Limpa o grid antes de renderizar
        books.forEach(b => {
            grid.innerHTML += `
                <div class="book-card">
                    <div class="book-cover-container" onmousemove="zoomIn(event)" onmouseleave="zoomOut(event)">
                        <img src="${b.image}" alt="${b.title}" class="book-img-zoom" onerror="this.src='https://via.placeholder.com/160x240?text=Capa'">
                    </div>
                    <div class="book-info">
                        <h3>${b.title}</h3>
                        <p>${b.desc}</p>
                        <!-- Usamos data-attributes em vez de onclick -->
                        <a href="#" class="btn-buy disabled" data-title="${b.title}" data-format="IMPRESSO">IMPRESSO</a>
                        <a href="#" class="btn-buy disabled" data-title="${b.title}" data-format="DIGITAL">DIGITAL</a>
                    </div>
                </div>
            `;
        });
    }

    // 3. GERENCIADOR DE CLIQUES (MODAL)
    // Esta parte detecta o clique nos botões e abre o modal corretamente
    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('btn-buy')) {
            e.preventDefault();
            const title = e.target.getAttribute('data-title');
            const format = e.target.getAttribute('data-format');
            
            if (title && format) {
                mostrarModal(title, format);
            }
        }
    });

    // 4. FORMULÁRIO FORMSPREE
    const form = document.getElementById('contact-form');
    if (form) {
        form.onsubmit = async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const response = await fetch('https://formspree.io/f/mjybobzn', {
                method: 'POST', body: formData, headers: { 'Accept': 'application/json' }
            });
            if (response.ok) { alert('Mensagem enviada com sucesso!'); form.reset(); }
        };
    }
});

// 5. FUNÇÕES AUXILIARES (ZOOM E MODAL)

function zoomIn(e) {
    const container = e.currentTarget;
    const img = container.querySelector('img');
    const rect = container.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    img.style.transformOrigin = `${x}% ${y}%`;
}

function zoomOut(e) {
    e.currentTarget.querySelector('img').style.transformOrigin = `center center`;
}

function mostrarModal(titulo, tipo) {
    const modal = document.getElementById('modal');
    const msg = document.getElementById('modal-msg');
    if (modal && msg) {
        msg.innerHTML = `A versão <strong>${tipo}</strong> da obra <em>"${titulo}"</em> está sendo preparada para o lançamento oficial e estará disponível em breve.`;
        modal.classList.add('active');
    }
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) modal.classList.remove('active');
}

// Fechar ao clicar fora
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target == modal) closeModal();
}