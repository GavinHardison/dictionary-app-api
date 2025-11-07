const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

const htmlPath = path.join(__dirname, 'index.html');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(htmlPath, (err) => {
    if (err) {
      res.send('Error loading the page.');
    }
  })});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});