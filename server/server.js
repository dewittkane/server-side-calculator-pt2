const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended:true }));
app.listen(port, () => {
    console.log('Listening on port:', port); 
});
//server boilerplate

let previousCalculation = [];

app.post('/calculations', (req, res) => {
    let calculationIn = req.body;
    console.log('in server.js, pre calculation', calculationIn);
    let calculationOut = calculate(calculationIn);
    console.log('in server.js, post calculation', calculationOut);
    res.send(calculationOut);
    
})

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
}