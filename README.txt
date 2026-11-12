# ON CHURCH — projeto inicial

## Como executar
1. Extraia a pasta/arquivo ZIP.
2. Abra `index.html` no navegador (ou use a extensão Live Server no VS Code).
3. Edite os textos, datas, locais e imagens de demonstração.

## Personalização importante
- Em `script.js`, troque `WHATSAPP_NUMBER` pelo número oficial com código do país e DDD, apenas números.
- Em `index.html`, atualize as datas e locais de eventos e evangelismos: os atuais são exemplos.
- Em `style.css`, altere as cores nas variáveis de `:root`.
- A imagem de capa usa uma imagem remota do Unsplash; substitua pela foto autorizada da comunidade quando tiver.

## Estrutura
- `index.html`: conteúdo e estrutura.
- `style.css`: identidade visual, responsividade e animações/estados.
- `script.js`: menu mobile, ano automático e formulário de WhatsApp.

Este é um protótipo front-end. O formulário não salva inscrições em banco de dados; ele prepara uma mensagem para o WhatsApp.


## Página de login e cadastro
- `login.html`: tela de acesso e criação de conta.
- `auth.css`: estilos específicos da página de autenticação.
- `auth.js`: alterna entre os formulários.
- O botão “Entrar / Cadastrar” no menu da página inicial abre `login.html`.

IMPORTANTE: esta é somente a interface demonstrativa. Os formulários ainda não criam usuários nem autenticam senhas. Para isso, será necessário integrar um backend/serviço de autenticação e armazenar senhas com segurança. Não use este protótipo para coletar senhas reais.
