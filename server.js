const fs =  require('fs');
const express = require('express');
const axios = require('axios');
const GithubWebHook = require('express-github-webhook');
const bodyParser = require('body-parser');
const shell = require('shelljs');
const { App } = require("@octokit/app");
// const Octokit = require('@octokit/rest');

// const APP_ID = '44821';
// const CLIENT_ID = 'Iv1.7dedba7c70dc0d78';
// const PRIVATE_KEY = fs.readFileSync('./webhook-app-dc.private-key.pem');

const server = express();
const port = process.env.PORT || 8000;
const webhookHandler = GithubWebHook({ path: '/', secret: 'qwerty123' });

//const githubApp = new App({ id: APP_ID, privateKey: PRIVATE_KEY });
// const jwt = githubApp.getSignedJsonWebToken();


server.use(bodyParser.json());
server.use(webhookHandler);

webhookHandler.on('*', (event, repo, data) => {

  console.log('pul request -> ', data);
  
  shell.exec('git config --global user.name "DC_test"')
  shell.exec('git clone https://github.com/DeniChan90/Github-hook.git');
  shell.cd('./Github-hook');
  shell.exec('openapi validate openapi.yaml', (code, stdout, stderr) => {

    axios({
      method: 'post',
      url: `${data.issue_url}/comments`,
      headers: {
        Authorization: 'token 15d247a2311494adf0f2c55518e7d9668f57c0db',
        // Authorization: `Bearer ${jwt}`,
        // Accept: 'application/vnd.github.machine-man-preview+json'
      },
      data : {
        body: stdout
      }
    }).then((res) => {
      console.log('response ... ', res);

    }).catch((err) => {
      console.log('error  ... ', err);
    });

  });
  shell.cd('../Github-hook');
  shell.exec('rm -rf Github-hook');

});

server.listen(port, (err) => {
  if (err) {
    return console.log('Error !!!\n', err)
  }

  console.log(`Server Is Listening On Port: ${port}`)
});