document.addEventListener('DOMContentLoaded', () => {

    // 1. LISTA DE LIVROS
    // Para ativar um link, adicione: urlImpresso: "link", urlDigital: "link" ou urlKindle: "link"
    const books = [
        { 
            title: "A Marca da Besta", 
            image: "amarca.png", 
            urlImpresso: "https://loja.uiclap.com/titulo/ua195304",
            urlDigital: "https://apicebooks.com/livro/a-marca-da-besta", 
            urlKindle: "https://www.amazon.com.br/dp/B0HFV69VLF",
            desc: "Uma imersão profunda na revelação desta profecia. Surpreenda-se ao perceber que essa realidade já começou a despontar diante dos seus olhos." 
        },
        { 
            title: "Ao Pó Tornarás", 
            image: "AoPoTornaras.jpg", 
	    urlImpresso: "https://loja.uiclap.com/titulo/ua200266/",
	    urlDigital: "https://apicebooks.com/livro/ao-po-tornaras",
            desc: "Não é você que vira pó... é o seu corpo. Uma leitura indispensável para uma reflexão honesta e profunda sobre finitude humana e esperança cristã. <b>Não deixe de ler esta obra</b>." 
        },
        { 
            title: "Alma é para o corpo, Espírito é para Deus", 
            image: "alma_I.png", 
            desc: "Você ainda confunde alma com espírito? Este livro trará clareza sobre o que cada um faz em você. Depois deste livro, sua maneira de orar e de se relacionar com Deus e com o mundo ao seu redor, mudarão para sempre. <b>Você precisa ler este livro</b>." 
        },
	{ 
            title: "Por Que Devemos Nascer de Novo", 
            image: "capa2.jpeg", 
            desc: "<b>Para escapar da segunda morte, é necessário nascer de novo</b>. A primeira morte apenas devolve o nosoo corpo ao pó; mas a segunda é o destino final de quem desfrutou da vida plenamente sem nascer de novo. Esta obra se propõe a esclarecer essa decisão pessoal e definitiva." 
        },
        { 
            title: "O Livro das Perguntas Difíceis da Fé", 
            image: "perg_dificil.jpeg", 
            desc: "Respostas sólidas para dúvidas inquietantes sobre a Fé. Um estudo minucioso que desata nós teológicos e propõe uma base fundamentada nas Escrituras. <b>Inspirador e revelador</b>." 
        },
        { 
            title: "As duas Testemunhas do Apocalipse", 
            image: "2witnesses.jpeg", 
            desc: "As testemunhas não são duas pessoas que voltam no fim dos tempos. Esta obra propõe um novo entendimento sobre essa profecia. <b>Prepare-se para uma descoberta surpreendente</b>." 
        },
        { 
            title: "Houve um Homem na Terra de Uz", 
            image: "Uz.png", 
            desc: "Antes mesmo da Lei ser dada a Moisés no Sinai, um manuscrito já descrevia todo o plano de Deus com os homens. <b>Entenda o arquétipo de Jó, a relação de Deus com o homem, e a intromissão de Satanás</b>." 
        },
        { 
            title: "Profecias Messiânicas e as Últimas 24hs de Jesus", 
            image: "profecias.png", 
            desc: "Em nenhum ser humano, tantas profecias se cumpriram como em Jesus. Este livro reforçará os motivos que fizeram você crer nEle e em Suas palavras. <b>Esta obra merece sua atenção</b>." 
        },
    ];

    // 2. RENDERIZAÇÃO DINÂMICA
    const grid = document.getElementById('grid');
    if (grid) {
        books.forEach(b => {
            // Lógica para LIVRO IMPRESSO
            const btnImpresso = b.urlImpresso 
                ? `<a href="${b.urlImpresso}" target="_blank" class="btn-buy">LIVRO IMPRESSO</a>`
                : `<button class="btn-buy disabled" data-title="${b.title}" data-format="LIVRO IMPRESSO">LIVRO IMPRESSO</button>`;

            // Lógica para LIVRO DIGITAL
            const btnDigital = b.urlDigital 
                ? `<a href="${b.urlDigital}" target="_blank" class="btn-buy">LIVRO DIGITAL</a>`
                : `<button class="btn-buy disabled" data-title="${b.title}" data-format="LIVRO DIGITAL">LIVRO DIGITAL</button>`;

            // Lógica para LEIA NO KINDLE
            const btnKindle = b.urlKindle 
                ? `<a href="${b.urlKindle}" target="_blank" class="btn-buy">LEIA NO KINDLE</a>`
                : `<button class="btn-buy disabled" data-title="${b.title}" data-format="KINDLE">LEIA NO KINDLE</button>`;

            grid.innerHTML += `
                <div class="book-card">
                    <div class="book-cover-container" onmousemove="zoomIn(event)" onmouseleave="zoomOut(event)">
                        <img src="${b.image}" alt="${b.title}" class="book-img-zoom" onerror="this.src='https://via.placeholder.com/160x240?text=Capa'">
                    </div>
                    <div class="book-info">
                        <h3>${b.title}</h3>
                        <p>${b.desc}</p>
                        <div class="book-actions">
                            ${btnImpresso}
                            ${btnDigital}
                            ${btnKindle}
                        </div>
                    </div>
                </div>
            `;
        });
    }

    // 3. GERENCIADOR DE CLIQUES E MODAL (BLINDADO CONTRA POINTEREVENT)
    document.addEventListener('click', function (e) {
        if (e.target && e.target.classList.contains('btn-buy') && e.target.tagName === 'BUTTON') {
            e.preventDefault();
            
            const title = e.target.getAttribute('data-title');
            const format = e.target.getAttribute('data-format');
            
            const modal = document.getElementById('modal');
            const msg = document.getElementById('modal-msg');
            
            if (modal && msg) {
                msg.innerHTML = `A versão <strong>${format}</strong> da obra <em>"${title}"</em> está sendo preparada para o lançamento oficial e estará disponível em breve.`;
                modal.classList.add('active');
            }
        }
    });

    // 4. FORMSPREE AJAX
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

// ZOOM LOGIC
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
function closeModal() { document.getElementById('modal').classList.remove('active'); }