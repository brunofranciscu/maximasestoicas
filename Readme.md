# Máximas Estóicas

## Este é um aplicativo React simples que exibe frases de autores, com funcionalidades de paginação e compartilhamento. O aplicativo permite visualizar frases por autor e compartilhar cada frase em várias plataformas de mídia social.

### Funcionalidades
 - Exibição de Frases: Exibe frases retiradas de um arquivo JSON.
 - Paginação: Permite navegação entre diferentes páginas de frases.
 - Compartilhamento: Cada frase pode ser compartilhada em várias plataformas de mídia social, incluindo Facebook, Twitter, WhatsApp, Telegram, LinkedIn e Reddit.
 - Página do Autor: Exibe todas as frases de um autor específico.
 - 
### Estrutura do Projeto
 * src/assets/frases.json: Arquivo JSON contendo as frases.
 * src/components/Author.js: Componente que exibe as frases de um autor específico com funcionalidades de paginação e compartilhamento.
 * src/components/Pagination.js: Componente de paginação para navegar entre as páginas de frases.
 * 
### Como Funciona
 - Carregamento de Dados: As frases são carregadas a partir de um arquivo JSON localizado em src/assets/frases.json.
 - Filtragem por Autor: As frases são filtradas pelo autor com base no parâmetro de URL.
 - Paginação: As frases são paginadas, mostrando um número específico de frases por página.
 - Compartilhamento: Cada frase tem botões de compartilhamento que permitem aos usuários compartilhar a frase em várias plataformas de mídia social.
 - Página do Autor: O aplicativo possui uma página dedicada para cada autor, onde todas as frases desse autor são exibidas.
Estrutura do JSON
O arquivo JSON frases.json deve ter a seguinte estrutura:

```json
[
  {
    "id": 1,
    "author": "Autor 1",
    "text": "Frase 1 do Autor 1"
  },
  {
    "id": 2,
    "author": "Autor 2",
    "text": "Frase 1 do Autor 2"
  },
]
```
## Componentes Principais
### Author.jsx
O componente Author exibe as frases de um autor específico. Ele utiliza os seguintes hooks e funcionalidades:

 - useParams: Para obter o autor da URL.
 - useState: Para gerenciar o estado das frases e da página atual.
 - useEffect: Para carregar e filtrar as frases pelo autor.
 - Pagination: Componente de paginação para navegar entre as páginas de frases.
 - react-share: Biblioteca usada para os botões de compartilhamento.

### Pagination.jsx
O componente Pagination permite a navegação entre diferentes páginas de frases. Ele calcula o número total de páginas com base no número total de frases e no número de frases por página.

### Como Executar
Para executar o projeto localmente:

Clone o repositório.
Instale as dependências com npm install.
Inicie o aplicativo com npm start.
