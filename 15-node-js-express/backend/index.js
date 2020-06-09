'use strict';
const express = require('express');
const server = express();

server.set('appName', 'Sending form data with nodeJS and express');
server.set('port', 3000);

server.use(express.static('../frontend'));
server.use(express.json());

server.post('/submit-form', (request, response) => {
    console.log(request.body);
    response.json({
        status: 'Success !!',
        name: request.body.name,
        email: request.body.email,
        phone: request.body.phone,
        courses: request.body.courses,
        message: request.body.message
    });
});

server.listen(server.get('port'), () => {
    console.log(server.get('appName'));
    console.log(`Now Express JS is listening on port ${server.get('port')}`);
});