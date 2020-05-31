'use strict';
const cafecito_express = require('express');
const server = cafecito_express();

server.set('appName', 'Sending form data with nodeJS and express');
server.set('port', 3000);

server.use(cafecito_express.static('../frontend'));
server.use(cafecito_express.json());

server.post('/submit-form', (request, response) => {
    console.log('I got a request');
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
    console.log(`Now my cafecito server is listening on port ${server.get('port')}`);
});