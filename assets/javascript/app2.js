$(document).ready();

let carArray = [];

let carMake = $('#addCarMake');
let mileage = $("#addCurrentMileage");
let interval  = $("#addOilChangeInterval");

    $('#submit').on('click', function(event){ 
        // event.preventDefault();
            dataObj = {
                'Make'    : carMake.val().trim(),
                'Mileage' : mileage.val().trim(),
                'Interval': interval.val().trim()
            };
            // let carMakeAndModel = dataObj.Make;
            // let currentMileage = dataObj.Mileage;
            // let nextInterval = dataObj.Interval;
            
            // console.log(`Make and model: ${carMakeAndModel}`);
            // console.log(`Current mileage: ${currentMileage} miles`);
            // console.log(`Oil change interval: ${nextInterval} miles`);
            // console.log(`Next oil change is due at: ${nextServiceDue(currentMileage, nextInterval)} miles`);
            
            carArray.push(dataObj);
            localStorage.setItem('carArray', JSON.stringify(carArray));

            if(existingData == null) existingData = [];
            localStorage.setItem('dataObj', JSON.stringify(dataObj));
            existingData.push(dataObj);
            localStorage.setItem('carArray', JSON.stringify(existingData));
    });

    // Renders vehicle data to the page
    let existingData = JSON.parse(localStorage.getItem('carArray'));
    for (let i = 0; i < existingData.length; i++) {
        // console.log('existingData: ', existingData[i]);
        $('#carInfo').append(`
            <div class='col-xs-4 p-2 mx-auto'>
                <div class="card" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">${existingData[i].Make}</h5>
                        </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"></li>
                        <li class="list-group-item"><h6>Mileage:</h6> ${existingData[i].Mileage} miles</li>
                        <li class="list-group-item"><h6>Oil Change Interval:</h6> ${existingData[i].Interval} miles</li>
                    </ul>
                    <div class="card-body">
                        <a href="#" class="card-link">Help</a>
                        <a href="#" class="card-link">Info</a>
                    </div>
                </div>
            </div>
        `);
    }

    // function to work out next service interval
    // function nextServiceDue(currentMileage, nextInterval) {
    //     return parseInt(currentMileage) + parseInt(nextInterval);
    // }
