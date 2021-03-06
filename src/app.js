const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
var bodyParser = require('body-parser');

/* Views */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* Static */
app.use(express.static('./public'));

/* Middlewares */
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

/* Routes */
const indexRouter = require('./routes/indexRouter');
app.use('/', indexRouter);

/* App */
app.listen(port ,() => {
    console.log(`App listening on localhost::${port}`);
});