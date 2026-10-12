document.addEventListener('DOMContentLoaded', () => {

    // 1. DADOS DOS LIVROS COM PLATAFORMAS E AVALIAÇÃO
    const books = [
        { 
            title: "A Marca da Besta", 
            image: "amarca.png", 
            rating: "5.0",
            ratingText: "Leitura Altamente Recomendada",
            desc: "Uma imersão profunda na revelação desta profecia, capaz de surpreendê-lo ao mostrar que essa realidade já começa a se manifestar diante dos seus olhos, sem qualquer sensacionalismo, mas uma realidade concreta, perceptível a todos os que observam com atenção e discernimento.",
            links: [
                { name: "Amazon", url: "https://www.amazon.com.br/dp/6562255465" },
                { name: "Kindle", url: "https://www.amazon.com.br/dp/B0HFV69VLF" },
                { name: "Apice", url: "https://apicebooks.com/livro/a-marca-da-besta" },
		{ name: "UICLAP", url: "https://loja.uiclap.com/titulo/ua195304" }
            ]
        },
        { 
            title: "Ao Pó Tornarás", 
            image: "AoPoTornaras.jpg", 
            rating: "5.0",
            ratingText: "Leitura Altamente Recomendada",
            desc: "Minha própria experiência com o luto me levou a escrever este livro. <b>Não é você que vira pó... é o seu corpo</b>. Este livro é um convite para uma reflexão honesta e profunda sobre o luto, por um olhar teológico e transformador.",
            links: [
                { name: "UICLAP", url: "https://loja.uiclap.com/titulo/ua200266/" },
                { name: "Apice", url: "https://apicebooks.com/livro/ao-po-tornaras" }
            ]
        },
        { 
            title: "Alma é para o corpo, Espírito é para Deus", 
            image: "alma_I.png", 
            rating: "5.0",
            ratingText: "Leitura Altamente Recomendada",
            desc: "Você ainda confunde alma com espírito? Este livro trará clareza sobre o que cada um faz em você. Depois deste livro, sua maneira de orar e de se relacionar com Deus e com o mundo ao seu redor, mudarão para sempre. <b>Você precisa ler este livro</b>.",
            links: []
        },
        { 
            title: "Por Que Devemos Nascer de Novo", 
            image: "capa2.jpeg", 
            rating: "5.0",
            ratingText: "Leitura Altamente Recomendada",
            desc: "<b>Para escapar da segunda morte, é necessário nascer de novo</b>. A primeira morte apenas devolve o nosoo corpo ao pó; mas a segunda é o destino final de quem desfrutou da vida plenamente sem nascer de novo. Esta obra se propõe a esclarecer essa decisão pessoal e definitiva.",
            links: []
        },
        { 
            title: "O Perigo dos 'ismos'", 
            image: "ismos.png", 
            rating: "5.0",
            ratingText: "Leitura Altamente Recomendada",
            desc: "Cristianismo, Catolicismo, Islamismo. Muito além de uma simples palavra que termina em -ismo, vamos observar a estrutura organizada de pensamentos, valores e convicções que pretende explicar a realidade, orientar condutas e legitimar sua própria ideologia. <b>Todo 'ismo' promete segurança e, quase sempre, entrega uma jaula</b>.",
            links: []
        },
        { 
            title: "Apostasia", 
            image: "Apostasia.jpg", 
            rating: "5.0",
            ratingText: "Leitura Altamente Recomendada",
            desc: "A apostasia pode ser o maior termômetro profético da volta de Cristo e do limite da incredulidade humana. Quando o mundo e a Igreja se afastam do Criador, a humanidade perde o fundamento da própria vida como a conhecemos. <b>Já estamos vivendo a Apostasia?</b>",
            links: []
        },
        { 
            title: "Fé, Crenças & Crendices", 
            image: "capa-crendices.jpeg", 
            rating: "5.0",
            ratingText: "Leitura Altamente Recomendada",
            desc: "Este livro convida o leitor a distinguir a Fé Verdadeira das crenças e crendices que, embora revestidas de linguagem religiosa, podem transformar a espiritualidade em medo, fórmulas ou tentativas de controlar o invisível.",
            links: []
        },
        { 
            title: "O Livro das Perguntas Difíceis da Fé", 
            image: "perg_dificil.jpeg", 
            rating: "5.0",
            ratingText: "Leitura Altamente Recomendada",
            desc: "Respostas sólidas para dúvidas inquietantes sobre a Fé. Um estudo minucioso que desata nós teológicos e propõe uma base fundamentada nas Escrituras. <b>Inspirador e revelador</b>.",
            links: []
        },
        { 
            title: "As duas Testemunhas do Apocalipse", 
            image: "2witnesses.jpeg", 
            rating: "5.0",
            ratingText: "Leitura Altamente Recomendada",
            desc: "As testemunhas não são duas pessoas que voltam no fim dos tempos. Esta obra propõe um novo entendimento sobre essa profecia. <b>Prepare-se para uma descoberta surpreendente</b>.",
            links: []
        },
        { 
            title: "Houve um Homem na Terra de Uz", 
            image: "Uz.png", 
            rating: "5.0",
            ratingText: "Leitura Altamente Recomendada",
            desc: "Antes mesmo da Lei ser dada a Moisés no Sinai, um manuscrito já descrevia todo o plano de Deus com os homens. <b>Entenda o arquétipo de Jó, a relação de Deus com o homem, e a intromissão de Satanás</b>.",
            links: []
        },
        { 
            title: "Profecias Messiânicas e as Últimas 24hs de Jesus", 
            image: "profecias.png", 
            rating: "5.0",
            ratingText: "Leitura Altamente Recomendada",
            desc: "Em nenhum ser humano, tantas profecias se cumpriram como em Jesus. Este livro reforçará os motivos que fizeram você crer nEle e em Suas palavras. <b>Esta obra merece sua atenção</b>.",
            links: []
        }
    ];

    // 2. RENDERIZAÇÃO DOS CARDS NO GRID (TAMANHO DE CAPA AJUSTADO)
    const grid = document.getElementById('books-grid');

    if (grid) {
        grid.innerHTML = books.map(book => `
            <div class="book-card">
                <div class="book-cover-wrapper" onmousemove="zoomIn(event)" onmouseleave="zoomOut(event)">
    <img src="${book.image}" alt="${book.title}" class="book-img-zoom">
</div>
                
                <div class="book-details">
                    <h3 class="book-title">${book.title}</h3>
                    
                    <!-- Avaliação apenas com estrelas -->
                    <div class="book-rating">
                        <span class="stars">★★★★★</span>
                    </div>

                    <p class="book-description">${book.desc}</p>
                    
                   <div class="purchase-box">
                        <br><br>
                        <div class="button-group">
                            ${book.links && book.links.length > 0 
                                ? book.links.map(link => `
                                    <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="btn-buy">
                                        ${link.name}
                                    </a>
                                `).join('') 
                                : `<button class="btn-buy disabled-btn" data-title="${book.title}">
                                    Em breve
                                   </button>`
                            }
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        `).join('');
    }
});

