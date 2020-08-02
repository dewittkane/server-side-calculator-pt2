$(document).ready(function(){
    $('#equalsBtn').on('click', processEquals);
    $('#clearBtn').on('click', clearInput);
    $('.numBtn').on('click', addNumToField);
    $('#periodBtn').on('click', addPeriodToField);
    $('.operBtn').on('click', processOperator);
    // //click listeners

    getAndAppendPreviousCalcs();
    //shows previous calcs on refresh/page load

    let currentCalculation = [];
    //empty array to store the current calculation

    function addNumToField(){
        $('#entryField').val($('#entryField').val() + $(this).text());
    }; //gets existing entry field value and adds the number you clicked on then sets the new value

    function addPeriodToField(){
        let currentNum = $('#entryField').val();
        if(currentNum.indexOf('.') == -1){
            $('#entryField').val($('#entryField').val() + '.'); 
        } else {
            alert("You can't add another decimal if you already have one! MATH!");
        };
    }//Prevents you from trying to use the calculator to write dewey decimal system

    function processOperator(){
        if (currentCalculation.length === 1) {
            alert("This calculator isn't that advanced... One step at a time please.")
            return false
        };//prevents multiple operators

        let calculationStep = {
            firstNum: $('#entryField').val(),
            operator: $(this).text()
        };//gathers current step of calculation

        if(calculationStep.firstNum === '') {
            alert(`Please enter a number to "${calculationStep.operator}". MATH!`)
            return false
        }//stops if input field is empty

        currentCalculation.push(calculationStep);
        console.log(currentCalculation);
        //pushes to array storing the current calculation
        
        $('#currCalc').append(`${calculationStep.firstNum} ${calculationStep.operator} `);
        //shows first step of calculation on the DOM
        clearInput();
    };

    function processEquals(){
        let objectToPost = currentCalculation[0];
        let secondNum = $('#entryField').val()

        if(secondNum === '') {
            alert(`Please enter a number to "${objectToPost.operator}". MATH!`)
            return false
        }//stops if input field is empty

        if(amIDividingByZero(secondNum) === true){
            alert('You cannot divide by zero! MATH!')
            clearInput();
            return false
        };//stops if dividing by zero

        objectToPost.secondNum = secondNum;
        console.log(currentCalculation[0]);
        //assigns second number to object
        
        postCalc(objectToPost);
        clearCurrentCalc();
        clearInput();

    };
    
    function postCalc(calculationObjectToPost){
        $.ajax({
            method: 'post',
            url: '/calculateme',
            data: calculationObjectToPost
        }).then(function(response){
            getAndAppendPreviousCalcs();
            appendLastCalc(response);
        });
    };//posts current calculation to the server

    function amIDividingByZero(secondNum){
        if(currentCalculation.length === 1) {
            if(currentCalculation[0].operator === '/' && secondNum == 0) {
            return true;
        }};//checks if you're dividing by zero
    };


    function appendLastCalc(lastCalculationObject) {
        $('#lastCalc').empty();
        $('#lastCalc').append(`${lastCalculationObject.firstNum} ${lastCalculationObject.operator} ${lastCalculationObject.secondNum} = ${lastCalculationObject.result}
        `)
    };//clears and appends last calculation area

    function getAndAppendPreviousCalcs() {
        console.log('APPENDING CALCS'); 
        $('#previousCalcs').empty();
        $.ajax({
            method:'get',
            url:'/calculations'
        }).then(function(response){
            for (const calculation of response) {
                $('#previousCalcs').append(`
                <li>${calculation.firstNum} ${calculation.operator} ${calculation.secondNum} = ${calculation.result}</li>
                `)
            };
        });
    };//gets previous calculations array then loops and appends each one

    function clearCurrentCalc() {
        currentCalculation = [];
        //resets the "workspace"
        $('#currCalc').empty();
    };//clears the current calc portion of the page

    function clearInput() {
        $('#entryField').val('');
    };//clears number inputs
});