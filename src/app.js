const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

/* Views */

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* Middlewares */
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static(__dirname.replace('src','public')));

/* Routes */

const indexRouter = require('./routes/indexRouter');
app.use('/', indexRouter);

/* App */

app.listen(port ,() => {
    console.log(`App listening on localhost::${port}`);
});