$(document).ready(function(){
    $('#equalsBtn').on('click', postCalc);
    $('#clearBtn').on('click', clearInputs);
    //click listeners

    getAndAppendPreviousCalcs();
    //shows previous calcs on refresh/page load

    function postCalc(){
        let newCalculation = {
            firstNum: $('#numOneIn').val(),
            operator: $('#operators').val(),
            secondNum: $('#numTwoIn').val()
        };//collects values from inputs

        console.log(newCalculation);
        if (newCalculation.firstNum !== '' && newCalculation.secondNum !== '') {
            //this will catch having an empty input

            if (newCalculation.operator === '/' && newCalculation.secondNum === '0'){
                alert("You can't divide by zero! Please enter a valid second number to get CALCULATING.");
                return false;     
            }; //This will catch trying to divide by zero
        
            $.ajax({
                method: 'post',
                url: '/calculations',
                data: newCalculation
            }).then(function(response){
                console.log('coming back from post');
                appendLastCalc(response);
                getAndAppendPreviousCalcs()
            });//ajax sends new calculation to server and comes back with most recent calculation
                //instead of sending back a status i just sent back the most recent calculation, is this allowed?!

        } else {
            alert('Please enter both number fields to get CALCULATING.');
            return false;
        };//response if there's an empty input
        
    };


    function appendLastCalc(lastCalculationObject) {
        $('#lastCalc').empty();
        $('#lastCalc').append(`${lastCalculationObject.firstNum} ${lastCalculationObject.operator} ${lastCalculationObject.secondNum} = ${lastCalculationObject.result}
        `)
    };//clears and appends last calculation area

    function getAndAppendPreviousCalcs() {
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
        });//gets previous calculations array then loops and appends each one
    };

    function clearInputs() {
        $('#numOneIn').val('');
        $('#numTwoIn').val('');
    };//clears number inputs
});