const path = require('path');

const express = require('express');
const app = express();
const publicPath = path.join(__dirname,'..','public'); //path to public folder
const port = process.env.PORT || 3000//port given by Heroku, or if not there: 3000

app.use(express.static(publicPath)); //serve up assets from public path

/* matches all un-matched routes,
Request obj: info about request, Response obj: manipulate response express server makes
This block says: 'if link not found, use index.html
*/

app.get('*', (req, res) =>{ 
    res.sendFile(path.join(publicPath, 'index.html'));
}); 

app.listen(port, () =>{
    console.log('server is up');
}); //args1: port #, args2: callback func. when server is up

//Run this code with: node server/server.js