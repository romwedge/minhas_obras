document.addEventListener('DOMContentLoaded', () => {

    // 1. LISTA DE LIVROS
        const books = [
            { title: "A Marca da Besta", image: "amarca.png", desc: "Uma investigação profunda sobre a revelação dessa profecia. <b>Você irá se surpreender</b> ao descobrir que esta realidade já começou a se revelar bem diante dos seus olhos." },
            { title: "Profecias Messiânicas e as Últimas 24hs de Jesus", image: "profecias.png", desc: "Em nenhum ser humano, tantas profecias se cumpriram como em Jesus. Este livro reforçará os motivos que fizeram (ou farão) você crer nEle e em Suas palavras. <b>Esta obra merece sua atenção</b>." },
            { title: "Ao Pó Tornarás", image: "AoPoTornaras.jpg", desc: "Não é você que vira pó... é o seu corpo. Uma leitura indispensável para uma reflexão honesta e profunda sobre finitude humana e esperança cristã. <b>Não deixe de ler esta obra</b>." },
            { title: "Alma é para o corpo - Espírito é para Deus, Vol I", image: "alma_I.png", desc: "Depois de ler este livro, a maneira como você ora e a sua relação com Deus mudarão para sempre. <b>Uma leitura transformadora</b>." },
            { title: "Alma é para o corpo - Espírito é para Deus, Vol II", image: "alma_II.png", desc: "O Vol. II desta série irá <b>aprofundar a sua conexão espiritual com o Criador</b>. Tudo o que você aprendeu na Bíblia será melhor compreendido de forma clara e renovadora." },
            { title: "O Livro das Perguntas Difíceis da Fé", image: "perg_dificil.jpeg", desc: "Respostas sólidas para dúvidas inquietantes sobre a Fé. Um estudo minucioso que desata nós teológicos e propõe uma base fundamentada nas Escrituras para uma vida definitiva com Deus. <b>Inspirador e revelador</b>." },
            { title: "As duas Testemunhas do Apocalipse", image: "2witnesses.jpeg", desc: "As testemunhas não são duas pessoas que voltam no fim dos tempos. Esta obra propõe um novo entendimento sobre essa profecia. <b>Prepare-se para uma descoberta surpreendente</b>." },
            { title: "Houve um Homem na Terra de Uz", image: "Uz.png", desc: "Antes mesmo da Lei ser dada a Moisés no Sinai, um manuscrito já descrevia todo o plano de Deus com os homens. <b>Entenda o arquétipo Jó, a relação de Deus com o homem, e a intromissão de Satanás nessa relação</b>." }
        ];

    // 2. RENDERIZAÇÃO
    const grid = document.getElementById('grid');
    if (grid) {
        books.forEach(b => {
            grid.innerHTML += `
                <div class="book-card">
                    <div class="book-cover-container" onmousemove="zoomIn(event)" onmouseleave="zoomOut(event)">
                        <img src="${b.image}" alt="${b.title}" class="book-img-zoom" onerror="this.src='https://via.placeholder.com/160x240?text=Capa'">
                    </div>
                    <div class="book-info">
                        <h3>${b.title}</h3>
                        <p>${b.desc}</p>
                        <button class="btn-buy disabled" data-title="${b.title}" data-format="IMPRESSO">IMPRESSO</button>
                        <button class="btn-buy disabled" data-title="${b.title}" data-format="DIGITAL">DIGITAL</button>
                    </div>
                </div>
            `;
        });
    }

    // 3. CLIQUES E MODAL (ANTI-ERRO)
    document.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('btn-buy')) {
            const title = e.target.getAttribute('data-title');
            const format = e.target.getAttribute('data-format');
            if (title && format) {
                const msg = document.getElementById('modal-msg');
                msg.innerHTML = `A versão <strong>${format}</strong> da obra <em>"${title}"</em> está sendo preparada para o lançamento oficial e estará disponível em breve.`;
                document.getElementById('modal').style.display = 'flex';
            }
        }
    });

    // 4. FORMSPREE
    const form = document.getElementById('contact-form');
    if (form) {
        form.onsubmit = async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const response = await fetch('https://formspree.io/f/mjybobzn', {
                method: 'POST', body: formData, headers: { 'Accept': 'application/json' }
            });
            if (response.ok) { alert('Enviado com sucesso!'); form.reset(); }
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
function zoomOut(e) { e.currentTarget.querySelector('img').style.transformOrigin = `center center`; }
function closeModal() { document.getElementById('modal').style.display = 'none'; }