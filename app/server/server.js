'use strict';


// increase the libuv threadpool size to 1.5x the number of logical CPUs.
process.env.UV_THREADPOOL_SIZE = process.env.UV_THREADPOOL_SIZE || Math.ceil(Math.max(4, require('os').cpus().length * 1.5));

const fs = require('fs'),
      path = require('path');

const express = require('express'),
      compression = require('compression');


const port = 3000,
      host = '127.0.0.1';


const app = express().disable('x-powered-by');

//app.set('view engine', 'ejs');
//app.set('views', path.join(__dirname, 'static'));

app.use(compression());
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(path.resolve(__dirname, '..', 'common')));
app.use(express.static(path.resolve(__dirname, '..', '..', 'node_modules')));

app.get('/', (req, res, next) => {
    //res.render('index', {config: JSON.stringify(clientConfig)});
    res.render(path.join(__dirname, 'static', 'index.html'));
});

app.get('/*', (req, res, next) => {
    res.redirect('/');
});

app.listen(port, host, function() {
    console.log('Server Listening at http://%s:%d/', this.address().address, this.address().port);
});