const fs = require('fs');
const path = require('path');

const replaceOGTags = (data, title, description, image, url) => {
  data = data.replace(/\$OG_TITLE/g, title);
  data = data.replace(/\$OG_DESCRIPTION/g, description);
  data = data.replace(/\$OG_IMAGE/g, image);
  data = data.replace(/\$OG_URL/g, url);
  return data;
};

module.exports = (req, res) => {
  const filePath = path.resolve(__dirname, '../public', 'index.html');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading index.html file');
      return;
    }

    let result;
    const url = `https://maximasestoicas.vercel.app${req.url}`;
    if (req.url.startsWith('/autor/')) {
      const author = req.url.split('/')[2];
      if (req.url.includes('/maxima/')) {
        const id = req.url.split('/')[4];
        result = replaceOGTags(data, `Maxima - ${id}`, 'Uma coletânea de máximas estóicas de vários autores.', 'https://maximasestoicas.vercel.app/og.jpg', url);
      } else {
        result = replaceOGTags(data, `Pagina do Autor - ${author}`, 'Conheça mais máximas', `https://maximasestoicas.vercel.app/${author.replace('ê','e').replace('é','e').split(' ').join('').toLowerCase()}-og.jpg`, url);
      }
    } else {
      result = replaceOGTags(data, 'Máximas Estóicas', 'Uma coletânea de máximas estóicas de vários autores.', 'https://maximasestoicas.vercel.app/og.jpg', url);
    }

    res.setHeader('Content-Type', 'text/html');
    res.send(result);
  });
};
