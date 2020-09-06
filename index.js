const express = require('express');
const path = require('path');

// parse requests of content-type - application/json
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}
// Serve static files from the React app
// app.use(express.static(path.join(__dirname, 'client/build')));

// import Routes
require("./routes/interviews.routes.js")(app);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname + '/client/build/index.html'))
// });

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Server listening on ${port}`);