const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const routeStatic = require('./lib/route-static');
const redirectIndices = require('./lib/redirect-indices');
const compression = require('compression');
const critical = require('critical');

const app = express();
const baseDir = 'src';
const port = process.env.PORT || 3004;

app.set('etag', false);
app.use((req, res, next) => { res.removeHeader('X-Powered-By'); next(); });

// gzip compression
app.use(compression());

// css critical
critical.generate({
    base: 'src/',
    src: 'http://localhost:3004',
    dest: 'dist/css/critical.css',
    width: 1300,
    height: 900
});

// static routes
app.use(routeStatic);
app.use('/static', express.static(path.join(__dirname, baseDir), { etag: false, lastModified: false }));

// dynamic pages
app.use(redirectIndices);
nunjucks.configure(baseDir, {
    autoescape: true,
    express: app,
    watch: true
});

app.get('*', (req, res, next) => {
    res.render(path.join('./', req.url, 'index.html'), {});
});

app.listen(port, (err) => {
    err ? console.error(err) : console.log(`app running on http://localhost:${port}`);
});

