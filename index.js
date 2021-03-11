const express = require('express'); // returns functions

const app = express(); // represents app created from functions
                       // can access endpoints like this
                        // get takes url

// defining get route, Hello world is the response
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
    res.send("black beets in city");
});

// port must be hosted dynamically -> port 3000 may not be available
// can use export command to set custom env variable
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}..`));