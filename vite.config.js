import { ViteEjsPlugin } from "vite-plugin-ejs";
import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';
import combineMediaQuery from 'postcss-combine-media-query';
import postcssInsert from 'postcss-insert'; // ✅ 追加
import path from 'path';
import fs from 'fs';
import navData from "./src/data/nav.json";
import metaData from "./src/data/meta.json";
import breadcrumbsData from "./src/data/breadcrumbs.json";
import accordionData from "./src/data/accordion.json";

export default defineConfig({
  root: './src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    sourcemap: true,
    rollupOptions: {
      input: getPages(),
      output: {
        entryFileNames: 'assets/js/[name].js',
        assetFileNames: 'assets/[name][extname]',
      },
    },
  },

  plugins: [
    ViteEjsPlugin({
      navItems: navData,
      metaData,
      breadcrumbs: breadcrumbsData,
      accordions: accordionData
    }),
  ],

  css: {
    postcss: {
      plugins: [
        postcssInsert({ start: '@charset "UTF-8";\n' }), // ✅ 追加
        autoprefixer({
          overrideBrowserslist: ['> 1%', 'last 2 versions', 'Firefox ESR'],
        }),
        combineMediaQuery(),
      ],
    },
  },

  server: {
    open: true,
    port: 3000,
  },

  preview: {
    port: 8080,
  }
});

function getPages() {
  const srcDir = path.resolve('src');
  const files = fs.readdirSync(srcDir).filter(file => file.endsWith('.html'));
  const entries = {};

  files.forEach(file => {
    const name = file.replace('.html', '');
    entries[name] = path.resolve(srcDir, file);
  });

  return entries;
}
