const express = require('express');

const app = express();
const port = process.env.PORT || 8000;

app.listen(port, (err) => {
  if (err) {
    return console.log('Error !!!\n', err)
  }

  console.log(`Server Is Listening On Port: ${port}`)
});