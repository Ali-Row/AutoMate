$(document).ready();

let carArray = [];

    $('#submit').on('click', function(event){ 
        // event.preventDefault();
        let carMake = $('#addCarMake');
        let mileage = $("#addCurrentMileage");
        let interval  = $("#addOilChangeInterval");

            dataObj = {
                'Make'    : carMake.val().trim(),
                'Mileage' : mileage.val().trim(),
                'Interval': interval.val().trim()
            };
            carArray.push(dataObj);
            localStorage.setItem('carArray', JSON.stringify(carArray));

            if(existingData == null) existingData = [];
            localStorage.setItem('dataObj', JSON.stringify(dataObj));
            existingData.push(dataObj);
            localStorage.setItem('carArray', JSON.stringify(existingData));
    });

    // Renders vehicle data to the page via Bootstrap cards
    let vehicle = JSON.parse(localStorage.getItem('carArray'));
    for (let i = 0; i < vehicle.length; i++) {
        $('#carInfo').append(`
            <div class='col-xs-4 p-2 mt-3 mx-auto'>
                <div class="card rounded-0" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">${vehicle[i].Make}</h5>
                        </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"></li>
                        <li class="list-group-item text-left"><h6>Mileage:</h6>${vehicle[i].Mileage} miles</li>
                        <li class="list-group-item text-left"><h6>Oil Change Interval:</h6>${vehicle[i].Interval} miles</li>
                        <li class="list-group-item text-left"><h6>Oil Change Due:</h6>${nextServiceDue(vehicle[i].Mileage, vehicle[i].Interval)} miles</li>
                    </ul>
                    <div class="card-body">
                        <a href="#" class="card-link">Help</a>
                        <a href="#" class="card-link">More Service Data</a>
                    </div>
                </div>
            </div>
        `);
    }

    // function to work out next service interval
    function nextServiceDue(currentMileage, nextInterval) {
        return parseInt(currentMileage) + parseInt(nextInterval);
    }
