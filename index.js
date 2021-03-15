const express = require('express'); // returns functions
const Joi = require('joi');
const app = express(); // represents app created from functions
                       // can access endpoints like this
                        // get takes url

app.use(express.json()); // middleware for request processing pipeline

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

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body); // object destructuring for error property 
    // if Invalid send 400 bad request
    if (error){
        // 400 bad request
        res.status(400).send(error.details[0].message);
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name   // assuming that object to be posted has a name 
    };
    courses.push(course);
    res.send(course); // returning posted object client who post requested 

});

app.put('/api/courses/:id', (req,res) => {
    // Look up course

    // if DNE -> 404
    const course = courses.find(c => c.id == parseInt(req.params.id));
    
    if (!course){
        res.status(404).send('Course with given ID was not found ')
    }
    // Validate course
  
    const { error } = validateCourse(req.body); // object destructuring for error property 
    // if Invalid send 400 bad request
    if (error){
        // 400 bad request
        res.status(400).send(error.details[0].message);
        return;
    }
    course.name = req.body.name;
    res.send(course);
});

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}
// port must be hosted dynamically -> port 3000 may not be available
// can use export command to set custom env variable
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}..`));
