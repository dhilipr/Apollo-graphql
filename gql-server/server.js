const express = require('express');
const express_graphql = require('express-graphql');
const {buildSchema} = require('graphql');
const path = require('path');


const http = require('http');


var schema = buildSchema(`
    type Query {
       course(id: Int!): Course
       courses: [Course]
    }

    type Course {
        id: Int
        title: String
    }
`);


var coursesData = [
    {
        id: 1,
        title: 'Angular'
    },
    {
        id: 2,
        title: 'Javascript'
    }, {
        id: 3,
        title: 'React'
    },
    {
        id: 4,
        title: 'Node JS'
    },
     {
        id: 5,
        title: 'Backbone'
    }

];

var getCourse = function(args){
    return coursesData.filter(course => {
        return course.id === args.id;
    })[0];
}

var getCourses = function () {
    return coursesData;
}
//root resolver
var root = {
    course: getCourse,
    courses: getCourses
};

//server and endpoint creation
var app= express();
app.use('/graphql',express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true

}));

app.use(express.static(path.join(__dirname, '../apollo/dist')));



app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../apollo/dist/index.html'));
});

app.listen(4000, () => console.log("GraphQL server is up"));


