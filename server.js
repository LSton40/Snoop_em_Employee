// const express = require('express');
// const app = express();
// const path = require('path');
const PORT = process.env.PORT || 3333;

const db = require('./db/connection')

const routes = require('./routes/routes');

//Set route, URL encoding, and JSON readability
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.urlencoded({extended: true}));
// app.use(express.json());

// Load routes
db.use('/', routes);

//PORT listener
db.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});