import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.resolve(__dirname, '../src');
const destDir = path.resolve(__dirname, '../dist');

function copyFiles(source, destination, extensions = ['.css', '.scss', '.json']) {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  const files = fs.readdirSync(source);

  files.forEach((file) => {
    const sourcePath = path.join(source, file);
    const destPath = path.join(destination, file);

    if (fs.statSync(sourcePath).isDirectory()) {
      copyFiles(sourcePath, destPath, extensions);
    } else if (extensions.some((ext) => file.endsWith(ext))) {
      fs.copyFileSync(sourcePath, destPath);
      console.log(`Copied: ${sourcePath} -> ${destPath}`);
    }
  });
}

// Запускаем копирование
copyFiles(sourceDir, destDir);