$(document).ready();

let carArray = [];

    // This function adds a new car to local storage
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

            if(vehicle == null) vehicle = [];
            localStorage.setItem('dataObj', JSON.stringify(dataObj));
            vehicle.push(dataObj);
            localStorage.setItem('carArray', JSON.stringify(vehicle));
    });

    let vehicle = JSON.parse(localStorage.getItem('carArray'));

    /* Renders vehicle data to the page via Bootstrap cards 
    (If there is an object in local storage it gets rendered to the DOM immediately) */
    function renderCards(carArray) {

        $('#carInfo').empty();

        for (let i = 0; i < vehicle.length; i++) {   
            
            $('#carInfo').append(`
                <div class='col-xs-4 p-2 mt-3 mx-auto'>
                    <div class="card rounded-0" style="width: 18rem;">
                            <div class="card-body">
                            <button type="submit" class="btn btn-secondary rounded-0 d-flex justify-content-start" value="${i}" id="delete">X</button>
                            <h5 class="card-title mt-3">${vehicle[i].Make}</h5>
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
           
    }
        

    // Delete function to remove card from local storage
    $(document).on('click', '#delete', function() {
        
        let carNumber = $(this).val();
        vehicle.splice(carNumber, 1);
        localStorage.setItem('carArray', JSON.stringify(vehicle));   
        document.location.reload();
    });

    // This function works out the next service interval
    function nextServiceDue(currentMileage, nextInterval) {
        return parseInt(currentMileage) + parseInt(nextInterval);
    }

renderCards(carArray);