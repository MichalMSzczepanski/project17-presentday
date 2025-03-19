const axios = require('axios');

async function runTests() {
    try {
        // Call 1: Login and get JWT token
        console.log('Making login request...');
        const loginResponse = await axios.post('http://localhost:8080/v1/login', {
            email: 'michal.m.szczepanski@gmail.com',
            password: 'yourpassword'
        });
        const token = loginResponse.data;
        console.log(`Login successful, received JWT token: ${token}`);

        // Call 2: Create a person
        console.log('Creating a person...');
        const personResponse = await axios.post('http://localhost:8080/v1/present/person', {
            owner: 'eae21d70-7ec5-4e84-b07f-b8bfa4197ae6',
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
            owner: 'eae21d70-7ec5-4e84-b07f-b8bfa4197ae6',
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
            owner: 'eae21d70-7ec5-4e84-b07f-b8bfa4197ae6',
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

        // Utility function to round minutes to nearest valid interval (00, 15, 30, 45)
        const roundMinutes = (date) => {
            const minutes = date.getMinutes();
            const roundedMinutes = Math.round(minutes / 15) * 15;
            date.setMinutes(roundedMinutes);
            date.setSeconds(0);
            date.setMilliseconds(0);
            return date;
        };

        // Call 5: Create a reminder
        console.log('Creating a reminder...');
        const reminderResponse = await axios.post('http://localhost:8080/v1/present/reminder', {
            owner: 'eae21d70-7ec5-4e84-b07f-b8bfa4197ae6',
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

        // Calculate the date for 10 minutes from now, then round to nearest valid interval
        const nowWarsaw = new Date();

        // Set the date to the next day
        const nextDayWarsaw = new Date(nowWarsaw);
        nextDayWarsaw.setDate(nowWarsaw.getDate() + 1);  // Set to the next day

        // Round minutes to nearest 15-minute interval
        let minutes = nextDayWarsaw.getMinutes();
        let roundedMinutes = Math.ceil(minutes / 15) * 15;
        nextDayWarsaw.setMinutes(roundedMinutes);
        console.log(`Setting date (10 minutes from now in Warsaw, rounded): ${nextDayWarsaw}`);
        const reminderDateResponse10m = await axios.post('http://localhost:8080/v1/present/reminderdate', {
            date: nextDayWarsaw,
            reminderId: reminderId
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const reminderDateId10m = reminderDateResponse10m.data.id;
        console.log(`Reminder date created for rounded 10 minutes from now, ID: ${reminderDateId10m}`);

        // Calculate the date for 2 hours from now, then round to nearest valid interval
        const twoHoursLaterWarsaw = new Date(nowWarsaw.getTime() + 2 * 60 * 60 * 1000);
        const roundedTwoHoursLater = roundMinutes(twoHoursLaterWarsaw).toISOString();
        console.log(`Sending date (2 hours from now in Warsaw, rounded): ${roundedTwoHoursLater}`);
        const reminderDateResponse2h = await axios.post('http://localhost:8080/v1/present/reminderdate', {
            date: roundedTwoHoursLater,
            reminderId: reminderId
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const reminderDateId2h = reminderDateResponse2h.data.id;
        console.log(`Reminder date created for rounded 2 hours from now, ID: ${reminderDateId2h}`);

        // Call 7: Trigger reminders for the next 24 hours
        console.log('Triggering reminders for the next 24 hours...');
        await axios.post('http://localhost:8080/v1/present/reminderdatecache/getReminderDateCachesForNext24h', {}, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log('Triggered reminders for the next 24 hours.');

        // Call 8: Check upcoming reminders
        console.log('Checking upcoming reminders...');
        await axios.post('http://localhost:8080/v1/present/reminderdatecache/checkUpcomingReminders', {}, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log('Checked upcoming reminders.');

    } catch (error) {
        console.error('Error occurred during the test execution:', error.response ? error.response.data : error.message);
    }
}

runTests();
