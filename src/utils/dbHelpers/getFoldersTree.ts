import * as fs from 'fs';
import * as path from 'path';

const phonesDirectoryPath = path.join(__dirname, './img/accessories');

function getAllFolders(
  directoryPath: string,
  parent: string | null = null,
): string[] {
  const folders: string[] = [];

  const items = fs.readdirSync(directoryPath);

  for (const item of items) {
    const itemPath = path.join(directoryPath, item);

    if (fs.statSync(itemPath).isDirectory()) {
      const folderName = parent ? `${parent}, ["${item}"]` : `["${item}"`;

      folders.push(folderName);

      const subfolders = getAllFolders(itemPath, folderName);
      folders.push(...subfolders);
    }
  }

  return folders;
}

const foldersNames = getAllFolders(phonesDirectoryPath);

const outputFilePath = path.join(__dirname, 'accessoriesFolders.json');

fs.writeFileSync(outputFilePath, `[${foldersNames.join(',\n')}]`);

console.log(`Імена папок та підпапок записані у файл: ${outputFilePath}`);
