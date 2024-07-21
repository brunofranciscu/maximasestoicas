const fs = require('fs');
const path = require('path');

const replaceOGTags = (data, title, description, image) => {
  data = data.replace(/\$OG_TITLE/g, title);
  data = data.replace(/\$OG_DESCRIPTION/g, description);
  data = data.replace(/\$OG_IMAGE/g, image);
  return data;
};

module.exports = async (req, res) => {
  const filePath = path.resolve(__dirname, '../build', 'index.html');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading index.html file');
      return;
    }

    let result;
    if (req.url.startsWith('/autor/')) {
      const author = req.url.split('/')[2];
      if (req.url.includes('/maxima/')) {
        const id = req.url.split('/')[4];
        result = replaceOGTags(data, `Maxima - ${id}`, 'Uma coletânea de máximas estóicas de vários autores.', 'https://maximasestoicas.vercel.app/og.jpg');
      } else {
        result = replaceOGTags(data, `Pagina do Autor - ${author}`, 'Conheça mais máximas', `https://maximasestoicas.vercel.app/${author.replace('ê','e').replace('é','e').split(' ').join('').toLowerCase()}-og.jpg`);
      }
    } else {
      result = replaceOGTags(data, 'Máximas Estóicas', 'Uma coletânea de máximas estóicas de vários autores.', 'https://maximasestoicas.vercel.app/og.jpg');
    }

    res.setHeader('Content-Type', 'text/html');
    res.send(result);
  });
};
