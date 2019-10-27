const express = require('express');
const GithubWebHook = require('express-github-webhook');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8000;
const webhookHandler = GithubWebHook({ path: '/', secret: 'qwerty123' });

app.use(bodyParser.json());
app.use(webhookHandler);

webhookHandler.on('*', (event, repo, data) => {
  console.log('event ->>>> ', event);
  console.log('repo ->>>>>> ', repo);
  console.log('data ->>>>>> ', data);

});

app.listen(port, (err) => {
  if (err) {
    return console.log('Error !!!\n', err)
  }

  console.log(`Server Is Listening On Port: ${port}`)
});