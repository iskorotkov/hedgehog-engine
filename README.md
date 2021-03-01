# Hedgehog Engine

![publish](https://github.com/iskorotkov/hedgehog-engine/workflows/publish/badge.svg)
[![Netlify Status](https://api.netlify.com/api/v1/badges/7ec629b6-69d6-49a5-84d0-529269eb3856/deploy-status)](https://app.netlify.com/sites/hedgehog-engine/deploys)

WebGL-based rendering engine.

[Live demo](https://hedgehog-engine.netlify.app/)

- [Hedgehog Engine](#hedgehog-engine)
  - [How to run](#how-to-run)
  - [Features](#features)
  - [Tech stack](#tech-stack)
  - [Linters](#linters)
  - [Useful links](#useful-links)

## How to run

Install `Node.js` and `Yarn`, then run the following:

```shell
yarn install
yarn run 'tsc build'
yarn run 'sass compile'
```

Open `index.html` file in the browser.

## Features

- vertex and fragment shader compilation
- flexible shader program compilation
- different models to draw
- widgets for editing scene without reloading
- interchangeable cameras

## Tech stack

Languages:

- TS
- SCSS

Libs:

- require.js

## Linters

Linters used:

- ESLint
- Stylelint

Use linters before committing to this repo.

## Useful links

- [WebGL example - 3D cube](https://github.com/mdn/webgl-examples/blob/gh-pages/tutorial/sample5/webgl-demo.js)
- [OpenGL matrices](http://www.opengl-tutorial.org/beginners-tutorials/tutorial-3-matrices/)
