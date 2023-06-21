const express = require('express');
const https = require('https');
const router = express.Router();

const AWS = require('aws-sdk');

let awsConfig = {
    region : 'ap-southeast-2',
    accessKeyId: 'ASIA5DYSEEJ45NMGK2WI',
    secretAccessKey: '00maWDJF0CgsFQL7beIv2P1vaVptSFswkIww1/ic',
    sessionToken: 'IQoJb3JpZ2luX2VjELX//////////wEaDmFwLXNvdXRoZWFzdC0yIkgwRgIhAOdQs7qVnc62P79+ErT3Wvvyq2+BNkYCkUsQ7MrK/+Y7AiEA8ntoFL5W9UjuL0ipnGj2pqUH9P8flMFkvXcqHXNELwoqsAMIXhACGgw5MDE0NDQyODA5NTMiDEMHYrrgonHZVitipSqNA/gaYoOKpNlcXMWxz6/aaGRVn8mVpP7MK3CDi1ZB6UkZaI06xJNH/zNbBcsceHycgBJlvI/w70VF/22TfwHCxSL9M/uY0yhVFC9fRu+O/PnlBCZVSKyJMsCpz8Dem6mNxStXrUwKMznbHgfVFJZ/JufnXfEOxbG12ErhaEnR0bYSZeEYR0pA3bONhH6Mex46EHunu+FJA6fj7cRj3Z76qqLhiJPjgUf/Ng5tW1ee3rmtgupS87a3xE0koxL9DQ+6B3Dw/Ung19GczXRIDsXfoXhaLFRxLLhx73vYPqZlGEkw5KK405XNGYSHt+WkIRKo29pua02cilC7lOvHHqlug1vFIhTxEZWBRJIzdw6/FAFKcL9PuE1eHjydz/GYuMzOIbS/yCg6bgsw4ruLfmT0SxCYyJSDZEgYie3teXhUp8cmWRjtADz1O612CmuaRAqVA+DOVc6rij2ffIsPfGoZP55nu3/maWX8RyYjaRlGJ7D2ZQ2jMzeF7lgtmlebUT8paB9KDzPbgmWb9oFPgWYwo+KmmQY6pQG/qFhL52YVfiRWkNc25uAEi++zMai4ECfsjJ3aQ5sUXDYdUOFwnsu44mnzf2rFHNajl8yhCT5DHNKw6xPfn0FnW/1lSj7AKEgn1uL1Wb4604QVCWiCuxTxk9Vkv1yE3O9tiWFZfzvhNOvwWI8oLRAMWfObs1PEic8j/SdRxZDQQKUV/xKXdvUfzs8PeZke0hcRNKJpI6t+1FgYfAEOlUconPhCWPE='
}

AWS.config.update(awsConfig);

const ddb = new AWS.DynamoDB.DocumentClient();

router.get('/', function (req, res) {

    const paramsQuery = {
        TableName: '11148870-assignment1',
        Key:{
            'qut-username': 'n11148870@qut.edu.au',
            sk: '12345'
        },
        ExpressionAttributeNames: {
            '#user' : 'qut-username',
        },
        ExpressionAttributeValues: {
            ':user' : 'n11148870@qut.edu.au'
        },
        KeyConditionExpression: '#user= :user',
    }

    ddb.query(paramsQuery, function(err, data) {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Success", data.Items[0].count);
          let count = data.Items[0].count + 1;
          updateCounter(count);
          res.send(JSON.stringify(count));
        }
      });  
})





function updateCounter(count) {
    const paramsUpdate = {
        TableName: '11148870-assignment1',
        Key:{
            'qut-username': 'n11148870@qut.edu.au',
            sk: '12345'
        },
       
        ExpressionAttributeNames: {
            '#count' : 'count',
        },
        
        ExpressionAttributeValues: {
            ':count' : count
        },
        UpdateExpression: 'set #count = :count'
    }

    ddb.update(paramsUpdate, (err) => {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Success");
        }
    });
}


module.exports = router;


