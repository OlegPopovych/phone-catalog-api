import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import FormData from 'form-data';

import dotenv from 'dotenv';

dotenv.config();

async function uploadPhoto(
  apiKey: string,
  model: string,
  color: string,
  filePath: string,
) {
  try {
    const url = 'https://api.imgbb.com/1/upload';
    const fileContent = fs.readFileSync(filePath);
    const fileName = path.basename(filePath, path.extname(filePath));

    const form = new FormData();
    form.append('key', apiKey);
    form.append('image', fileContent, { filename: fileName });

    const response = await axios.post(url, form, {
      headers: {
        ...form.getHeaders(),
      },
    });

    const imageUrl = response.data.data.url;

    console.log(`Фотографія завантажена успішно. URL: ${imageUrl}`);

    return imageUrl;
  } catch (error) {
    console.error('Помилка при завантаженні фотографії:', error);
    return null;
  }
}

async function processPhotos(
  apiKey: string,
  model: string,
  color: string,
  directoryPath: string,
) {
  const links = [];

  try {
    const files = fs.readdirSync(directoryPath);

    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      const imageUrl = await uploadPhoto(apiKey, model, color, filePath);

      if (imageUrl) {
        links.push(imageUrl);
      }
    }

    const linksObject = {
      namespaceId: model,
      color: color,
      images: links,
    };

    const linksFilePath = path.join(__dirname, 'accessoriesLinks.json');
    // fs.writeFileSync(linksFilePath, JSON.stringify(linksObject, null, 2));
    fs.appendFileSync(linksFilePath, JSON.stringify(linksObject, null, 2));

    console.log('Посилання на фотографії збережено в файл links.json');
  } catch (error) {
    console.error('Помилка при обробці фотографій:', error);
  }
}

const imgBBApiKey = process.env.IMGBB_API_key_v2 || '';
console.log({imgBBApiKey});

import folders from './img/accessoriesFolders.json';

for (const phoneModel of folders) {
  const model = phoneModel[0];
  const color = phoneModel[1];

  const directoryPath = path.join(__dirname, './img/accessories', model, color);

  processPhotos(imgBBApiKey, model, color, directoryPath);
}
