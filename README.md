<div align="center">

# {CA} Carlos Adriano Sodre Araujo

### Software Engineer Backend

APIs, integrações e regras de negócio.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

[LinkedIn](https://www.linkedin.com/in/carlosadrianosodrearaujo6464) ·
[GitHub](https://github.com/Carlos6464) ·
[WhatsApp](https://wa.me/5522991043636) ·
[Currículo (PDF)](docs/curriculo-carlos-adriano.pdf)

</div>

---

## Sobre o projeto

Meu portfólio profissional: uma página única, escura, com brilho verde-floresta, que apresenta quem eu sou, onde atuo, minha formação e o **Amezia**, meu projeto pessoal de finanças com agente de IA.

Foi feito **sem frameworks e sem etapa de build**, apenas HTML, CSS e JavaScript puros. É leve, rápido e publicado como site estático na Vercel.

## O que tem na página

| Seção | Conteúdo |
| --- | --- |
| **Início** | Apresentação, tecnologias e carrossel animado de skills |
| **Sobre** | Como penso, como trabalho, onde atuo e o que busco |
| **Experiência** | Atuação profissional e formação acadêmica |
| **Projeto** | Estudo de caso do Amezia, com capturas de tela, funcionalidades, decisões de engenharia e stack |
| **Contato** | E-mail (com botão de copiar), LinkedIn e GitHub |

## Destaques técnicos

- **Zero dependências:** nenhum framework, biblioteca ou build.
- **Responsivo:** layout adaptado de desktop a celular, com menu hambúrguer no mobile.
- **Acessível:** navegação por teclado, atributos ARIA, textos alternativos e respeito a `prefers-reduced-motion`.
- **Ícones em SVG** injetados via JavaScript, sem requisições extras.
- **Barra de progresso de leitura** e botão de voltar ao topo.
- **Carrossel de tecnologias** em CSS puro, com pausa ao passar o mouse.
- **Imagens em arquivos separados**, com cache longo configurado no `vercel.json`.

## Estrutura

```
.
├── index.html               # Estrutura da página
├── css/
│   └── style.css            # Estilos (tema escuro, 12 seções comentadas)
├── js/
│   └── main.js              # Ícones, carrossel, abas, menu, progresso e copiar e-mail
├── img/                     # Foto e capturas de tela do projeto
├── docs/
│   └── curriculo-carlos-adriano.pdf
├── vercel.json              # URLs limpas e cache de imagens
└── README.md
```

## Rodando localmente

Não precisa instalar nada. Basta abrir o `index.html` no navegador, ou subir um servidor estático:

```bash
# com Python
python3 -m http.server 8000

# ou com Node
npx serve .
```

Depois acesse `http://localhost:8000`.

## Deploy

O site é publicado na **Vercel**, conectado a este repositório. A cada `git push` na branch `main`, um novo deploy é feito automaticamente.

Para publicar o seu próprio:

1. Faça um fork ou clone deste repositório.
2. Na Vercel, clique em **Add New → Project** e importe o repositório.
3. Use o preset **Other**, sem build command, e clique em **Deploy**.

## Contato

Estou aberto a vagas de Software Engineer Backend e a projetos freelance.

- **E-mail:** adrianosodre23@gmail.com
- **LinkedIn:** [carlosadrianosodrearaujo6464](https://www.linkedin.com/in/carlosadrianosodrearaujo6464)
- **GitHub:** [Carlos6464](https://github.com/Carlos6464)
- **WhatsApp:** [+55 (22) 99104-3636](https://wa.me/5522991043636)

---

<div align="center">

Feito por **Carlos Adriano** · Santo Antônio de Pádua, RJ

</div>
