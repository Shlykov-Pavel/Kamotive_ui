import fs from 'fs';
import path from 'path';

// Определяем __dirname
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Определяем пути к исходной и целевой директориям
const sourceDir = path.resolve(__dirname, '../src');
const destDir = path.resolve(__dirname, '../dist');

// Функция для рекурсивного копирования файлов
function copyFiles(source, destination, extensions = ['.css', '.scss', '.json', '.woff2', '.woff', '.d.ts']) {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  const files = fs.readdirSync(source);

  files.forEach((file) => {
    const sourcePath = path.join(source, file);
    const destPath = path.join(destination, file);

    if (fs.statSync(sourcePath).isDirectory()) {
      // Рекурсивно обрабатываем директории
      copyFiles(sourcePath, destPath, extensions);
    } else if (extensions.some((ext) => file.endsWith(ext))) {
      // Копируем только файлы с указанными расширениями
      fs.copyFileSync(sourcePath, destPath);
      console.log(`Copied: ${sourcePath} -> ${destPath}`);
    }
  });
}

// Запускаем копирование
copyFiles(sourceDir, destDir);