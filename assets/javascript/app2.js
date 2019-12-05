$(document).ready();

let dataArray = [];

let carMake = $('#addCarMake');
let mileage = $("#addCurrentMileage");
let interval  = $("#addOilChangeInterval");

    $('#submit').on('click', function(event){ 
        event.preventDefault();
            dataObj = {
                'Make'    : carMake.val().trim(),
                'Mileage' : mileage.val().trim(),
                'Interval': interval.val().trim()
            };
            let carMakeAndModel = dataObj.Make;
            let currentMileage = dataObj.Mileage;
            let nextInterval = dataObj.Interval;
            
            console.log(`Make and model: ${carMakeAndModel}`);
            console.log(`Current mileage: ${currentMileage} miles`);
            console.log(`Oil change interval: ${nextInterval} miles`);
            console.log(`Next oil change is due at: ${nextServiceDue(currentMileage, nextInterval)} miles`);
            dataArray.push(dataObj);

            localStorage.setItem('dataArray', JSON.stringify(dataArray));

    });

    let retrivedArray = localStorage.getItem('dataArray');     
    let clientStorage = JSON.parse(retrivedArray);
    for (let i = 0; i < clientStorage.length; i++) {
        console.log('retrivedArray: ', clientStorage[i]);
    }


    // function to work out next service interval
    function nextServiceDue(currentMileage, nextInterval) {
        return parseInt(currentMileage) + parseInt(nextInterval);
    }



