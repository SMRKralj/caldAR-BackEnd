const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;
const router = require('./app/routes');
const bodyParser = require('body-parser');
const db = require("./app/models");

// Settings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);
app.use(cors());
app.use(router);

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to database');
    })
    .catch((err) => {
        console.error('Cannot connect to database', err);
        process.exit();
    });


app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});