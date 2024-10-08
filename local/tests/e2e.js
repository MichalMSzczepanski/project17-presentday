const axios = require('axios');

async function runTests() {
    try {
        // Call 1: Login and get JWT token
        console.log('Making login request...');
        const loginResponse = await axios.post('http://localhost:8080/v1/login', {
            email: 'michal.m.szczepanski@gmail.com',
            password: 'yourpassword'
        });
        const token = loginResponse.data; // Assuming the token is the direct response body
        console.log(`Login successful, received JWT token: ${token}`);

        // Call 2: Create a person
        console.log('Creating a person...');
        const personResponse = await axios.post('http://localhost:8080/v1/present/person', {
            owner: '5df0d7d1-8326-4c38-844e-80de64e8ff84',
            name: 'John',
            lastname: 'Doe'
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const personId = personResponse.data.id;
        console.log(`Person created with ID: ${personId}`);

        // Call 3: Create an occasion
        console.log('Creating an occasion...');
        const occasionResponse = await axios.post('http://localhost:8080/v1/present/occasion', {
            owner: '5df0d7d1-8326-4c38-844e-80de64e8ff84',
            name: 'Birthday',
            date: '2024-05-06T12:00:00',
            personId: personId
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const occasionId = occasionResponse.data.id;
        console.log(`Occasion created with ID: ${occasionId}`);

        // Call 4: Create a present
        console.log('Creating a present...');
        const presentResponse = await axios.post('http://localhost:8080/v1/present', {
            owner: '5df0d7d1-8326-4c38-844e-80de64e8ff84',
            name: 'Sample Present',
            type: 'IDEA',
            description: 'This is a IDEA present description.',
            price: 50.00,
            occasionId: occasionId
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const presentId = presentResponse.data.id;
        console.log(`Present created with ID: ${presentId}`);

        // Call 5: Create a reminder
        console.log('Creating a reminder...');
        const reminderResponse = await axios.post('http://localhost:8080/v1/present/reminder', {
            owner: '5df0d7d1-8326-4c38-844e-80de64e8ff84',
            name: 'birthday reminder',
            occasionId: occasionId,
            recurring: 'WEEKLY'
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const reminderId = reminderResponse.data.id;
        console.log(`Reminder created with ID: ${reminderId}`);

        // Call 6: Create a reminder date
        console.log('Creating a reminder date...');
        const reminderDateResponse = await axios.post('http://localhost:8080/v1/present/reminderdate', {
            date: '2024-05-06T12:00:00',
            reminderId: reminderId
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const reminderDateId = reminderDateResponse.data.id;
        console.log(`Reminder date created with ID: ${reminderDateId}`);

    } catch (error) {
        console.error('Error occurred during the test execution:', error.response ? error.response.data : error.message);
    }
}

runTests();
