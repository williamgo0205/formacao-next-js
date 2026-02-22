# Curso Formacao Next JS

## Curso Nível 1 - Fundamentos do Next.js

Crie aplicações web modernas e performáticas com Next.js, dominando renderização, roteamento avançado e React Server Components!

### Plataforma: Rocketseat

https://app.rocketseat.com.br/journey/next-js/overview

# Informações Úteis

### 1. Site Next

https://nextjs.org/

### Utilização de Pages router:
https://nextjs.org/docs/pages/building-your-application/data-fetching

Data Fetching
* getStaticProps *(A execução é feita apenas no mometo de build)*
* getStaticPaths *(Especifica quais são as rotas dinâmicas devem ser estaticamente geradas em tempo de build)*
* Incremental Static Regeneration (ISR) *(Permite que páginas estáticas sejam regeradas após um tempo configurado sem a necessidade de ser feito o deploy novamente)*
* getServerSideProps *(Busca os dados sempre a cada requisição)*

### 2. Documentação Next

https://nextjs.org/docs

### 3. Instalação Next

https://nextjs.org/docs/pages/getting-started/installation

### 4. Componentes Next
https://nextjs.org/docs/pages/api-reference/components

# Comandos Úteis

A maneira mais rápida de criar um novo aplicativo Next.js é usando o `next.js` create-next-app, que configura tudo automaticamente para você. Para criar um projeto, execute:

```bash
npx create-next-app@latest
```

Durante a instalação, você verá as seguintes mensagens:

```bash
What is your project named? my-app
Would you like to use the recommended Next.js defaults?
  Yes, use recommended defaults - TypeScript, ESLint, Tailwind CSS, App Router, Turbopack
  No, reuse previous settings
  No, customize settings - Choose your own preferences
```

Se você optar por fazer isso customize settings, verá as seguintes instruções:

```bash
Would you like to use TypeScript? No / Yes
Which linter would you like to use? ESLint / Biome / None
Would you like to use React Compiler? No / Yes
Would you like to use Tailwind CSS? No / Yes
Would you like your code inside a `src/` directory? No / Yes
Would you like to use App Router? (recommended) No / Yes
Would you like to customize the import alias (`@/*` by default)? No / Yes
What import alias would you like configured? @/\*
```

Após as instruções, create-next-app será criada uma pasta com o nome do seu projeto e instaladas as dependências necessárias.


### 5. Informações do Projeto

#### Figma:
https://www.figma.com/community/file/1491107537598172161/landing-page-e-blog


### 6. Libs

### shadcn-ui

#### Shadcn Ui (Utilização de componentes)
https://ui.shadcn.com/

#### Instalação:
https://ui.shadcn.com/docs/installation/next

#### Comando:
npx shadcn@latest init

### 7. Construção arquivos Markdown


#### Content Layer

Lib de utilização entre os arquivos Markdown e o Next.

#### Link: 
https://contentlayer.dev/

### Comando:
npm install contentlayer next-contentlayer

ou forçar a instalação:

npm install contentlayer next-contentlayer --legacy-peer-deps

### Comando para buildar o contantlayer
npm run contentlayer:build

PS: Esse comando deve ser rodado na pasta anterior a "src"

### Adicionar ao package.json
  "scripts": {
    "contentlayer:build": "contentlayer build"
  },


## 9. Comandos de Inclusão de componente:

### Breadbrumb:
npx shadcn@latest add breadcrumb

## 10. Plugin react-markdown

### Link:
https://github.com/remarkjs/react-markdown?tab=readme-ov-file

### Para uso do reat-markdown é necessário utilizar o remark-gfm
https://github.com/remarkjs/remark-gfm

## 11. Deploy da aplicação

### Vercel link: 
https://vercel.com/

## 12. verificar desempenho da aplicação

### pagespeed link: 
https://pagespeed.web.dev/


## Curso Nível 2 - Pet Shop

### Eslint link: 
https://eslint.org/

### LeftHook link:
https://lefthook.dev/

Como você usa npm, rode dentro do projeto, necessário instalar no diretório onde contem a pasta ".git" :
npm install lefthook --save-dev

Depois:
npx lefthook install

Executar comando local:
npx lefthook run pre-push --all-files

### Comandos Básicos - Docker

#### inicializar os container da aplicação
docker-compose up

#### inicializar os container da aplicação liberando o terminal
docker-compose up -d

#### verificar os containers em execução
docker-compose ps

#### Stopar os containers em execução
docker-compose down