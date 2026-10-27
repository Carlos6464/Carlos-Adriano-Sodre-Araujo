/**
 * Portfólio - Carlos Adriano Sodre Araujo
 * ---------------------------------------------------------------
 * Arquivo : js/main.js
 * Autor   : Carlos Adriano
 * Data    : 26/10/2026
 *
 * Descrição:
 *   Comportamento da página (index.html). Este script:
 *     1. injeta os ícones SVG nos elementos marcados com data-i;
 *     2. monta as duas faixas de tecnologias (carrossel);
 *     3. troca as capturas de tela do projeto Amezia pelas abas;
 *     4. controla o menu hambúrguer no mobile;
 *     5. atualiza a barra de progresso de leitura;
 *     6. mostra/oculta o botão "voltar ao topo";
 *     7. copia o e-mail de contato para a área de transferência.
 *
 *   Carregado com `defer` no fim do index.html, então o DOM já
 *   está pronto quando ele executa.
 */
(function () {
  'use strict';

  /* =============================================================
   * 1. ÍCONES SVG
   * ============================================================= */

  /**
   * Caminhos (paths) SVG de cada ícone, indexados pelo nome usado
   * no atributo data-i do HTML. Estilo de traço (stroke), 24x24.
   * @type {Object<string, string>}
   */
  var P = {
    'arrow-ur': '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
    'arrow-up': '<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>',
    menu: '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    briefcase: '<rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
    whatsapp: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/>',
    github: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>'
  };

  /**
   * Monta o elemento <svg> completo de um ícone.
   * @param {string} name - Nome do ícone (chave de P).
   * @returns {string} HTML do SVG; vazio por dentro se o nome não existir.
   */
  function svg(name) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (P[name] || '') + '</svg>';
  }

  // Para cada elemento com data-i="nome", insere o ícone no início e remove o atributo
  document.querySelectorAll('[data-i]').forEach(function (el) {
    el.insertAdjacentHTML('afterbegin', svg(el.getAttribute('data-i')));
    el.removeAttribute('data-i');
  });

  /**
   * Escapa caracteres especiais de HTML (&, <, >, ") para uso seguro em innerHTML.
   * @param {*} s - Valor a escapar (convertido para string).
   * @returns {string} Texto escapado.
   */
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  /* =============================================================
   * 2. CARROSSEL DE TECNOLOGIAS (chips)
   * ============================================================= */

  /**
   * Itens de cada faixa: [sigla do ícone, nome exibido, cor de fundo da sigla].
   * @type {Array<Array<string>>}
   */
  var row1 = [['Py', 'Python', '#3776AB'], ['Fa', 'FastAPI', '#059B8B'], ['PHP', 'PHP', '#6F73AE'], ['Pg', 'PostgreSQL', '#336791'], ['Rd', 'Redis', '#C53A2E'], ['Dk', 'Docker', '#1F83D6']];
  var row2 = [['{ }', 'APIs REST', '#0F9F6E'], ['⇄', 'Integrações', '#0E9F8F'], ['DB', 'Modelagem de dados', '#4F46E5'], ['AI', 'Integração com IA', '#C026D3'], ['RAG', 'RAG com pgvector', '#D97706'], ['CRM', 'CRM', '#2563EB'], ['§', 'Regras de negócio', '#DB2777']];

  /**
   * Preenche uma faixa do carrossel com os chips da lista.
   * A lista é repetida 4 vezes (2 metades x 2 repetições) para o loop da
   * animação CSS ser contínuo e a faixa ficar mais larga que a tela.
   * As cópias recebem a classe "dup" e aria-hidden, para leitores de tela
   * lerem cada item uma única vez.
   * @param {string} id - id do elemento que recebe os chips.
   * @param {Array<Array<string>>} list - Itens [sigla, nome, cor].
   * @returns {void}
   */
  function fill(id, list) {
    var h = '';
    for (var k = 0; k < 2; k++) for (var r = 0; r < 2; r++) list.forEach(function (c) {
      var dup = k || r; // só o primeiro conjunto é o "original"
      h += '<span class="chip' + (dup ? ' dup' : '') + '"' + (dup ? ' aria-hidden="true"' : '') + '><span class="glyph" style="background:' + c[2] + '">' + esc(c[0]) + '</span>' + esc(c[1]) + '</span>';
    });
    document.getElementById(id).innerHTML = h;
  }
  fill('row1', row1);
  fill('row2', row2);

  /* =============================================================
   * 3. ABAS DAS CAPTURAS DE TELA (projeto Amezia)
   * ============================================================= */

  var tabs = document.querySelectorAll('#tabs .tab');
  var imgs = document.querySelectorAll('.frame img');

  // Ao clicar numa aba (data-n = índice), marca-a como ativa e mostra só a imagem correspondente
  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      var n = +t.getAttribute('data-n');
      tabs.forEach(function (x, i) { x.setAttribute('aria-pressed', i === n ? 'true' : 'false'); });
      imgs.forEach(function (im, i) { im.hidden = i !== n; });
    });
  });

  /* =============================================================
   * 4. MENU MOBILE (hambúrguer)
   * ============================================================= */

  var menuBtn = document.getElementById('menu-btn');
  var navEl = document.getElementById('nav');

  /**
   * Abre ou fecha o menu e mantém os atributos de acessibilidade em dia.
   * @param {boolean} open - true para abrir, false para fechar.
   * @returns {void}
   */
  function setMenu(open) {
    navEl.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  }

  menuBtn.addEventListener('click', function () { setMenu(!navEl.classList.contains('open')); });
  // Fecha o menu ao escolher um link
  navEl.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  // Fecha com a tecla Esc
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  // Fecha ao voltar para o layout desktop
  window.addEventListener('resize', function () { if (window.innerWidth > 760) setMenu(false); });

  /* =============================================================
   * 5. BARRA DE PROGRESSO DE LEITURA
   * ============================================================= */

  // Barra sob o cabeçalho: cresce ao rolar para baixo e encolhe ao subir
  var bar = document.getElementById('progress');
  var ticking = false; // evita agendar mais de um frame por vez

  /**
   * Calcula quanto da página já foi rolado (0 a 1) e escala a barra no eixo X.
   * @returns {void}
   */
  function paintBar() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    bar.style.transform = 'scaleX(' + p + ')';
    ticking = false;
  }

  /**
   * Agenda o redesenho da barra no próximo frame (throttle com requestAnimationFrame).
   * @returns {void}
   */
  function requestBar() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(paintBar);
    }
  }

  window.addEventListener('resize', requestBar);
  paintBar(); // estado inicial

  /* =============================================================
   * 6. BOTÃO "VOLTAR AO TOPO"
   * ============================================================= */

  var up = document.getElementById('up');

  /**
   * Mostra o botão depois de 480px de rolagem e atualiza a barra de progresso.
   * @returns {void}
   */
  function onScroll() {
    up.hidden = window.scrollY < 480;
    requestBar();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // estado inicial
  up.addEventListener('click', function () { window.scrollTo({ top: 0 }); });

  /* =============================================================
   * 7. COPIAR E-MAIL
   * ============================================================= */

  var copyBtn = document.getElementById('copy-mail');
  var mailEl = document.getElementById('mail-text');

  /**
   * Plano B quando a área de transferência não está disponível:
   * seleciona o texto do e-mail para o usuário copiar manualmente.
   * @returns {void}
   */
  function selectMail() {
    try {
      var r = document.createRange();
      r.selectNodeContents(mailEl);
      var s = window.getSelection();
      s.removeAllRanges();
      s.addRange(r);
    } catch (e) { /* sem seleção disponível: nada a fazer */ }
  }

  // Tenta copiar via Clipboard API; se falhar, apenas seleciona o texto
  copyBtn.addEventListener('click', function () {
    /**
     * Mostra um aviso temporário no botão e depois restaura o texto original.
     * @param {string} msg - Mensagem exibida ("Copiado" ou "Selecionado").
     */
    function done(msg) {
      copyBtn.textContent = msg;
      setTimeout(function () { copyBtn.textContent = 'Copiar e-mail'; }, 1800);
    }
    try {
      navigator.clipboard.writeText(mailEl.textContent).then(
        function () { done('Copiado'); },
        function () { selectMail(); done('Selecionado'); }
      );
    } catch (e) {
      selectMail();
      done('Selecionado');
    }
  });
})();
