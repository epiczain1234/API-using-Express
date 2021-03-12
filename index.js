const express = require('express'); // returns functions

const app = express(); // represents app created from functions
                       // can access endpoints like this
                        // get takes url
const courses = [
    {id: 1, name:'course1'},
    {id: 2, name:'course2'},
    {id: 3, name:'course3'},
];

// defining get route, Hello world is the response
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// : represnts parameters -> requires parameters'
// ? optional query parameter -> stored in objects with 
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id == parseInt(req.params.id));
    if (!course){
        res.status(404).send('Course with given ID was not found ')
    }
    else{
        res.send(course);
    }
});

// port must be hosted dynamically -> port 3000 may not be available
// can use export command to set custom env variable
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}..`));
