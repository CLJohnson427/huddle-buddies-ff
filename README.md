# [https://cljohnson.dev/huddle-buddies-ff/](https://cljohnson.dev/huddle-buddies-ff/)

# Manual Deployment to GitHub Pages.
https://learnvue.co/2020/09/how-to-deploy-your-vue-app-to-github-pages/
```shell
npm run build
```

```shell
git add dist -f
```

```shell
git commit -m "deploy"
```

```shell
git subtree push --prefix dist origin gh-pages
```

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

TODO:

- Change CSS Variables:
  - background-primary => color-background-primary
  - text-primary => color-text-primary
- Fix Store
  - Update code so the initial type doesn't have to be an empty object {} pretending to be the type.
- Update fetch functions
- Add JsDoc
- Add Sidebar
