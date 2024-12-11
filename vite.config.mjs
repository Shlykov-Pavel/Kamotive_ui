import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const banner = 
`/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-expressions */`
.trim() 

function addBannerPlugin() {
  return {
    name: 'add-banner-plugin',
    closeBundle() {
      const outputPath = path.resolve(__dirname, 'dist', 'index.js');

      if (fs.existsSync(outputPath)) {
        const content = fs.readFileSync(outputPath, 'utf-8');
        fs.writeFileSync(outputPath, `${banner}\n${content}`);
        console.log('Баннер успешно добавлен в файл:', outputPath);
      } else {
        console.warn('Файл сборки не найден:', outputPath);
      }
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    addBannerPlugin(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/types/scss.d.ts', 
          dest: 'types', 
        },
        {
          src: 'src/types/css.d.ts', 
          dest: 'types',
        },
        {
          src: 'src/types/index.d.ts', 
          dest: '.', 
        },
      ],
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'), 
      name: 'MyUILibrary', 
      fileName: () => 'index.js', 
    },
    rollupOptions: {
      external: ['react', 'react-dom'], 
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});