# 👨‍🚀 ASTRO BEDROCK 🪐

Todo lo necesario para llevar a cabo un proyecto web de forma modular

### ⚙️ Tareas:

1.  Actualizar: site: "https://www.example.com" (astro.config.mjs),
2.  Decidir si va a ser **Static Site or SSR**, en el caso de ser SSR añadir el adaptador de cloudflare: https://docs.astro.build/es/guides/integrations-guide/cloudflare/
3.  Determinar los colores en variables.scss
4.  ` npm run update 	`
5.  Layout.astro: Cambiar las fuentes (default: Poppins) & defaults.scss cambiar la font-family
6.  Añadir logo a public/assets/favicon.svg

### 🧩 Plugins

#### 🗂️ Astro DB

https://docs.astro.build/en/guides/astro-db/

Installation git merge plugin-astro-db && npm i

#### 🪪 Auth

Installation git merge plugin-auth && npm i

Example to filter access:

const user = Astro.locals.user;
if (!user) return Astro.redirect("/login");

#### 📖 Blog

In progress...

#### 💲E-Commerce

In progress...

## 🖇️ Bibliografía:

- Emojis: https://es.piliapp.com/emoji/list/
- Glassmorphism 1: https://css.glass/
- Glassmorphism 2:https://ui.glass/generator/
- Neumorphism: https://neumorphism.io/#e0e0e0
