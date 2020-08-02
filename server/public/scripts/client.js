$(document).ready(function(){
    // $('#equalsBtn').on('click', postCalc);
    $('#clearBtn').on('click', clearInput);
    $('.numBtn').on('click', addNumToField);
    $('#periodBtn').on('click', addPeriodToField);
    $('.operBtn').on('click', operateField)
    // //click listeners

    // getAndAppendPreviousCalcs();
    // //shows previous calcs on refresh/page load

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

    function operateField(){
        if (currentCalculation.length === 1) {
            alert("This calculator isn't that advanced... One step at a time please.")
            return false
        };//prevents multiple operators

        let calculationStep = {
            numberOne: $('#entryField').val(),
            operator: $(this).text()
        };//gathers current step of calculation

        if(calculationStep.number === '') {
            alert(`Please enter a number to "${calculationStep.operator}". MATH!`)
            return false
        }//stops if input field is empty

        if(amIDividingByZero(calculationStep) === true){
            alert('You cannot divide by zero! MATH!')
            clearInput();
            return false
        };//stops if dividing by zero

        currentCalculation.push(calculationStep);
        console.log(currentCalculation);
        //pushes to array storing the current calculation
        
        $('#currCalc').append(`${calculationStep.numberOne} ${calculationStep.operator} `);
        clearInput();
    };


    function postCalc(){
        console.log(currentCalculation);
        
        $.ajax({
            method: 'post',
            url: '/calculateme',
            data: currentCalculation
        }).then(function(response){

        });
    };//posts current calculation to the server

    function amIDividingByZero(calculationStep){
        if(currentCalculation.length === 1) {
            if(currentCalculation[0].operator === '/' && calculationStep.number == 0) {
            return true;
        }};//checks if you're dividing by zero
    };
    // function postCalc(){
    //     let newCalculation = {
    //         firstNum: $('#numOneIn').val(),
    //         operator: $('#operators').val(),
    //         secondNum: $('#numTwoIn').val()
    //     };//collects values from inputs

    //     console.log(newCalculation);
    //     if (newCalculation.firstNum !== '' && newCalculation.secondNum !== '') {
    //         //this will catch having an empty input

    //         if (newCalculation.operator === '/' && newCalculation.secondNum === '0'){
    //             alert("You can't divide by zero! Please enter a valid second number to get CALCULATING.");
    //             return false;     
    //         }; //This will catch trying to divide by zero
        
    //         $.ajax({
    //             method: 'post',
    //             url: '/calculations',
    //             data: newCalculation
    //         }).then(function(response){
    //             console.log('coming back from post');
    //             appendLastCalc(response);
    //             getAndAppendPreviousCalcs()
    //         });//ajax sends new calculation to server and comes back with most recent calculation
    //             //instead of sending back a status i just sent back the most recent calculation, is this allowed?!

    //     } else {
    //         alert('Please enter both number fields to get CALCULATING.');
    //         return false;
    //     };//response if there's an empty input
        
    // };


    // function appendLastCalc(lastCalculationObject) {
    //     $('#lastCalc').empty();
    //     $('#lastCalc').append(`${lastCalculationObject.firstNum} ${lastCalculationObject.operator} ${lastCalculationObject.secondNum} = ${lastCalculationObject.result}
    //     `)
    // };//clears and appends last calculation area

    // function getAndAppendPreviousCalcs() {
    //     $('#previousCalcs').empty();
    //     $.ajax({
    //         method:'get',
    //         url:'/calculations'
    //     }).then(function(response){
    //         for (const calculation of response) {
    //             $('#previousCalcs').append(`
    //             <li>${calculation.firstNum} ${calculation.operator} ${calculation.secondNum} = ${calculation.result}</li>
    //             `)
    //         };
    //     });//gets previous calculations array then loops and appends each one
    // };

    function clearInput() {
        $('#entryField').val('');
    };//clears number inputs
});