// 3. EVENTO DO MODAL
document.addEventListener('click', (e) => {
    const btnDisabled = e.target.closest('.disabled-btn');
    if (btnDisabled) {
        e.preventDefault();
        const bookTitle = btnDisabled.getAttribute('data-title');
        const modal = document.getElementById('modal');
        const modalMsg = document.getElementById('modal-msg');
        
        if (modalMsg) {
            modalMsg.innerHTML = `A publicação da obra <strong>"${bookTitle}"</strong> está sendo preparada e os links das plataformas oficiais de venda estarão disponíveis em breve neste local.`;
        }
        if (modal) {
            modal.classList.add('active');
        }
    }
});

// ZOOM ESTILO AMAZON ACIONADO POR MOUSEOVER (MOUSE EM CIMA)
document.addEventListener('mouseover', (e) => {
    const wrapper = e.target.closest('.book-cover-wrapper');
    if (wrapper) {
        const img = wrapper.querySelector('img');
        if (img) {
            const zoomModal = document.getElementById('amazon-zoom-container');
            const zoomImg = document.getElementById('amazon-zoom-img');
            
            if (zoomModal && zoomImg) {
                zoomImg.src = img.src;
                zoomModal.classList.add('active');
            }
        }
    }
});

// FECHA QUANDO O MOUSE SAI DO WRAPPER DA CAPA
document.addEventListener('mouseout', (e) => {
    const wrapper = e.target.closest('.book-cover-wrapper');
    if (wrapper) {
        // Verifica se o mouse realmente saiu do wrapper (evita piscar ao mover sobre elementos internos)
        const relatedTarget = e.relatedTarget;
        if (!wrapper.contains(relatedTarget)) {
            closeAmazonZoom();
        }
    }
});

function closeAmazonZoom() {
    const zoomModal = document.getElementById('amazon-zoom-container');
    if (zoomModal) {
        zoomModal.classList.remove('active');
    }
}

// Exemplo de abertura do modal (quando clica no botão "Em breve")
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('disabled-btn') || e.target.classList.contains('btn-modal-open')) {
        const title = e.target.getAttribute('data-title') || "Este livro";
        const modalMsg = document.getElementById('modal-msg');
        const modal = document.getElementById('modal');
        
        if (modalMsg && modal) {
            modalMsg.textContent = `${title} estará disponível em breve.`;
            modal.classList.add('active'); // ou modal.style.display = 'flex';
        }
    }
});

// Função global para fechar o modal
function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.classList.remove('active'); // ou modal.style.display = 'none';
    }
}