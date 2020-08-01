$(document).ready(function(){
    console.log('js and jq loaded!');
    
    $('#equalsBtn').on('click', postCalc);
    
    //click listeners



    function postCalc(){
        let newCalculation = {
            firstNum: $('#numOneIn').val(),
            operator: $('#operators').val(),
            secondNum: $('#numTwoIn').val()
        };
        console.log(newCalculation);
        if (newCalculation.firstNum !== '' && newCalculation.secondNum !== '') {
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
                getLastCalc(response);
                getPreviousCalcs()
            });//ajax sends new calculation to server and comes back with most recent calculation

        } else {
            alert('Please enter both number fields to get CALCULATING.');
            return false;
        };//this will catch having an empty input
        
    };


    function getLastCalc(lastCalculationObject) {
        $('#lastCalc').empty();
        $('#lastCalc').append(`${lastCalculationObject.firstNum} ${lastCalculationObject.operator} ${lastCalculationObject.secondNum} = ${lastCalculationObject.result}
        `)
    };//clears and appends last calculation area

    function getPreviousCalcs() {
        $('#previousCalcs').empty();
        $.ajax({
            method:'get',
            url:'/calculations'
        }).then(function(response){
            for (const calculation of response) {
                $('#previousCalcs').append(`
                <li>${calculation.firstNum} ${calculation.operator} ${calculation.secondNum} = ${calculation.result}</li>
                `)
            }
        })
        
    }



});