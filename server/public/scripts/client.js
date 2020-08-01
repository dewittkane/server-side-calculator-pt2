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
                alert("You can't divide by zero! Please enter a valid second number.");
                return false;     
            }; //This will catch trying to divide by zero
        
            $.ajax({
                method: 'post',
                url: '/calculations',
                data: newCalculation
            }).then(function(response){
                console.log('coming back from post');
                getLastCalc(response);
                //getPreviousCalcs()
            });//ajax sends new calculation to server and comes back with most recent calculation

        } else {
            alert('Please enter both number fields');
            return false;
        };//this will catch having an empty input
        
    };






});