# Curso Formacao Next JS

Crie aplicações web modernas e performáticas com Next.js, dominando renderização, roteamento avançado e React Server Components!

### Plataforma: Rocketseat

https://app.rocketseat.com.br/journey/next-js/overview

# Informações Úteis

### 1. Site Next

https://nextjs.org/

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
