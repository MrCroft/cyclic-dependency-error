'use strict';

require('zone.js/dist/zone-node');
require('reflect-metadata');

const { platformServer, renderModuleFactory } = require('@angular/platform-server');
const { ngExpressEngine } = require('@nguniversal/express-engine');
// Import module map for lazy loading
const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');
const { enableProdMode } = require('@angular/core');

const express = require('express');
const path = require('path');
const fs = require('fs');
const gzip = require('compression');

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// const files = fs.readdirSync(`${process.cwd()}/server`);
// const mainFiles = files.filter(file => file.startsWith('main'));
// const hash = mainFiles[0].split('.')[1];

// const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require(`./server/main.${hash}.bundle`);
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require(`./server/main.bundle`);

const app = express();
const port = process.env.PORT || 10010;
const DIST_FOLDER = path.join(process.cwd(), 'dist');


// Compress all resources
app.use(gzip());

// Set the engine
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', path.join(DIST_FOLDER, 'browser'));
app.use('/', express.static(path.join(DIST_FOLDER, 'browser'), {
  index: false
}));

app.get('*', (req, res) => {
  res.render('index', {
    req,
    res
  });
});

app.listen(port, () => {
  console.log(`Node Express server listening on http://localhost:${port}`);
});
