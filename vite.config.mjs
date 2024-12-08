import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/types/scss.d.ts', // Исходный файл scss.d.ts
          dest: 'types', // Папка назначения в dist
        },
        {
          src: 'src/types/index.d.ts', // Исходный файл index.d.ts
          dest: '.', // Копируем в корень dist
        },
      ],
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'), // Входной файл библиотеки
      name: 'MyUILibrary', // Название библиотеки
      fileName: () => 'index.js', // Имя выходного файла
    },
    rollupOptions: {
      external: ['react', 'react-dom'], // Внешние зависимости
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});