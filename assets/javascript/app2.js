$(document).ready();

let dataArray = [];

        $(function() {
            let carMake = $('#addCarMake');
            let mileage = $("#addCurrentMileage");
            let interval  = $("#addOilChangeInterval");
            let submit = $('#submit');
            
            submit.on('click', function(event){ 
                event.preventDefault();
                    dataObj = {
                        'Make'    : carMake.val(),
                        'Mileage' : mileage.val(),
                        'Interval': interval.val()
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

            retrivedArray = localStorage.getItem('dataArray');     
            console.log('retrivedArray: ', JSON.parse(retrivedArray));

        
            // function to work out next service interval
            function nextServiceDue(currentMileage, nextInterval) {
                return parseInt(currentMileage) + parseInt(nextInterval);
            }

            });



