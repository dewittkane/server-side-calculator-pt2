const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.port || 5000;
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended:true }));
app.listen(port, () => {
    console.log('Listening on port:', port); 
});
//server boilerplate

let previousCalculations = [];
//our 'database' to store previous equations

app.post('/calculateme', (req, res) => {
    let calculationIn = req.body;
    /* example req.body = {
        firstNum: '89532', 
        operator: '+', 
        secondNum: '6324' 
    }; */
    console.log('in server.js, pre calculation', calculationIn);
    let calculationOut = calculate(calculationIn);
    console.log('in server.js, post calculation', calculationOut);
    previousCalculations.push(calculationOut);
    res.send(calculationOut);
}); //upon receipt of the object, calculates the result, pushes it into the storage array ("database").
    //I used res.send in this post function to send back the immediate result.  I noticed that it works, and it makes sense to me to use it, but.... is it allowed?

app.get('/calculations', (req, res) => {
    res.send(previousCalculations)
}); //sends back the calculation array

function calculate(calculationObject){
    if (calculationObject.operator === '+') {
        calculationObject.result = parseFloat(calculationObject.firstNum) + parseFloat(calculationObject.secondNum)
        return calculationObject;
    } else if (calculationObject.operator === '-') {
        calculationObject.result = parseFloat(calculationObject.firstNum) - parseFloat(calculationObject.secondNum)
        return calculationObject;
    } else if (calculationObject.operator === '*') {
        calculationObject.result = parseFloat(calculationObject.firstNum) * parseFloat(calculationObject.secondNum)
        return calculationObject;
    } else if (calculationObject.operator === '/') {
        calculationObject.result = parseFloat(calculationObject.firstNum) / parseFloat(calculationObject.secondNum)
        return calculationObject;
    }
}; //doing the math based on the operator given

app.delete('/calculations', (req, res) => {
    console.log("Received delete request at server.  Deleting data. I hope you meant to do this. Seriously. It's gone. No looking back now.");
    previousCalculations = [];
    //resetting the array to blank
    res.sendStatus(200);
    //sending back the A-OK
})