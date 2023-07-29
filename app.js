const express = require('express');
const cookieParser = require('cookie-parser');
const routes = require('./essential/routes');
const { PORT } = require('./essential/config');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(routes);
app.set('view engine', 'ejs');

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Server error');
});

app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`);
});

module.exports = app;